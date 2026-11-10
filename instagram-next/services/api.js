// ~/instagram-next/services/api.js

// 우리 서버에 보내는 요청은 모두 이 함수를 지나간다.
export async function request(path, { method, body } = {}) {
  const options = { method };

  // 보낼 값이 있으면 JSON 글자로 바꾸고, 본문이 JSON 이라는 것을 헤더로 알린다.
  if (body !== undefined) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`/api${path}`, options);

  if (!response.ok) {
    // 백엔드에 닿지 못하면 Next.js 서버가 JSON 이 아닌 글자로 답한다 — 읽지 못하면 null 로 둔다.
    const data = await response.json().catch(() => null);
    // 서버가 보낸 문장이 있으면 그것을, 없으면 상태 코드로 만든 문장을 던진다.
    throw new Error(
      data?.message ?? `요청을 처리하지 못했어요 (${response.status})`,
    );
  }

  return response.json();
}
