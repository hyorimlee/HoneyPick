import requests
import json

SERVER_URL = 'http://localhost:8000/api/v1'
# SERVER_URL = 'http://k6a302.p.ssafy.io:8000/api/v1'

headers = {u'content-type': u'application/json'}

def request_server(method, url, headers=None, data=None):
    if method == 'get':
        r = requests.get(url, headers=headers)
    elif method == 'post':
        r = requests.post(url, headers=headers, data=json.dumps(data))
    elif method == 'patch':
        r = requests.patch(url, headers=headers, data=json.dumps(data))
    elif method == 'put':
        r = requests.put(url, headers=headers, data=json.dumps(data))
    elif method == 'delete':
        r = requests.delete(url)

    return {'status': r.status_code, 'response' : r.text}

def get_response(t):
    return json.loads(t['response'])
    

############## 회원가입 테스트 ##############
def signup_test(username, password, nickname, phone):
    datas = {
        'username': username,
        'password': password,
        'nickname': nickname,
        'phone': phone,
    }
    return get_response(request_server('post', SERVER_URL+'/auth/signup', headers=headers, data=datas))


############## 로그인 테스트 ##############
def login_test(username, password):
    datas = {
        'username': username,
        'password': password,
    }
    return get_response(request_server('post', SERVER_URL+'/auth/login', headers=headers, data=datas))


############## 핸드폰 인증 테스트 ##############
def phone_create_test(phoneNumber):
    datas = {
        'phoneNumber': phoneNumber,
    }
    return get_response(request_server('post', SERVER_URL+'/phone/', headers=headers, data=datas))

def phone_check_test(phoneId, verficiatonCode):
    datas = {
        'phoneId': phoneId,
        'verificationCode': verficiatonCode
    }
    return get_response(request_server('post', SERVER_URL+'/phone/check', headers=headers, data=datas))


############## 아이템 생성 테스트 ##############
def item_create_test(url):
    datas = {
        'url': url,
    }
    return get_response(request_server('post', SERVER_URL+'/item', headers=headers, data=datas))


############## 아이템 조회 테스트 ##############
def item_get_test(userId, itemId):
    datas = {
        'userId': userId
    }
    return get_response(request_server('get', SERVER_URL+'/item/{}'.format(itemId), headers=headers, data=datas))


############## 컬렉션 생성 테스트 ##############
def collection_create_test(title, description, isPublic):
    datas = {
        'title': title, 
        'description': description,
        'isPublic': isPublic,
    }
    return get_response(request_server('post', SERVER_URL+'/collection', headers=headers, data=datas))

def collection_update_test(userId, collectionId, title, description, isPublic):
    datas = {
        'title': title, 
        'description': description,
        'isPublic': isPublic,
    }
    return get_response(request_server('patch', SERVER_URL+f'/collection/{userId}/{collectionId}', headers=headers, data=datas))


############## 아이템 컬렉션에 추가 테스트 ##############
def add_item_to_collection_test(itemId, collectionId):
    datas = {
        'collectionId': collectionId,
    }
    return get_response(request_server('patch', SERVER_URL+'/item/{}'.format(itemId), headers=headers, data=datas))

############## 컬렉션에서 아이템 삭제 테스트 ##############
def remove_item_to_collection_test(itemId, originalCollectionId):
    datas = {
        'originalCollectionId': originalCollectionId,
    }
    return get_response(request_server('patch', SERVER_URL+'/item/{}'.format(itemId), headers=headers, data=datas))

############## 아이템 컬렉션 이동 테스트 ##############
def move_item_to_collection_test(itemId, originalCollectionId, collectionId):
    datas = {
        'originalCollectionId': originalCollectionId,
        'collectionId': collectionId,
    }
    return get_response(request_server('patch', SERVER_URL+'/item/{}'.format(itemId), headers=headers, data=datas))


############## 컬렉션 목록조회 테스트 ##############
def get_collections_test(accountId):
    datas = {
        
    }
    return get_response(request_server('get', SERVER_URL+f'/collection/{accountId}', headers=headers, data=datas))

def get_collection_test(accountId, collectionId):
    datas = {
        
    }
    return get_response(request_server('get', SERVER_URL+f'/collection/{accountId}/{collectionId}', headers=headers, data=datas))

############## 리뷰 생성 테스트 ##############
def review_create_test(itemId, isRecommend, stickers):
    datas = {
        'isRecommend': isRecommend,
        'stickers': stickers
    }
    return get_response(request_server('post', SERVER_URL+'/item/{}/review'.format(itemId), headers=headers, data=datas))

