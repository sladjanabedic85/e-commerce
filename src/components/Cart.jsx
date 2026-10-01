import CartItem from './CartItem';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext.jsx';
import { Button } from './ui/button';

function Cart({ showSummary = true }) {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState("");

  const cartItems = cart.map(product => (
    <CartItem
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      quantity={product.quantity}
      size={product.size}
      image={product.image}
      onIncrease={increaseQuantity}
      onDecrease={decreaseQuantity}
      onRemove={removeFromCart} />
  ));

  const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  if (cart.length === 0) {
    return (
      <div>
        <h1 className="mb-8 text-center text-3xl font-bold">Your Cart</h1>
        <p className='cart-empty'>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-center text-3xl font-bold">Your Cart</h1>

      <div className={showSummary ? "grid w-fit mx-auto gap-8 lg:grid-cols-[36rem_320px]" : ""}>
        <div className="flex flex-col gap-4">
          <div className="flex max-w-xl flex-col gap-4">
            {cartItems}
          </div>
          {!showSummary && (
            <div className="flex justify-between border-t pt-3 text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </div>

        {showSummary && (
        <div className="flex flex-col gap-4">
          <h2 className="border-b pb-3 text-xl font-bold">Order Summary</h2>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pb-3 text-sm">
            <span>Discount</span>
            <span>{discount}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
              className="min-w-0 flex-1 rounded-md border px-3 py-1.5 text-sm"
            />
            <Button type="button" variant="secondary">Apply</Button>
          </div>

          <Button asChild className="mt-2">
            <Link to="/checkout">Go To Checkout</Link>
          </Button>

          <div className="mt-4 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>Prices and costs are not displayed until you complete your purchase.</p>
            <p>You have 30 days to change your mind. Read more about <a href="#" className="underline">Delivery and Return</a>.</p>
            <p>Need help? Please contact <a href="#" className="underline">Customer Support</a>.</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Cart;