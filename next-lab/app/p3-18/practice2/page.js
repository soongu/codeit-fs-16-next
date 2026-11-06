// ~/next-lab/app/p3-18/practice2/page.js
import CartButton from './CartButton.jsx';
import CartPanel from './CartPanel.jsx';
import ProductList from './ProductList.jsx';

export default function CartPage() {
  return (
    <main className='p-6'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl font-semibold'>상품</h2>
        <CartButton />
      </div>
      <ProductList />
      <CartPanel />
    </main>
  );
}
