import requests
import json

SERVER_URL = 'http://localhost:8000/api/v1'
# SERVER_URL = 'http://k6a3021.p.ssafy.io:8000/api/v1'

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
    

# 테스터 기능단위로 통합, 정리

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

# collectionId = collection_create_test()['collection']['_id']


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

def server_on_test():
    # 효림 크롤러 테스트
    SERVER_URL = 'http://k6a3021.p.ssafy.io:8081'
    datas = {
        'item_id': '627281b225482e0f35dcdc25',
        'url': 'https://smartstore.naver.com/happyribbonsociety/products/6581418818?NaPm=ct%3Dl2rmjb80%7Cci%3D22fcb87d3c8cc1969ca6e89a8a58dc054c6c7648%7Ctr%3Dslsl%7Csn%3D1133950%7Chk%3D1ad0025dcb5e6d8b91fde60bd55720148900fff6'
    }
    print(request_server('post', SERVER_URL+'/item', headers=headers, data=datas))

if __name__ == '__main__':
    # # 핸드폰 인증, 회원가입
    # phone = phone_create_test('01099282799')
    # phone_check_test(phone['_id'], phone['verificationCode'])
    # res = signup_test('id', 'password', 'nickname', 'phone')

    # 로그인, 토큰 발급
    accessToken = login_test('sosiny', 'test1234!@')['accessToken']
    headers['Authorization'] = "Bearer " + accessToken

    # 아이템 생성
    url = 'https://smartstore.naver.com/figurefarm/products/4616329700?n_media=27758&n_query=%EB%A1%9C%EC%9A%B0%ED%94%BC%EA%B7%9C%EC%96%B4&n_rank=2&n_ad_group=grp-a001-02-000000024445879&n_ad=nad-a001-02-000000162218527&n_campaign_type=2&n_mall_id=power90000&n_mall_pid=4616329700&n_ad_group_type=2&NaPm=ct%3Dl2u9anv4%7Cci%3D0B40001gVRfwrqrGM0Z1%7Ctr%3Dpla%7Chk%3D43080bca771e5d8adb9c072636e509b1c06917db'
    itemId = item_create_test(url)['_id']
    print('아이템 필터 - { _id: ObjectId("%s") }'%itemId)
    
    # # 아이템 조회
    # userId = '6270e1db1a7512b38548c911'
    # item_get_result = item_get_test(userId, itemId)

    # 컬렉션 생성
    collectionId = collection_create_test('테스트 제목 2', '테스트 테스트', True)['collection']['_id']
    print('컬렉션 필터 - { _id: ObjectId("%s") }'%collectionId)


    # collectionId = '6274e1aea32525908809f60c'
    # originalCollectionId = '626b4cc0c7a03021da4fd6c8'

    # # 아이템 - 컬렉션
    add_item_to_collection_test(itemId, collectionId)
    # remove_item_to_collection_test(itemId, originalCollectionId)
    # move_item_to_collection_test(itemId, originalCollectionId, collectionId)

    # # 리뷰
    isRecommend = 1
    stickers = [1, 3, 6]
    reviewId = review_create_test(itemId, isRecommend, stickers)['review']['_id']
    print('리뷰 필터 - { _id: ObjectId("%s") }'%reviewId)

    # review_update_test(itemId, reviewId, 1, [2,3,4])


    # 서버 온 테스트
    # server_on_test()






