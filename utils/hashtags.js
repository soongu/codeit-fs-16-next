// ~/instagram-next/utils/hashtags.js

// 서버의 utils/hashtags.js 와 같은 규칙이다 - # 바로 뒤에 영문, 숫자, 한글, 밑줄(_)이 이어지는 곳이 해시태그다.
// 규칙을 바꿀 때는 두 파일을 함께 고친다. 괄호로 감싸면 split 이 나눈 자리의 글자도 결과에 넣어 준다.
const HASHTAG = /(#[0-9A-Za-z가-힣_]+)/;

// 글을 «그냥 글자» 와 «해시태그» 조각으로 나눈다. split 결과는 글자 · 태그 · 글자 · 태그 … 차례라 홀수 번째가 태그다.
// 태그 조각에는 링크에 쓸 이름도 함께 담는다 - 서버가 저장한 이름처럼 # 을 떼고 소문자로.
export function splitHashtags(content) {
  return content.split(HASHTAG).map((text, index) =>
    index % 2 === 1 ? { text, name: text.slice(1).toLowerCase() } : { text },
  );
}
