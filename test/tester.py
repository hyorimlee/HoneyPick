import requests
import json

SERVER_URL = 'http://localhost:8000'

headers = {u'content-type': u'application/json'}

def express_tester(method, url, headers=None, data=None):
    if method == 'get':
        r = requests.get(url)
    elif method == 'post':
        r = requests.post(url, headers=headers, data=json.dumps(data))
    elif method == 'patch':
        r = requests.patch(url, headers=headers, data=json.dumps(data))
    elif method == 'put':
        r = requests.put(url, headers=headers, data=json.dumps(data))
    elif method == 'delete':
        r = requests.delete(url)

    return {'status': r.status_code, 'response' : r.text}


# item create test
datas = {
    # item_id는 크롤서버 테스트에 사용
    # 'item_id': '626b4cc0c7a03021da4fd6c8',
    'url': 'https://smartstore.naver.com/one4farm1/products/5553462146?NaPm=ct%3Dl2h0sark%7Cci%3D32d028fd691b1fe6d18afc6588dedbca0a4bee59%7Ctr%3Dslcc%7Csn%3D302444%7Chk%3D08e50814832b6883ee330fffe36c7069c20084fa'
}

print(express_tester('post', SERVER_URL+'/item', headers=headers, data=datas))

