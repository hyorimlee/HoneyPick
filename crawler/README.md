# Crawler

## Fast API

<img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" alt="fastapi_logo" style="float:right; width: 300px;">

Fast API는 Node.js, Go와 비슷한 수준의 빠른 성능을 가지고있는 파이썬으로 작성된 웹 프레임워크 입니다.

장고에서는 웹 서버와 연동을 위해 WSGI 인터페이스를 사용하는데,\
이는 동기 방식으로 처리의 복잡도가 높아질수록 기다리는 시간이 늘어나는 단점이 있습니다.

반면, Fast API는 Starlette라는 비동기 프레임워크를 기반으로 만들어졌고,\
비동기 처리로 uvloop라는 Cython으로 만들어진 libuv 라이브러리를 사용합니다.

<br><br>

## 타겟 사이트

|  번호  |  쇼핑몰  |     URL     |
| :--: | :----: | :--------------------------------------: |
|  1   | 스마트스토어 | https://smartstore.naver.com/{} |
|  2   | 네이버 브랜드몰 | https://brand.naver.com/{} |
|  3   | 네이버 쇼핑 | https://m.shopping.naver.com/{} |
