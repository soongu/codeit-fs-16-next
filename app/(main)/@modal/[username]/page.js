// ~/instagram-next/app/(main)/@modal/[username]/page.js
export const instant = false;

// 모달이 뜬 채 프로필(/minji)로 가면 @modal 슬롯은 이 페이지를 그린다 — 아무것도 그리지 않으니 모달이 사라진다.
export default function NoModal() {
  return null;
}