############## 리뷰 수정 테스트 ##############
def review_update_test(itemId, reviewId, isRecommend, stickers):
    datas = {
        'isRecommend': isRecommend,
        'stickers': stickers
    }

    return get_response(request_server('patch', SERVER_URL+'/item/{}/review/{}'.format(itemId, reviewId), headers=headers, data=datas))

############## 팔로우 테스트 ##############
def follow_test(accountId):
    datas = {
        'accountId': accountId
    }

    return get_response(request_server('post', SERVER_URL+'/follow', headers=headers, data=datas))


############## 팔로우 테스트 ##############
def recommend_test():
    datas = {}
    return get_response(request_server('get', SERVER_URL+'/recommend', headers=headers, data=datas))

# 효림 크롤러 테스트
def server_on_test():
    SERVER_URL = 'http://k6a3021.p.ssafy.io:8081'
    headers['user_id'] = '6270f48b246b37074e26928d'
    datas = {
        'item_id': '627281b225482e0f35dcdc25',
        'url': 'https://smartstore.naver.com/happyribbonsociety/products/6581418818?NaPm=ct%3Dl2rmjb80%7Cci%3D22fcb87d3c8cc1969ca6e89a8a58dc054c6c7648%7Ctr%3Dslsl%7Csn%3D1133950%7Chk%3D1ad0025dcb5e6d8b91fde60bd55720148900fff6'
    }
    print(request_server('post', SERVER_URL+'/item', headers=headers, data=datas))


if __name__ == '__main__':
    # # 핸드폰 인증, 회원가입
    # phone = phone_create_test('01099282799')['phone']
    # phone_check_test(phone['_id'], phone['verificationCode'])
    # res = signup_test('sosiny', 'test1234!@', '재지니', '01099282799')

    # 로그인, 토큰 발급
    login_result = login_test('sosiny', 'test1234!@')
    userId = login_result['userId']
    print('유저 필터 - { _id: ObjectId("%s") }'%userId)
    accessToken = login_result['accessToken']
    headers['Authorization'] = "Bearer " + accessToken
    # print(accessToken)

    # # 아이템 생성
    # url = 'https://brand.naver.com/charleskeithkr/products/6650990295'
    # itemId = item_create_test(url)['_id']
    # print('아이템 필터 - { _id: ObjectId("%s") }'%itemId)
    
    # # 아이템 조회
    # userId = '6270e1db1a7512b38548c911'
    itemId = '626b67ba8b35804ffbf0cd1f'
    # item_get_result = item_get_test(userId, itemId)
    # print(item_get_result)

    # # 컬렉션 생성
    # collectionId = collection_create_test('재지니 컬렉션', '테스트 테스트', True)['collection']['_id']
    # print('컬렉션 필터 - { _id: ObjectId("%s") }'%collectionId)

    # # 컬렉션 수정
    # collectionId = '627c81ca4964aba42f4e3e20'
    # import time
    # timenow = time.time()
    # [collection_update_test(userId, collectionId, '재지니 수정 제목', '내용수정수정', True) for i in range(50)]
    # print(time.time() - timenow)


    # 아이템 - 컬렉션
    # collectionId = '627c81ca4964aba42f4e3e20'
    # add_item_to_collection_test(itemId, collectionId)

    itemId = '6274ef5a72ea9574397709d2'
    originalCollectionId = '627c81ca4964aba42f4e3e20'
    remove_item_to_collection_test(itemId, originalCollectionId)
    # move_item_to_collection_test(itemId, originalCollectionId, collectionId)

    # # 리뷰
    # isRecommend = 1
    # stickers = [1, 3, 6]
    # review = review_create_test(itemId, isRecommend, stickers)['review']
    # print(review)
    # reviewId = review['_id']
    # print('리뷰 필터 - { _id: ObjectId("%s") }'%reviewId)

    # reviewId = '627b7c458c5f6e9cf3aa86fa'
    # print(review_update_test(itemId, reviewId, 2, [2,3,4]))


    # # 팔로우 테스트
    # print(follow_test('6279f83cff32cbaf6a81042d'))

    # # 추천 테스트
    # print(recommend_test())

    # # 컬렉션 목록 조회 테스트
    # print(get_collections_test(userId))

    # # 컬렉션 상세조회 테스트
    # print(get_collection_test(userId, collectionId))


    # 서버 온 테스트
    # server_on_test()


# https://shop-phinf.pstatic.net/20220412_201/1649744907855oUh5W_JPEG/50880742616530634_1313937351.jpg?type=m510