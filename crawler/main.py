from fastapi import FastAPI, HTTPException

from pymongo import MongoClient
from bson.objectid import ObjectId

from packages import config, store

# 서버 실행 명령어
# uvicorn main:app --reload --port=8081

################### 서버 실행 전 셋팅 ###################

secret = config.read_secret('.env')

try:
    client = MongoClient(secret.get('MONGODB_URI'))
    db = client.get_database(secret.get('DB_NAME'))
    
    # 크롤링서버에서 필요한 컬렉션 = item, ...
    # 아이템 가격 정보가 달라지면 컬렉션에 담긴 아이템들 어떻게 업데이트? 
    # collection 목록에서 가격정보 대신 브랜드, 아이템이름만? -> 이건 좀 별로인듯

    # collection name에 s붙어있음. 유의
    item_collection = db.get_collection('items')
    
    print('mongodb connected')
except:
    print('mongodb connect error')

crawler = store.Store()

################### 서버 실행  ###################

app = FastAPI()

# data types - req.body
from models.index import Item

@app.post("/item")
def crawl_item(item: Item):
    if not item.item_id:
        raise HTTPException(status_code=400, detail="item_id is required")
    if not item.url:
        raise HTTPException(status_code=400, detail="url is required")
    
    try:
        object_id = ObjectId(item.item_id)
    except:
        raise HTTPException(status_code=400, detail="invalid itemId")

    # await crawling()
    data = crawler.crawl(item.url)

    filter_ = {
        "_id": object_id,
        # "url": item.url
    }

    update_ = {
        "$set": data,
        "$currentDate": {
            "updatedAt": True
        },
    }

    # await 사용 불가
    result = item_collection.find_one_and_update(filter=filter_, update=update_)

    if not result:
        raise HTTPException(status_code=400, detail="item is not found")

    return {'message': 'success'}



################### 테스트 필요 부분
# async request test

from time import time
import httpx
import asyncio

URL = "http://httpbin.org/uuid"

async def request(client):
    response = await client.get(URL)
    return response.text

async def task():
    async with httpx.AsyncClient() as client:
        tasks = [request(client) for i in range(100)]
        result = await asyncio.gather(*tasks)
        print(result)

@app.get('/async')
async def f():
    start = time()
    await task()
    print("time: ", time() - start)


# http://naver.me/5Il9eutn
from time import sleep
@app.get('/burgers')
async def read_burgers():
    from fastapi.concurrency import run_in_threadpool
    await run_in_threadpool(sleep, 10)
    burgers = 2
    return burgers
