// ~/next-lab/app/p3-17/practice1/_data/products.js
export const products = [
  { id: 1, name: '캔버스 토트백', wishCount: 12 },
  { id: 2, name: '도자기 머그컵', wishCount: 5 },
  { id: 3, name: '필름 카메라 스트랩', wishCount: 30 },
];

// 「누가 어느 상품을 찜했는가」 한 쌍이 한 줄이다.
export const wishes = [
  { productId: 1, userId: 2 },
  { productId: 3, userId: 1 },
];
