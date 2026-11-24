# codeit-fs-16-next

인스타그램 클론의 화면(프론트엔드)이에요. Next.js 16(App Router) + React 19 + React Query + Zustand로 만들어져 있고, 로그인·피드·프로필·게시물을 백엔드 서버와 주고받아요.

데이터는 짝이 되는 백엔드 [instagram-api-express2026](https://github.com/soongu/instagram-api-express2026)에서 가져와요. **백엔드를 먼저 켜 두지 않으면 로그인도 피드도 동작하지 않아요.** 아래 1단계에서 그 저장소를 내려받아 서버를 켜세요.

이 문서는 처음 내려받은 사람이 화면을 띄우고 로그인해서 피드가 보이는 데까지를 안내해요. 위에서부터 순서대로 따라 하세요.

## 0. 준비물

| 도구 | 확인 방법 | 기준 |
|---|---|---|
| Node.js | 터미널에서 `node -v` | v20.9 이상(백엔드는 v24 이상) |
| Docker Desktop | 터미널에서 `docker -v`, 그리고 앱이 **실행 중**인지 | 아무 버전(백엔드의 DB용) |
| Git | 터미널에서 `git --version` | 아무 버전 |

## 1. 백엔드 먼저 켜기

화면 저장소와 백엔드 저장소를 같은 폴더 아래에 나란히 내려받는 걸 추천해요.

```bash
mkdir instagram && cd instagram
git clone https://github.com/soongu/instagram-api-express2026.git
cd instagram-api-express2026
```

그다음 그 저장소의 README 1~6단계를 그대로 따라 해요. 요약하면 이래요.

```bash
npm install
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
docker compose up -d        # DB 컨테이너 켜기 (10초쯤 기다려요)
npm run build               # 테이블 만들기
npm run seed                # 예시 데이터 넣기
npm run dev                 # 서버 켜기 — 3000번 포트
```

터미널에 `서버가 3000번 포트에서 기다리고 있어요.`가 나오면 된 거예요. **이 터미널은 끄지 말고 그대로 두세요.**

## 2. 화면 내려받고 패키지 설치

**새 터미널**을 열고 `instagram` 폴더로 돌아와서 화면 저장소를 내려받아요.

```bash
cd ..
git clone https://github.com/soongu/codeit-fs-16-next.git
cd codeit-fs-16-next
npm install
```

`main` 브랜치에는 **마지막으로 정리된 코드(p3-48 시점)** 가 들어 있어요. 수업 회차별 코드를 보고 싶으면 아래 「회차별 브랜치 보기」를 읽으세요.

## 3. `.env.local` 파일 만들기

화면이 백엔드 주소를 알아야 해서 설정 파일을 만들어요. Next.js는 `.env.local` 이라는 이름을 읽어요. 예시 파일을 복사하세요.

```bash
# macOS / Linux / Git Bash
cp .env.example .env.local
```

```powershell
# Windows PowerShell
Copy-Item .env.example .env.local
```

내용은 그대로 써도 돼요.

```
SITE_URL=http://localhost:3001
API_URL=http://localhost:3000
```

| 이름 | 뜻 |
|---|---|
| `SITE_URL` | 이 화면이 열리는 주소예요. 아래 4단계에서 3001번 포트로 켜는 것과 맞아요. |
| `API_URL` | 백엔드 서버 주소예요. 1단계에서 켠 서버(3000번)와 맞아요. 백엔드의 `PORT`를 바꿨다면 여기도 같은 번호로 바꾸세요. |

⚠️ `.env.local`을 바꾼 뒤에는 개발 서버를 껐다가 다시 켜야 반영돼요.

## 4. 화면 실행

```bash
npm run dev -- -p 3001
```

백엔드가 이미 3000번을 쓰고 있어서 화면은 **3001번 포트**로 켜요. `-p 3001`을 빼면 3000번이 겹쳐서 에러가 나요.

터미널에 이렇게 나오면 켜진 거예요.

```
▲ Next.js 16.4.1 (Turbopack)
- Local:         http://localhost:3001
✓ Ready
```

⚠️ **처음 한 번은 `Your version of Next.js is affected by a known security vulnerability.` 같은 안내가 나오면서 멈출 수 있어요.** 오류가 아니라 업그레이드 권고예요. **같은 명령을 한 번 더 실행하면** 그대로 켜져요. 이 저장소는 수업 시점의 버전(16.4.1)으로 고정해 두었으니, 수업 중에는 업그레이드하지 마세요. 업그레이드하면 교안과 동작이 달라질 수 있어요.

## 5. 잘 되는지 확인

브라우저에서 `http://localhost:3001`을 열어요.

1. 로그인하지 않았으니 `/login` 화면으로 자동으로 넘어가요.
2. 백엔드의 예시 계정으로 로그인해요. 사용자 이름 `jaehoon`, 비밀번호 `jaehoon1234`예요. (규칙은 **사용자 이름 + `1234`** — `minji`는 `minji1234`예요.)
3. 로그인되면 피드에 게시물이 보여요.

로그인이 안 되거나 피드가 비어 있으면 아래 「자주 만나는 문제」를 보세요.

⚠️ 구글·카카오·네이버 소셜 로그인 버튼은 백엔드 `.env`에 진짜 키를 넣어야 동작해요. 연습용 값(`dummy`)으로는 비밀번호 로그인만 돼요.

## 6. 빌드해서 실행해 보기 (선택)

개발 서버(`npm run dev`) 말고, 실제 배포할 때처럼 만들어서 돌려 볼 수도 있어요.

```bash
npm run build
npm run start -- -p 3001
```

`npm run build`는 한 번에 끝나지 않고 4단계와 같은 보안 안내가 먼저 나올 수 있어요. 같은 명령을 한 번 더 실행하세요. 빌드가 끝나면 어떤 화면이 미리 만들어졌고(`○`, `◐`) 어떤 화면이 요청 때마다 만들어지는지(`ƒ`) 표로 보여 줘요. `npm run start`는 `build`가 끝난 뒤에만 쓸 수 있고, 개발 서버(`npm run dev`)와 동시에 같은 포트로 켤 수 없어요.

## 회차별 브랜치 보기

수업 회차가 끝날 때마다 그 시점의 코드를 브랜치로 남겨 뒀어요. 브랜치 이름이 곧 회차 번호예요(`p3-26`은 파트3의 26번째 회차를 마친 코드). 코드가 바뀌지 않은 회차는 브랜치가 없어서 번호가 건너뛰어 있어요.

```bash
git fetch --all            # 원격 브랜치 목록을 받아와요
git branch -r              # 어떤 회차들이 있는지 봐요
git switch p3-26           # 그 회차 시점의 코드로 바꿔요
npm install                # 패키지가 달라졌을 수 있으니 다시 설치
```

처음 `git switch p3-26`을 할 때 `invalid reference`가 나오면 `git switch -c p3-26 origin/p3-26`을 쓰세요. 다시 `main`으로 돌아오려면 `git switch main`이에요.

브랜치를 바꾸면 `.env.local`은 그대로 남지만, 회차에 따라 필요한 환경변수가 다를 수 있어요. `.env.example`을 한 번 열어 비교하세요. 로그인이 들어가는 회차부터는 짝 백엔드가 그 회차에 맞는 버전이어야 해요. **자세히 맞추기 어려우면 두 저장소 모두 `main`으로 두고 쓰는 게 가장 안전해요.**

## 자주 만나는 문제

| 증상 | 원인과 해결 |
|---|---|
| `npm run dev`가 `EADDRINUSE: address already in use :::3001` | 3001번 포트를 다른 프로그램(이전에 켜 둔 화면 서버 등)이 쓰고 있어요. 그 터미널을 `Ctrl + C`로 끄거나, `npm run dev -- -p 3002`처럼 다른 번호로 켜세요. 번호를 바꾸면 `.env.local`의 `SITE_URL`과 백엔드 `.env`의 `CORS_ORIGIN`, `SITE_URL`도 같은 번호로 바꿔요. |
| `npm run dev`에서 보안 취약점 안내가 나오고 멈춤 | 4단계의 안내를 보세요. 같은 명령을 한 번 더 실행하면 켜져요. |
| 3000번을 화면이 쓰려 해서 에러 | 백엔드가 3000번이에요. 화면은 꼭 `-p 3001`로 켜세요. |
| 로그인할 때 연결 오류가 나거나 500 | 백엔드가 안 켜져 있거나 `API_URL`이 틀린 경우가 많아요. 1단계의 터미널에 `서버가 3000번 포트에서 기다리고 있어요.`가 떠 있는지, `.env.local`의 `API_URL`이 맞는지 보세요. `.env.local`을 바꿨다면 개발 서버를 다시 켜세요. |
| `사용자 이름이나 비밀번호가 맞지 않아요` | 예시 데이터가 없거나 비밀번호를 잘못 썼어요. 백엔드에서 `npm run seed`를 했는지, 비밀번호가 `사용자이름1234`인지 확인하세요. |
| 로그인은 되는데 피드가 비어 있음 | 백엔드 DB가 비어 있어요. 백엔드 저장소에서 `docker compose up -d` → `npm run build` → `npm run seed` 순서로 다시 하세요. |
| 계속 `/login` 화면으로 돌아옴 | 로그인 쿠키가 남지 않은 거예요. 로그인이 실제로 성공했는지(위 두 줄의 오류가 없는지) 먼저 보세요. 주소는 `localhost:3001`로 열고, `127.0.0.1`로 열면 쿠키가 따로 취급되니 같은 주소로만 쓰세요. |
| 수정한 `.env.local`이 반영되지 않음 | 개발 서버를 `Ctrl + C`로 끄고 `npm run dev -- -p 3001`을 다시 실행하세요. |
| 이미지가 안 보이고 `hostname ... is not configured under images` | 이미지 주소의 도메인이 `next.config.mjs`의 `images.remotePatterns`에 없어요. 이 저장소는 `picsum.photos`만 허용해요. |

## 자주 쓰는 명령 모음

| 하고 싶은 일 | 명령 |
|---|---|
| 개발 서버 켜기 | `npm run dev -- -p 3001` |
| 빌드(실제 배포용으로 만들기) | `npm run build` |
| 빌드한 것 실행 | `npm run start -- -p 3001` |
| 코드 검사 | `npm run lint` |

## 스택

| | |
|---|---|
| 프레임워크 | Next.js 16.4.1 (App Router, Cache Components) |
| 화면 | React 19, Sass |
| 서버 데이터 | TanStack React Query 5 |
| 화면 상태 | Zustand |
| 검증 | zod |

## 폴더

```
 app/             화면과 주소 (App Router) — 로그인·피드·프로필 등
 components/      여러 화면이 같이 쓰는 컴포넌트
 hooks/           React Query 를 감싼 훅 (게시물·로그인 등)
 services/        백엔드 API 호출 함수
 stores/          Zustand 상태
 utils/           작은 도우미 함수
 styles/          전역·공통 스타일
 data/            화면에서 쓰는 고정 데이터
 requests/        .http 요청 예시
 proxy.js         로그인 쿠키가 없으면 /login 으로 보내는 처리
 next.config.mjs  백엔드로 넘겨 주는 주소(rewrites)와 이미지 설정
```
