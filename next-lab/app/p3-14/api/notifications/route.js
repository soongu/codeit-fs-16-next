// ~/next-lab/app/p3-12/api/notifications/route.js
import { notifications } from '../../_data/notifications.js';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({ message: '서버에 문제가 생겼어요' }, { status: 500 });

  return Response.json(notifications);
}

export async function POST(request) {
  const { text } = await request.json();
  const notification = { id: notifications.length + 1, text, isRead: false };

  notifications.push(notification);

  return Response.json(notification, { status: 201 });
}
