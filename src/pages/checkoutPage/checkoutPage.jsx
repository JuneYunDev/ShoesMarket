import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import "./checkoutPage.css";

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <Header />

      <main className="checkout-page__main">
        <section className="checkout-page__heading">
          <h1>Check Out</h1>
        </section>

        <section className="checkout-page__content">
          <div className="checkout-page__form-card">
            <div className="checkout-page__section-header">
              <h2>Shipping Information</h2>
              <p>2 items</p>
            </div>

            <div className="checkout-page__placeholder">
              <h3>Shipping Address</h3>
              <p>Shipping and payment forms will be added here.</p>
            </div>
          </div>

          <aside className="checkout-page__summary-card">
            <h2>Order Summary</h2>

            <div className="checkout-page__summary-placeholder">
              <p>Your selected products will appear here.</p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
