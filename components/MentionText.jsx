// ~/instagram-next/components/MentionText.jsx
import Link from "next/link";
import { splitMentions } from "@/utils/mentions.js";

// 댓글과 답글의 글은 쓴 그대로 보여 주고, «@이름» 조각만 그 사람의 프로필로 가는 링크로 바꾼다.
const MentionText = ({ text }) => {
  return splitMentions(text).map((part, index) =>
    part.username === undefined ? (
      part.text
    ) : (
      <Link
        key={index}
        href={`/${part.username}`}
        className="mention-link"
        style={{ cursor: "pointer", color: "#00376b", display: "inline" }}
      >
        {part.text}
      </Link>
    ),
  );
};

export default MentionText;
