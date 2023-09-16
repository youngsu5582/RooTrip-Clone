# RooTrip-Clone

![165 229 86 126_8080_ (1)](https://user-images.githubusercontent.com/44726494/228187883-256028d0-c7e6-44dd-afaf-717f0e8d1de8.png)
**나의 여행을 공유하는 여행용 SNS**

## Table of Contents

1. <a href="#커밋-컨벤션">커밋 컨벤션</a>
2. <a href="#폴더-규칙">폴더 규칙</a>
3. <a href="#팀원">팀원</a>

## 커밋 컨벤션

<img src="https://user-images.githubusercontent.com/44726494/222941077-0441e481-34ce-44d8-9673-7108840d09e6.png" alt="commit convention" width="432px" />

## 폴더 규칙

```
└─ src
 ├─ controllers         컨트롤러
 ├─ config              설정 관련
 ├─ loaders             서드 파티 연동
 ├─ middleware          미들웨어
 ├─ errors              에러 집합
 ├─ models              DB
 ├─ ├─ common           공통 사용 모델
 ├─ ├─ dtos             입출력 Request Response
 ├─ ├─ repositories     레포지토리
 ├─ ├─ tables           테이블(엔티티)
 ├─ ├─ types            DB 관련 타입
 ├─ module              모듈
 ├─ provider            서비스
 ├─ utils               유틸 함수
 ├─ validator           env 검증
 ├─ app.module.ts       서버 구성 모듈
 ├─ main.ts             서버 실행
```

=> 차후 , Standard Architecture 에 의존한 DDD 로 수정 예정 ( 2023.09.15 )

## 팀원

| 이름   | 역할  | 주소                                     |
| ------ | ----- | ---------------------------------------- |
| 김힘찬 | 🛠 PM  | [Github](https://github.com/HmDol)       |
| 강병준 | 🌞 FE | [Github](https://github.com/bangdori)    |
| 정문규 | 🌞 FE | [Github](https://github.com/JungMunGyu)  |
| 우재민 | 🌚 BE | [Github](https://github.com/WooJJam)     |
| 이영수 | 🌚 BE | [Github](https://github.com/youngsu5582) |

🛠 Address: [Notion](https://www.notion.so/e0bed146cc4c4280b7c5a05f4df22b90?v=975aa4fe34d6456e9ca84e4fd59690d6)
<br/> 🌞 Address: [RooTrip-FE](https://github.com/JungMunGyu/RooTrip-Front)
<br/> 🌚 Address: [RooTrip-BE](https://github.com/youngsu5582/RooTrip-Clone)
