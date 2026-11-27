// ~/instagram-next/utils/mentions.js

// @ 바로 뒤에 사용자 이름에 쓸 수 있는 글자(영문 · 숫자 · 밑줄 · 점)가 이어지는 곳이 멘션이다.
// 점은 글자 사이에만 둔다 - «@dahye.» 처럼 문장 끝의 마침표까지 이름으로 읽지 않게.
// @ 바로 앞에 영문 · 숫자 · 밑줄 · 점이 붙어 있으면 멘션이 아니다 - 메일 주소(a@b.com)를 링크로 바꾸지 않게.
// 괄호로 감싸면 split 이 나눈 자리의 글자도 결과에 넣어 준다(utils/hashtags.js 와 같다).
const MENTION = /((?<![0-9A-Za-z_.])@[0-9A-Za-z_]+(?:\.[0-9A-Za-z_]+)*)/;

// 글을 «그냥 글자» 와 «멘션» 조각으로 나눈다. 홀수 번째가 멘션이고, 링크에 쓸 사용자 이름(@ 를 뗀 것)을 함께 담는다.
export function splitMentions(content) {
  return content.split(MENTION).map((text, index) => (index % 2 === 1 ? { text, username: text.slice(1) } : { text }));
}
