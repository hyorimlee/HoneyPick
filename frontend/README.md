# Frontend

## 🎈 기술 특이점

### React Native

<img src="https://user-images.githubusercontent.com/84773475/169727558-09e6efdd-0586-4a83-8538-fe165da550f2.png" alt="ReactNative_logo" style="float:right; width: 300px;">

이번 프로젝트는 사용자들의 접근성을 고려하여 모바일 환경을 대상으로 개발을 진행하게 되었습니다.\
사용자에게 편리한 서비스와 네이티브만의 추가적인 기능을 제공하기 위하여 웹앱 개발보다 네이티브의 개발을 진행하게 되었습니다.

네이티브 개발을 진행하는데 필요한 Android(Java, Kotlin), IOS(Object-c, Swift) 외에 최근에 부상하고 있는 방식으로 두가지의 플랫폼을 동시에 개발이 가능한 React Native 와 Flutter 를 고려하게 되었습니다.\
React와 유사하고 호환성이 좋으며 JavaScript 를 이용하여 개발 진행이 가능하므로 React Native 를 이용하여 개발을 진행하게 되었습니다.

&nbsp;

### Redux-toolkit

<img src="https://user-images.githubusercontent.com/84773475/169727770-649bcf34-18a2-4bd6-aede-e8332ca4bfaa.png" alt="ReduxToolkit_logo" style="float:right; width: 300px;">

기획 과정에서 다수의 컴포넌트와 페이지를 기획하게 되었고 원활한 개발 진행을 위하여 전역 상태 관리가 필요하게 되었습니다.\
React 의 상태 관리 라이브러리 중 React와 호환성이 좋으며 여러 미들웨어 사용이 가능하며 대규모 커뮤니티가 형성되어 있는 Redux 를 선택하게 되었습니다.

Redux 와 함께 사용하기 좋은 immer, thunk, 등을 이용하여 Redux 를 좀 더 효율적으로 사용하기 위하여 Redux-Toolkit 을 이용하게 되었습니다.\

&nbsp;

### TypeScript

<img src="https://user-images.githubusercontent.com/84773475/169729210-42eac8b2-23d9-463b-9187-b9e4f8b045c0.png" alt="TypeScript_logo" style="float:right; height: 150px;">

JavaScript 를 이용한 프로젝트 개발 진행시 테스트 및 실서비스 배포 과정에서 예상치 못한 오류 발생하였고, 일부 변수에서 개발 당시 예상하지 못한 값이 지정되어 어려움을 겪는 경우가 종종 있었습니다.

이러한 문제들을 방지하고 변수에 타입 지정을 통해 개발자들간 변수 사용시 이슈가 발생하는 현상을 줄이기 위하여 TypeScript 를 이용하게 되었습니다.

&nbsp;
&nbsp;

## 🎨 Wireframe

<img src="https://user-images.githubusercontent.com/84773475/169730930-733af2b0-4d2e-417e-8e65-40fe69e475bf.png" alt="wireframe">

&nbsp;
&nbsp;

## 🚗페이지 상세설명

### 로그인 / 회원가입 페이지

<img src="https://user-images.githubusercontent.com/84773475/169734938-2f8ad83e-273d-4773-9f2c-6c19aa08b3eb.jpg" alt="signin" style="float: left; margin-right: 1rem; height: 300px;">

<img src="https://user-images.githubusercontent.com/84773475/169734935-7788c5b8-a3f1-4e53-9772-a67e6ee62023.jpg" alt="signup" style="float: left; margin-right: 1rem; height: 300px;">

사용자의 중복 가입 방지를 위해 휴대전화번호 입력 후 인증 코드를 확인하여 가입을 진행할 수 있습니다.\
이후 사용자가 로그아웃 이후 재로그인 진행시 로그인하여 서비스를 진행할 수 있습니다.

<div style="clear: both;">

&nbsp;

### 프로필 페이지

<img src="https://user-images.githubusercontent.com/84773475/169738197-a1e0a40e-ade5-4c5f-8f8a-ec3130084ca5.gif" alt="profile" style="float: left; margin-right: 1rem; height: 300px;">

서비스 이용시 메인 페이지는 사용자의 프로필 페이지입니다.\
프로필 수정하기로 닉네임, 자기소개, 프로필 사진, 휴대전화번호 변경이 가능합니다.

또한, 팔로잉/팔로워 페이지로 이동하여 사용자의 팔로잉, 팔로워 목록을 확인 할 수 있습니다.\
다른 사용자의 프로필을 선택하여 해당 사용자 프로필 페이지로 이동이 가능합니다.

<div style="clear: both;">

&nbsp;

### 컬렉션 페이지

<img src="https://user-images.githubusercontent.com/84773475/169737838-a52eca60-f52f-4cc8-97f8-d57174e155ce.gif" alt="collection" style="float: left; margin-right: 1rem; height: 300px;">

프로필 페이지에서 사용자가 생성한 컬렉션 확인이 가능합니다.\
컬렉션 상세페이지에는 사용자가 쇼핑몰에서 가져온 아이템 목록을 확인 할 수 있습니다.

또한, 컬렉션에 대한 타이틀과 컬렉션 설명을 수정 할 수 있고, 해당 컬렉션의 아이템들로 투표를 진행 할 수 있습니다.

<div style="clear: both;">

&nbsp;

### 아이템 페이지

<img src="https://user-images.githubusercontent.com/84773475/169738311-07fc9c02-a925-4bb8-ab3c-0b0e85de7f30.gif" alt="item" style="float: left; margin-right: 1rem; height: 300px;">

아이템 상세페이지에서는 사용자가 가져온 쇼핑몰의 상품에 대한 상세 정보를 확인 할 수 있습니다.

