// ~/instagram-next/components/HashtagText.jsx
import Link from "next/link";
import { splitHashtags } from "@/utils/hashtags.js";

// 글은 쓴 그대로 보여 주고, 해시태그 조각만 태그 페이지로 가는 링크로 바꾼다.
// 링크 주소에는 글에 적힌 글자가 아니라 저장한 이름(소문자)을 싣는다.
const HashtagText = ({ text }) => {
  return splitHashtags(text).map((part, index) =>
    part.name === undefined ? (
      part.text
    ) : (
      <Link
        key={index}
        href={`/explore/search/keyword?q=${encodeURIComponent(`#${part.name}`)}`}
        className="hashtag-link"
      >
        {part.text}
      </Link>
    ),
  );
};

export default HashtagText;
