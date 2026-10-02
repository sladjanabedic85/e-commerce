import Cart from './Cart.jsx';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Products from './Products.jsx';
import LoginForm from './Login.jsx';
import RegisterForm from './Register.jsx';
import ProductDetails from './ProductDetails.jsx';
import Checkout from './Checkout.jsx';
import AboutUs from './AboutUs.jsx';
import { CartProvider } from './CartProvider.jsx';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
       <Route index element={<Home />} />
       <Route path="/products" element={<Products />} />
       <Route path="/products/:id" element={<ProductDetails />} />
       <Route path="/login" element={<LoginForm />} />
       <Route path="/register" element={<RegisterForm />} />
       <Route path="/cart" element={<Cart />} />
       <Route path="/checkout" element={<Checkout />} />
       <Route path="/aboutUs" element={<AboutUs />} />
       <Route path="*" element={
         <div className="py-16 text-center">
           <h1 className="mb-3 text-2xl font-semibold">Page not found</h1>
           <Link className="underline" to="/">Return to the home page</Link>
         </div>
       } />
      </Route>
      </Routes>
    </CartProvider>
  );
}
 
export default App;