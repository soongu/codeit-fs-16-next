// ~/next-lab/app/p3-04/practice2/route.js
const menu = [
  { name: 'americano', price: 4000 },
  { name: 'latte', price: 4500 },
  { name: 'grapefruit', price: 5000 },
];

export function GET(request) {
  const maxPrice = Number(request.nextUrl.searchParams.get('maxPrice'));

  if (!maxPrice) {
    return Response.json(menu);
  }

  const cheap = menu.filter((drink) => drink.price <= maxPrice);

  return Response.json(cheap);
}
