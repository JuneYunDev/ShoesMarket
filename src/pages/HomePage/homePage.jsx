import Header from "../../components/layout/header.jsx";
import Footer from "../../components/layout/footer.jsx";

import "./homePage.css";

const trends = [
  {
    id: 1,
    title: "Silver Running Shoes",
    image: "/images/trend-running.jpg",
  },
  {
    id: 2,
    title: "Red Platform Sandals",
    image: "/images/trend-sandals.jpg",
  },
  {
    id: 3,
    title: "Black Skate Shoes",
    image: "/images/trend-skate.jpg",
  },
];

const deals = [
  {
    id: 1,
    category: "Running Shoes",
    price: "$29.99",
  },
  {
    id: 2,
    category: "Women's Athletics",
    price: "$39.99",
  },
  {
    id: 3,
    category: "Kid's Sandals",
    price: "$19.99",
  },
  {
    id: 4,
    category: "Casual Shoes",
    price: "$34.99",
  },
];

const Hero = () => {
  return (
    <section className="hero">
      <div className="page-width hero-inner">
        <div className="hero-copy">
          <p>ONLINE</p>
          <h1>SHOES</h1>
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
};

const TrendSection = () => {
  return (
    <section className="trend-section" id="trend">
      <div className="page-width">
        <h2>2026 Summer Season Trend</h2>

        <div className="trend-grid">
          {trends.map((trend) => (
            <article className="trend-card" key={trend.id}>
              <img src={trend.image} alt={trend.title} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const DealsSection = () => {
  return (
    <section className="deals-section" id="deals">
      <h2>
        Special <span>Deals</span>
      </h2>

      <div className="deals-scroller">
        {deals.map((deal) => (
          <article className="deal-card" key={deal.id}>
            <p>{deal.category}</p>
            <strong>From {deal.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div id="top">
      <Header />

      <main>
        <Hero />
        <TrendSection />
        <DealsSection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
