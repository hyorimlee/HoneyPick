import requests
import json

SERVER_URL = 'http://localhost:8000/api/v1'
# SERVER_URL = 'http://k6a302.p.ssafy.io:8000/api/v1'

headers = {u'content-type': u'application/json'}

def express_tester(method, url, headers=None, data=None):
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

# signup test
datas = {
    'username': 'sosiny',
    'password': 'test1234!@',
    'nickname': '소신',
    'phone': '01099282799',
}
# signup_result = express_tester('post', SERVER_URL+'/auth/signup', headers=headers, data=datas)
# print(signup_result)

# login test
datas = {
    'username': 'sosiny',
    'password': 'test1234!@',
}
login_result = express_tester('post', SERVER_URL+'/auth/login', headers=headers, data=datas)
print(login_result)
accessToken = json.loads(login_result['response'])['accessToken']
print(accessToken)

# accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjcwZTFkYjFhNzUxMmIzODU0OGM5MTEiLCJpYXQiOjE2NTE2NDMwOTIsImV4cCI6MTY1MTY0MzEwMn0.BbRcdiih_ywRzTiYQi_oO19V1-mkICpoUzRKeym49dM'
headers['Authorization'] = "Bearer " + accessToken

# # item create test
# datas = {
#     # item_id는 크롤서버 테스트에 사용
#     # 'item_id': '626b4cc0c7a03021da4fd6c8',
#     'url': 'https://smartstore.naver.com/one4farm1/products/5553462146?NaPm=ct%3Dl2h0sark%7Cci%3D32d028fd691b1fe6d18afc6588dedbca0a4bee59%7Ctr%3Dslcc%7Csn%3D302444%7Chk%3D08e50814832b6883ee330fffe36c7069c20084fa'
# }
# print(express_tester('post', SERVER_URL+'/item', headers=headers, data=datas))

# phone test

# datas = {
#     'phoneNumber': '01099282799',
# }
# print(express_tester('post', SERVER_URL+'/phone/', headers=headers, data=datas))

datas = {
    'phoneId': '6270baaaeda5b3332f71e80b',
    'verificationCode': '428449'
}

# print(express_tester('post', SERVER_URL+'/phone/check', headers=headers, data=datas))


# item test
datas = {
    'userId': '6270e1db1a7512b38548c911'
}

itemId = '626b67ba8b35804ffbf0cd1f'

item_get_result = express_tester('get', SERVER_URL+'/item/{}'.format(itemId), headers=headers, data=datas)
print(item_get_result)
# item -> collection 추가 test


# review test

datas = {
    'isRecommend': 2,
    'stickers': [3, 5, 6]
}

# review_post_result = express_tester('post', SERVER_URL+'/item/{}/review'.format(itemId), headers=headers, data=datas)
# print(review_post_result)
# reviewId = json.loads(review_post_result['response'])['review']['_id']

# reviewId = '6270cc778753664e781c3cb7'
datas = {
    'isRecommend': 1,
    'stickers': [1, 2, 5]
}

itemId = '626b67ba8b35804ffbf0cd1f'
# print(express_tester('patch', SERVER_URL+'/item/{}/review/{}'.format(itemId, reviewId), headers=headers, data=datas))