아이템에 대해 사용자가 추천 스티커를 남길 수 있으며, 다른 사용자들이 해당 아이템에 대한 추천 스티커도 함께 볼 수 있습니다.

<div style="clear: both;">

&nbsp;

### 투표 페이지

<img src="https://user-images.githubusercontent.com/84773475/169754326-ddf0dc97-bb77-4fcd-b5ae-22561acd8109.jpg" alt="vote" style="float: left; margin-right: 1rem; height: 300px;">

컬렉션의 아이템들로 투표를 진행 할 수 있으며, 투표를 종료하여 투표 결과를 확인 할 수 있습니다.

<div style="clear: both;">

&nbsp;

### 아이템 추가하기

<img src="https://user-images.githubusercontent.com/84773475/169755265-d9e5110d-dea3-4253-af24-01010860422e.gif" alt="add_item" style="float: left; margin-right: 1rem; height: 300px;">

브라우저를 이용하여 쇼핑하였을때, 해당 쇼핑몰의 주소를 복사하여 상품의 정보를 가져 올 수 있습니다.

주소를 복사 한 이후 어플리케이션 재접속시 복사된 링크를 감지하여 추가 가능합니다.

<div style="clear: both;">

&nbsp;

### 추천 페이지

<img src="https://user-images.githubusercontent.com/84773475/169756196-7b2359c3-aaa2-43a1-810b-12d34afc4fdc.gif" alt="recommend" style="float: left; margin-right: 1rem; height: 300px;">

하단 탭의 추천을 선택하여 다른 사용자들이 추가한 아이템과 컬렉션을 추천 받을 수 있습니다.

추천의 종류로 가장 많은 마음을 담은 컬렉션(인기가 많은), 특정 스티커를 많이 받은 아이템 등을 추천 받을 수 있습니다.

<div style="clear: both;">

&nbsp;

### 검색 페이지

<img src="https://user-images.githubusercontent.com/84773475/169757215-f341e5d9-2fdb-41c2-ab0c-1e4828c23b74.gif" alt="search" style="float: left; margin-right: 1rem; height: 300px;">

하단 탭의 검색을 이용하여, 원하는 컬렉션 또는 아이템을 검색 할 수 있습니다.

검색된 컬렉션 또는 아이템을 선택하여 상세페이지로 이동되고, 본인의 컬렉션에 추가 할 수 있습니다.

<div style="clear: both;">

&nbsp;

### 이벤트 페이지

<img src="https://user-images.githubusercontent.com/84773475/169756573-57505ae1-2e76-4cb7-b76b-8f8e6b91c356.gif" alt="event" style="float: left; margin-right: 1rem; height: 300px;">

관리자가 진행하는 특정 이벤트 투표에 참여 할 수 있습니다.

특정 기간 진행되는 이벤트는 이벤트 종료 이후 투표의 결과를 확인 할 수 있습니다.

<div style="clear: both;">

&nbsp;
&nbsp;

## 🍒File structure

```reStructuredText
frontend
|   .env
|   App.tsx
|   package.json
|   README.md
|           
├───patches
|       @types+react-native+0.67.4.patch
|       react-native-actions-sheet+0.6.1.patch
|       
├───src
|   ├───assets
|   |   └───images
|   |           
|   ├───components
|   |   ├───button
|   |   |   └───base
|   |   ├───flatList
|   |   |   └───horizontalList   
|   |   ├───modalView
|   |   ├───saveItemBtn
|   |   └───textInput
|   |       └───base
|   |               
|   ├───containers
|   |   ├───chooseCollection
|   |   └───submitForm
|   |       ├───collectionForm
|   |       ├───phoneForm
|   |       └───voteForm
|   |               
|   ├───modules
|   |       convert.ts
|   |       stickers.ts
|   |       valid.ts
|   |       
|   ├───pages
|   |   ├───index.ts
|   |   |   
|   |   ├───collection
|   |   |   └───components
|   |   |       ├───collectionInfo
|   |   |       ├───collectionItems
|   |   |       └───itemComponent
|   |   |               
|   |   ├───follow
|   |   |   └───components
|   |   |       └───followList
|   |   |               
|   |   ├───home
|   |   |   ├───event
|   |   |   |   ├───default  
|   |   |   |   └───eventItem
|   |   |   |           
|   |   |   ├───profile
|   |   |   |   ├───components
|   |   |   |   |   ├───profileInfo
|   |   |   |   |   └───profileLists
|   |   |   |   ├───default
|   |   |   |   └───editProfile
|   |   |   ├───recommend
|   |   |   └───search
|   |   |       └───components
|   |   |           └───searchResult
|   |   |                   
|   |   ├───item
|   |   |   └───components
|   |   |       ├───itemInfo
|   |   |       ├───recommendInfo
|   |   |       |   ├───gaugeBar
|   |   |       |   └───recommendBar
|   |   |       └───recommendSettings
|   |   |           ├───selectButton
|   |   |           └───stickerBtn
|   |   |                   
|   |   ├───signIn
|   |   |   └───components
|   |   |       └───signInForm
|   |   |               index.tsx
|   |   |               
|   |   ├───signUp
|   |   |   └───components
|   |   |       └───signUpForm
|   |   |               
|   |   └───vote
|   |       ├───components
|   |       |   ├───resultItems
|   |       |   ├───voteInfo
|   |       |   └───voteItems
|   |       ├───default
|   |       └───voteResult
|   |               
|   └───store
|       |   index.ts
|       |   reducer.ts
|       |   types.ts
|       └───slices
|           ├───collection
|           ├───event
|           ├───item 
|           ├───profile  
|           ├───recommend
|           ├───search 
|           ├───ui 
|           ├───user  
|           └───vote
|                   
└───types
        navigation.ts
```
