// ~/next-lab/app/p3-17/practice1/api/route.js
import { products, wishes } from '../_data/products.js';

export async function GET(request) {
  const userId = Number(request.nextUrl.searchParams.get('userId'));
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 보는 사람이 찜한 상품이면 wished 가 true 다. userId 가 없으면 0 이라 아무것도 안 맞는다.
  const items = products.map((product) => ({
    ...product,
    wished: wishes.some(
      (wish) => wish.productId === product.id && wish.userId === userId,
    ),
  }));

  return Response.json(items);
}
