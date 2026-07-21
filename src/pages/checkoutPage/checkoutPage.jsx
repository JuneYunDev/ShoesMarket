import { useState } from "react";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import "./checkoutPage.css";

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const handleShippingChange = (event) => {
    const { name, value } = event.target;

    setShippingInfo((prevShippingInfo) => ({
      ...prevShippingInfo,
      [name]: value,
    }));
  };

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

            <section className="checkout-page__shipping-section">
              <h3>Shipping Address</h3>

              <form className="checkout-page__shipping-form">
                <div className="checkout-page__form-row">
                  <div className="checkout-page__field">
                    <label htmlFor="firstName">First Name</label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      placeholder="First Name"
                      autoComplete="given-name"
                    />
                  </div>

                  <div className="checkout-page__field">
                    <label htmlFor="lastName">Last Name</label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      placeholder="Last Name"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="checkout-page__field">
                  <label htmlFor="address">Address</label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    placeholder="Address"
                    autoComplete="street-address"
                  />
                </div>

                <div className="checkout-page__field">
                  <label htmlFor="city">City</label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    placeholder="City"
                    autoComplete="address-level2"
                  />
                </div>

                <div className="checkout-page__form-row">
                  <div className="checkout-page__field">
                    <label htmlFor="province">Province</label>

                    <select
                      id="province"
                      name="province"
                      value={shippingInfo.province}
                      onChange={handleShippingChange}
                      autoComplete="address-level1"
                    >
                      <option value="">Select Province</option>
                      <option value="AB">Alberta</option>
                      <option value="BC">British Columbia</option>
                      <option value="MB">Manitoba</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NL">Newfoundland and Labrador</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="ON">Ontario</option>
                      <option value="PE">Prince Edward Island</option>
                      <option value="QC">Quebec</option>
                      <option value="SK">Saskatchewan</option>
                    </select>
                  </div>

                  <div className="checkout-page__field">
                    <label htmlFor="postalCode">Postal Code</label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                      placeholder="Postal Code"
                      autoComplete="postal-code"
                      maxLength={7}
                    />
                  </div>
                </div>
              </form>
            </section>
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
