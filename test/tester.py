import requests
import json

SERVER_URL = 'http://localhost:8000'
headers = {u'content-type': u'application/json'}

# r = requests.post(URL, headers=headers, data=json.dumps(datas))

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


datas = {
    '_id': 'ObjectId',
    'url': '스마트스토어 url'
}

express_tester('post', SERVER_URL+'/item', headers=headers, data=datas)