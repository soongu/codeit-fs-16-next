// ~/next-lab/app/p3-12/api/notifications/route.js
import { notifications } from '../../_data/notifications.js';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json(notifications);
}
