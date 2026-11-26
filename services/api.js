// ~/instagram-next/services/api.js

// 서버가 실패로 답했을 때 던지는 에러 — 서버의 HttpError 처럼 상태 코드와 에러 코드를 함께 들고 다닌다.
export class ApiError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// 지금 진행 중인 새 토큰 받기 — 요청 여럿이 한꺼번에 TOKEN_EXPIRED 를 받아도 하나만 보내고 다 같이 기다린다.
// 같은 Refresh 토큰이 두 번 가면 서버는 이미 쓴 토큰이 다시 왔다고 보고 로그인 기록을 지운다.
let reissuing = null;

function reissue() {
  if (reissuing === null) {
    reissuing = request("/auth/reissue", { method: "POST" }).finally(() => {
      reissuing = null;
    });
  }

  return reissuing;
}

// 우리 서버에 보내는 요청은 모두 이 함수를 지나간다 — 화면은 이 함수 대신 아래 서비스 객체를 부른다.
async function request(path, { method, params, body, retried = false } = {}) {
  // 쿼리 문자열은 URLSearchParams 로 만든다 — 값에 든 & # + 도 글자 그대로 서버에 간다.
  const query = params === undefined ? "" : `?${new URLSearchParams(params)}`;
  const options = { method };

  if (body instanceof FormData) {
    // 파일은 FormData 그대로 보낸다 — Content-Type 헤더는 적지 않는다.
    // 브라우저가 multipart/form-data 와, 파트와 파트 사이에 넣을 boundary 글자를 직접 적는다.
    options.body = body;
  } else if (body !== undefined) {
    // 보낼 값이 있으면 JSON 글자로 바꾸고, 본문이 JSON 이라는 것을 헤더로 알린다.
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  // 새 주소(/api/v2)로 보낸다 — 성공은 { data }, 실패는 { error: { code, message } } 봉투에 담겨 온다.
  const response = await fetch(`/api/v2${path}${query}`, options);

  if (!response.ok) {
    // 백엔드에 닿지 못하면 Next.js 서버가 JSON 이 아닌 글자로 답한다 — 읽지 못하면 null 로 둔다.
    const failed = await response.json().catch(() => null);
    const error = failed?.error;

    // Access 토큰의 기한만 지났으면 새 토큰을 받고, 원래 요청을 한 번만 다시 보낸다.
    if (error?.code === "TOKEN_EXPIRED" && !retried) {
      await reissue();
      return request(path, { method, params, body, retried: true });
    }

    // 서버가 보낸 문장이 있으면 그것을, 없으면 상태 코드로 만든 문장을 던진다. 에러 코드도 함께 싣는다.
    throw new ApiError(response.status, error?.message ?? `요청을 처리하지 못했어요 (${response.status})`, error?.code);
  }

  // 봉투에서 값만 꺼내 돌려준다 — 화면 쪽 코드는 봉투를 몰라도 된다.
  const { data } = await response.json();
  return data;
}

export const authApi = {
  login: (form) => request("/auth/login", { method: "POST", body: form }),
  signup: (form) => request("/auth/signup", { method: "POST", body: form }),
  checkDuplicate: (type, value) => request("/auth/check-duplicate", { params: { type, value } }),
  me: () => request("/auth/me"),
  logout: () => request("/auth/logout", { method: "POST" }),
  socialAccounts: () => request("/auth/social-accounts"),
  unlinkSocialAccount: (provider) => request(`/auth/social-accounts/${provider}`, { method: "DELETE" }),
};

export const profileApi = {
  get: (username) => request(`/profiles/${encodeURIComponent(username)}`),
  getPosts: (username, params) => request(`/profiles/${encodeURIComponent(username)}/posts`, { params }),
  // 이 사람을 팔로우한다 · 팔로우를 그만둔다 - 누가 하는지는 서버가 로그인 정보로 정한다.
  follow: (username) => request(`/profiles/${encodeURIComponent(username)}/followers/me`, { method: "PUT" }),
  unfollow: (username) => request(`/profiles/${encodeURIComponent(username)}/followers/me`, { method: "DELETE" }),
  // 팔로워 목록(list = "followers")이나 팔로잉 목록(list = "following")의 한 페이지.
  getFollowList: (username, list, params) => request(`/profiles/${encodeURIComponent(username)}/${list}`, { params }),
};

export const hashtagApi = {
  getPosts: (name, params) => request(`/hashtags/${encodeURIComponent(name)}/posts`, { params }),
};

export const postApi = {
  getPage: (params) => request("/posts", { params }),
  get: (id) => request(`/posts/${id}`),
  likePost: (id) => request(`/posts/${id}/likes/me`, { method: "PUT" }),
  unlikePost: (id) => request(`/posts/${id}/likes/me`, { method: "DELETE" }),
  create: (body) => request("/posts", { method: "POST", body }),
  update: (id, body) => request(`/posts/${id}`, { method: "PATCH", body }),
  remove: (id) => request(`/posts/${id}`, { method: "DELETE" }),
};

export const commentApi = {
  getPage: (postId, params) => request(`/posts/${postId}/comments`, { params }),
  getReplies: (postId, commentId, params) => request(`/posts/${postId}/comments/${commentId}/replies`, { params }),
  // parentId 를 주면 그 원댓글에 다는 답글이다. 원댓글을 달 때는 parentId 가 undefined 라 JSON 에 실리지 않는다.
  create: (postId, content, parentId) => request(`/posts/${postId}/comments`, { method: "POST", body: { content, parentId } }),
  remove: (postId, commentId) => request(`/posts/${postId}/comments/${commentId}`, { method: "DELETE" }),
};

export const conversationApi = {
  getPage: (params) => request("/conversations", { params }),
  get: (id) => request(`/conversations/${id}`),
  getMessages: (id, params) => request(`/conversations/${id}/messages`, { params }),
};

export const memberApi = {
  search: (keyword) => request("/members/search", { params: { keyword } }),
  // 올려 둔 사진의 주소를 내 프로필 사진으로 적는다.
  updateProfileImage: (imageUrl) => request("/members/me/profile-image", { method: "PUT", body: { imageUrl } }),
};

export const uploadApi = {
  // 사진 파일들을 올리고, 서버가 저장한 사진의 주소 목록을 받는다.
  // 필드 이름 images 는 서버와 정한 이름이라 화면 컴포넌트는 파일 배열만 넘기면 된다.
  images: (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return request("/uploads", { method: "POST", body: formData });
  },
};
