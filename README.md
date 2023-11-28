# How Do I Look
![main](https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/00cd53db-3079-4e2d-8bd1-9cc2e6c9ee6a)

<br>

## 🖥️ 프로젝트 소개
WebRTC 화상 채팅을 이용한 코디 조언 서비스 **`HOW Do I Look`**

<br>

현재 시중에 나온 옷장 관리 및 옷 관련 서비스들 중에는 나의 옷을 자랑하거나 남이 입은 옷을 보는 기능밖에 없습니다. <br>
이는 옷을 못 입는 사람에겐 도움이 되지 않습니다. 따라 입었다가 어울리지 않을 가능성도 농후합니다. <br>
**`HOW Do I Look`** 은 나의 옷장에서 나에게 어울리는 옷을 추천받고, 추천해줄 수 있는 서비스를 고안하였습니다. <br>

<br>

## 🕰️ 개발 기간
* 2023.07.04일 - 2023.08.18일 (약 7주)

<br><br>


## 👀 시연

<br>

### 📌 메인 페이지 / 로그인

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/4d84b7e5-df95-410c-ad98-ff18d9720866

- 핵심 기능들을 소개하는 메인 페이지입니다.

<br>

### 📌 나만의 옷장

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/530dc70d-9f7a-4326-80c1-b3d15fe2c604
  
- 의류 등록 시, 의류 외 배경이 있는 사진이더라도, **누끼**를 자동으로 따서 옷장에 흰 배경의 깔끔한 사진이 업로드 됩니다.
  
- **PUBLIC** 상태의 타 유저의 옷장에도 접속할 수 있습니다. **블랙리스트**에 등록되어 있거나, **PRIVATE**인 유저의 옷장에는 접속할 수 없습니다.
  
<br>

### 📌 OOTD(나만의 코디)

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/a922a661-edf2-416c-b423-5018179b8b3d

- 옷장에 등록한 옷들 중, **자주 입는 코디 조합을 저장**해 놓고 언제든지 확인할 수 있습니다.

- 현재 **날씨**를 통해 어떤 의류를 선택할 지 도움을 받을 수 있습니다.

<br>

### 📌 스트리밍 방 만들기

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/49898216-c46b-4798-84b9-51ad2f26b8db

- 옷장의 나의 옷을 등록했다면 나의 옷을 추천받을 수 있는 스트리밍 방을 생성해 **패션 마스터**들에게 조언을 받을 수 있습니다. 

- 좌측의 다섯가지 탭을 이용해 **방장 옷장 접근** & **피드 사진 검색** 기능을 이용해 방장에게 추천할 옷을 PICK할 수 있습니다.

- 또한 좌측의 다섯가지 탭을 이용해 **PICK 의류 확인** 기능을 통해 드래그앤드랍 기능으로 옷의 순서를 제어하여 채팅으로 보낼 수 있습니다.

- 좌측의 **THE END** 버튼을 누르면 스트리밍이 종료됩니다.

- 하단 프로필의 이름의 색은 프로필에서 선택한 **마스터 대표 뱃지의 색**입니다. 뱃지는 랭킹 상위 10%에게만 주어집니다.

- 프로필을 클릭하면 **해당 유저의 옷장 보기 기능** 와 **점수 주기 기능** 이 있습니다. 점수는 랭킹과 뱃지에 반영됩니다.

- 만약 블랙리스트에 등록하면 해당 유저는 **즉시 강퇴**되고, 해당 유저의 스트리밍 리스트에 방이 사라지게 되어 **다시 접속할 수 없습니다.**
	

<br>

### 📌 강퇴하고 스트리밍 종료하기 (스트리밍 생성자 시점)

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/f22ee723-57dd-4c45-ac51-a04fb2f2b396

- 블랙리스트 처리가 아니더라도 개별적인 강퇴기능이 존재합니다.


<br>


### 📌 강퇴당하기 (스트리밍 참여자 시점)

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/33841069-08a0-4b64-9805-788127cc815b

- 강퇴 유저의 경우 해당 방에는 다시 들어갈 수 없습니다.

<br>

### 📌 피드

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/854950a2-227c-43d7-bfa4-5068120061f3

- 각 피드는 여러 **사진**으로 이루어져 있으며, 각 사진은 여러 **해시태그**로 이루어져 있습니다.

- 각 피드의 작성자를 **팔로우 / 언팔로우** 할 수 있습니다.

- 다른 사람의 피드를 보며 **댓글**을 작성하거나, 네 가지 종류의 **좋아요**를 누를 수 있습니다. 이는 랭킹에 반영됩니다.

