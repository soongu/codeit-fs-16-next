// ~/instagram-next/services/socket.js
import { io } from "socket.io-client";
import { reissue } from "./api.js";

// 화면 전체가 연결 하나를 같이 쓴다 - 처음 부를 때 만든다.
// 모듈 맨 위에서 바로 만들면 서버에서 화면을 그릴 때도 연결을 열려고 한다. 브라우저에서 부를 때만 만든다.
let socket = null;

// 기한이 지나 거절된 연결을 이미 한 번 다시 열어 봤는가 - 다시 열었는데 또 거절되면 거기서 멈춘다.
let retried = false;

// 서버의 io.use 가 연결을 거절하면 socket.io-client 는 스스로 다시 시도하지 않는다.
// 토큰의 기한만 지났으면 fetch 요청이 하던 것처럼 새 토큰을 받고, 연결을 한 번만 다시 연다.
async function handleConnectError(error) {
  if (error.data?.code !== "TOKEN_EXPIRED" || retried) {
    return;
  }

  retried = true;

  try {
    // 같은 순간에 fetch 요청도 재발급을 기다리고 있으면 그 요청과 같은 재발급을 함께 기다린다.
    await reissue();
    socket.connect();
  } catch {
    // 새 토큰도 못 받았으면 로그인 기록이 끝난 것이다 - 로그인 화면으로 보낸다. 보던 주소는 ?next= 에 싣는다.
    window.location.replace(`/login?${new URLSearchParams({ next: window.location.pathname + window.location.search })}`);
  }
}

export function getSocket() {
  if (socket === null) {
    // 주소를 안 주면 이 화면과 같은 주소로 연다 - next.config.mjs 의 rewrites 가 백엔드로 넘긴다.
    // Next.js 는 끝에 / 가 붙은 주소를 / 를 뗀 주소로 보내 버려서(308), 처음부터 / 없이 부른다.
    socket = io({ addTrailingSlash: false });
    socket.on("connect_error", handleConnectError);
    // 연결이 열렸으면 다음에 기한이 지났을 때 다시 한 번 열어 볼 수 있다.
    socket.on("connect", () => {
      retried = false;
    });
  }

  return socket;
}
