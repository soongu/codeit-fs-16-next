// ~/instagram-next/services/socket.js
import { io } from "socket.io-client";

// 화면 전체가 연결 하나를 같이 쓴다 - 처음 부를 때 만든다.
// 모듈 맨 위에서 바로 만들면 서버에서 화면을 그릴 때도 연결을 열려고 한다. 브라우저에서 부를 때만 만든다.
let socket = null;

export function getSocket() {
  if (socket === null) {
    // 주소를 안 주면 이 화면과 같은 주소로 연다 - next.config.mjs 의 rewrites 가 백엔드로 넘긴다.
    socket = io();
  }

  return socket;
}