- 최상단의 해시태그 **검색** 기능을 통해 특정 해시태그를 표시한 피드 글을 검색할 수 있습니다.

- 우측 **팔로우 탭**을 통해 현재 내가 팔로우 중인 유저의 정보를 알 수 있고, 해당 유저의 옷장 / 프로필로 이동할 수 있습니다.

<br>

### 📌 프로필

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/bd6a414e-365c-4766-b220-4d5002cb71a4

- **팔로잉 / 팔로워 / 피드 수 / 블랙리스트**를 확인 할 수 있습니다.

- 내가 보유한 뱃지 중, **대표 뱃지**를 설정할 수 있습니다.

<br>

### 📌 랭킹

https://github.com/SahhaShin/HOW-DO-I-LOOK/assets/33896511/90a7111f-c5e4-4ece-b494-170d1e305877

- 네 가지 좋아요 종류 별 점수 **랭킹**을 확인할 수 있습니다.
    
- 실시간 반영되는 랭킹과 점수를 활용하여 매일 12시에 상위 10%에 한해서 **뱃지**를 제공합니다.

<br><br>

## ⚒️ 개발 환경

- Co-Op Tools
  
  - Notion
  - Mattermost
  - Discord

<br>

- Front
  
  - IDE : Visual Studio Code
  - React.js
  - Redux Toolkit
  - TypeScript
  - Styled-Components

<br>

- Back
  
  - IDE : IntelliJ
  - SpringBoot
  - Spring Security
  - WebSocket
  - Stomp

<br>

- DB
  
  - MySQL
  - Redis
  - MongoDB

<br>

- Infra
  
  - SSH Tool : MobaXterm
  - AWS EC2
  - Docker
  - Nginx
  - AWS S3

<br><br>

## ⚙️ 프로젝트 구조
![기술소개](./exec/기술소개.png)

<br><br>

## 🎁 설계 산출물

### 요구사항 정의서
- [요구사항 정의서](https://docs.google.com/spreadsheets/d/1NvqENkNIhlGdF_9zhgCSmFZBL0I4IAqds_iyspejK20/edit#gid=1465296996)

<br>

### figma
- [figma](https://www.figma.com/file/3BwC0XBTPb3MhTY9zYYa6F/Prototype?type=design&node-id=95-1536&mode=design&t=d6VnqvyfoMQECuEa-0)

<br>


### ERD 설계
![ERD](./exec/ERD.png)

<br>


### API 명세서
- [API 명세서](https://triangular-printer-aad.notion.site/API-cf99cb16a24b4f989c4d2616c88523fe)

<br>


### 협업 관리
- 노션 : [바로가기](https://triangular-printer-aad.notion.site/4-6fa2c73aa08843f9a23e61d548609074)
- 지라 : private
- 코드 컨벤션 : [바로가기](https://triangular-printer-aad.notion.site/4-6fa2c73aa08843f9a23e61d548609074)

<br>

## 🧑‍🤝‍🧑 멤버구성
<table style="text-align: center;">
  <tr>
    <th>신산하</th>
    <th>박세윤</th>
    <th>손정민</th>
  </tr>
  <tr>
    <td><a href="https://github.com/SahhaShin"><img src="https://avatars.githubusercontent.com/u/33896511?v=4" alt="신산하 사진"></a></td>
    <td><a href="https://github.com/ParkSeYun98"><img src="https://avatars.githubusercontent.com/u/81186461?v=4" alt="박세윤 사진"></a></td>
    <td><a href="https://github.com/jungmin0049"><img src="https://avatars.githubusercontent.com/u/74610027?v=4" alt="손정민 사진"></a></td>
  </tr>
  <tr>
    <th>Team Leader / Front</th>
    <th>Back / Infra / Front</th>
    <th>Front</th>
  </tr>
</table>

<table style="text-align: center;">
  <tr>
    <th>김은서</th>
    <th>유태영</th>
    <th>정형준</th>
  </tr>
  <tr>
    <td><a href="https://github.com/EunSeo119"><img src="https://avatars.githubusercontent.com/u/64001133?v=4" alt="김은서 사진"></a></td>
    <td><a href="https://github.com/taeyeongryu"><img src="https://avatars.githubusercontent.com/u/122500557?v=4" alt="유태영 사진"></a></td>
    <td><a href="https://github.com/Brojjun"><img src="https://avatars.githubusercontent.com/u/122707977?v=4" alt="정형준 사진"></a></td>
  </tr>
  <tr>
    <th>Back</th>
    <th>Back</th>
    <th>Back</th>
  </tr>
  
</table>
