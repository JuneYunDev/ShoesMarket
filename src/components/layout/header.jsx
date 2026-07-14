import { Search, ShoppingCart, UserRound } from "lucide-react";

const navigationItems = ["Women", "Men", "Kids", "Brand", "Trend", "Deals"];

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-main page-width">
        <a className="logo" href="/">
          Shoes Market
        </a>

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
          <a href="#signin">
            <UserRound size={21} />
            <span>Sign in</span>
          </a>

          <a href="#cart">
            <ShoppingCart size={22} />
            <span>Cart</span>
          </a>
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-inner">
          {navigationItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
