import { Search, ShoppingCart, UserRound } from "lucide-react";

import { Link } from "react-router-dom";
import "./header.css";

const navigationItems = [
  {
    title: "Women",
    path: "/products?category=women",
  },
  {
    title: "Men",
    path: "/products?category=men",
  },
  {
    title: "Kids",
    path: "/products?category=kids",
  },
  {
    title: "Brand",
    path: "/products?category=brand",
  },
  {
    title: "Trend",
    path: "/#trend",
  },
  {
    title: "Deals",
    path: "/#deals",
  },
];

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-main page-width">
        <Link className="logo" to="/">
          Shoes Market
        </Link>

        <form className="search-form" role="search">
          <label className="sr-only" htmlFor="header-search">
            Search products
          </label>

          <input
            id="header-search"
            type="search"
            placeholder="Search brands, name, styles and more"
          />

          <button type="submit" aria-label="Search">
            <Search size={21} />
          </button>
        </form>

        <div className="header-actions">
          <Link to="signin">
            <UserRound size={21} />
            <span>Sign in</span>
          </Link>

          <Link href="#cart">
            <ShoppingCart size={22} />
            <span>Cart</span>
          </Link>
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-inner">
          {navigationItems.map((item) => (
            <Link key={item.title} to={item.path}>
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
