// ~/next-lab/app/p3-13/api/notifications/read/route.js
import { notifications } from '../../../_data/notifications.js';

export async function PATCH() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({ message: '서버에 문제가 생겼어요' }, { status: 500 });

  const unread = notifications.filter((item) => !item.isRead);

  for (const item of unread) {
    item.isRead = true;
  }

  return Response.json({ count: unread.length });
}
