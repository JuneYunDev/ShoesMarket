import {
  ArrowUp,
  Headphones,
  MapPin,
  Search,
  ShoppingCart,
  UserRound,
  Newspaper,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import "./App.css";

const navigationItems = ["Women", "Men", "Kids", "Brand", "Trend", "Deals"];

const trends = [
  {
    title: "Silver Running Shoes",
    image: "/images/trend-running.jpg",
  },
  {
    title: "Red Plaform Sandals",
    image: "/images/trend-sandals.jpg",
  },
  {
    title: "Black Skate Shoes",
    image: "/images/trend-skate.jpg",
  },
];

const deals = [
  { category: "Running Shoes", price: "$29.99" },
  { category: "Women's Athletics", price: "$39.99" },
  { category: "Kid's Sandals", price: "19.99" },
  { category: "Casual Shoes", price: "$34.99" },
];

const Header = () => (
  <header className="site-header">
    <div className="header-main page-width">
      <a className="logo" href="#top" aria-label="Shoes Market home">
        Shoes Market
      </a>

      <form className="search-form" role="search">
        <label className="sr-only" htmlFor="site-search">
          Search Shoes
        </label>
        <input
          id="site-search"
          type="search"
          placeholder="Search brands, name, styles and more"
        />
        <button type="submit" aria-label="Search">
          <Search size={22} strokeWidth={2.2} />
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

    <nav className="main-nav" aria-label="Main navigation">
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

const Hero = () => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="page-width hero-inner">
      <div className="hero-copy">
        <p>ONLINE</p>
        <h1 id="hero-title">SHOES</h1>
        <p>MARKET</p>
      </div>

      <div className="hero-image-wrap">
        <img
          src="/images/hero-shoe.jpg"
          alt="Black formal shoe with a brown sole"
        />
      </div>
    </div>
  </section>
);

const TrendSeciton = () => (
  <section className="trend-section" id="trend">
    <div className="page-width">
      <h2>2026 Summer Season Trend</h2>

      <div className="trend-grid">
        {trends.map((trend) => (
          <article className="trend-card" key={trend.title}>
            <img src={trend.image} alt={trend.title} />
          </article>
        ))}
      </div>
    </div>
  </section>
);

const DealsSection = () => (
  <section className="deals-section" id="deals">
    <h2>
      Special <span>Deals</span>
    </h2>

    <div className="deals-scroller" aria-label="Special deals">
      {deals.map((deal) => (
        <article className="deal-card" key={deal.category}>
          <p>{deal.category}</p>
          <strong>From {deal.price}</strong>
        </article>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="site-footer">
    <a className="back-to-top" href="#top">
      <ArrowUp size={24} />
      <span>Bact To Top</span>
    </a>

    <div className="page-with footer-grid">
      <section className="footer-column">
        <h2>
          <MapPin aria-hidden="true" />
          Location
        </h2>
        <p>
          Shoes Market Co.
          <br />
          2026 Alberta St SW
          <br />
          Calgary
          <br />
          AB
          <br />
          (1A2 B3C)
        </p>
      </section>

      <section className="footer-column">
        <h2>
          <Headphones aria-hidden="true" />
          Customer Service
        </h2>
        <p>
          +1 123 456 7890
          <br />
          shoesService@gmail.com
          <br />
          <a href="#faqs">FAQs</a>
        </p>
      </section>

      <section className="footer-column">
        <h2>
          <Newspaper aria-hidden="true" />
          Follow Up
        </h2>

        <div className="social-links" aria-label="social media">
          <a href="#instagram" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#X" className="x-link" aria-label="X">
            <FaXTwitter />
          </a>
          <a href="#facebook" className="text-social" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#youtube" aria-label="Youtube">
            <FaYoutube />
          </a>
          <a href="#tiktok" className="text-social" aria-label="TikTok">
            <FaTiktok />
          </a>
        </div>

        <p>
          Stay in the know with
          <br />
          our latest offers.
        </p>
      </section>
    </div>
  </footer>
);

const App = () => (
  <div id="top">
    <Header />
    <main>
      <Hero />
      <TrendSeciton />
      <DealsSection />
    </main>
    <Footer />
  </div>
);

export default App;
