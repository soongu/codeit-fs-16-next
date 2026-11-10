// ~/instagram-next/app/api/v2/members/search/route.js
import { profiles } from "@/data/profiles.js";

export function GET(request) {
  const keyword = request.nextUrl.searchParams.get("keyword");

  // request() 가 부르는 주소라 백엔드의 새 주소와 같은 봉투에 담아 보낸다.
  if (!keyword) {
    return Response.json({ data: [] });
  }

  const found = profiles.filter((item) => item.username.includes(keyword));

  return Response.json({ data: found });
}
