import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { CartContext } from "./CartContext";
import { UserContext } from "./UserContext";
import '../style.css';

function Header() {
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const navClass = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <header className="shadow">
      <nav className="container mx-auto flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <Link to="/" className="shrink-0">
          <img className="logo h-10" src="/images/logo.png" alt="Logo" />
        </Link>

        <ul id="mainNav" className="order-3 flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 sm:order-none sm:w-auto sm:shrink-0 sm:justify-start sm:gap-4">
          <li><NavLink to="/" className={navClass}>Home</NavLink></li>
          <li><NavLink to="/products" className={navClass}>Shop</NavLink></li>
          <li><NavLink to="/aboutUs" className={navClass}>About</NavLink></li>
          <li><NavLink to="#" className={navClass}>Contact</NavLink></li>
          <li><NavLink to="#" className={navClass}>Sale <span className="text-red-500">!</span></NavLink></li>
        </ul>

        <input
          type="text"
          className="search-placeholder order-1 ms-auto min-w-0 flex-1 rounded-md border px-3 py-1.5 text-sm sm:order-none"
          placeholder="Search"
        />

        <Link to="/cart" className="relative order-2 shrink-0 sm:order-none">
          <ShoppingCart className="size-5" />
          <span id="cart-badge" className="cart-badge">{cartCount}</span>
        </Link>
        {user ? (
            <button type="button" onClick={logout} className="order-2 shrink-0 text-sm underline sm:order-none">
            Logout
          </button>
        ) : (
          <Link to="/login" className="order-2 shrink-0 sm:order-none">
            <User className="size-5" />
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;