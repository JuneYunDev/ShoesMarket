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

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
  });

  const handleShippingChange = (event) => {
    const { name, value } = event.target;

    const nextValue = name === "postalCode" ? value.toUpperCase() : value;

    setShippingInfo((prevShippingInfo) => ({
      ...prevShippingInfo,
      [name]: nextValue,
    }));
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;

    let nextValue = value;

    if (name === "cardNumber") {
      nextValue = value.replace(/\D/g, "").slice(0, 16);
    }

    if (name === "securityCode") {
      nextValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setPaymentInfo((prevPaymentInfo) => ({
      ...prevPaymentInfo,
      [name]: nextValue,
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
                  <div className="checkout-page__field checkout-page__select-field">
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
            <section className="checkout-page__payment-section">
              <h3>Payment</h3>

              <div className="checkout-page__payment-options">
                <label className="checkout-page__payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <span>Pay with Card</span>
                </label>

                {paymentMethod === "card" && (
                  <div className="checkout-page__card-form">
                    <div className="checkout-page__field">
                      <label htmlFor="cardNumber">Card Number</label>

                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        inputMode="numeric"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="Card Number"
                        autoComplete="cc-number"
                      />
                    </div>

                    <div className="checkout-page__payment-row">
                      <div className="checkout-page__field checkout-page__select-field">
                        <label htmlFor="expiryMonth">Month</label>

                        <select
                          id="expiryMonth"
                          name="expiryMonth"
                          value={paymentInfo.expiryMonth}
                          onChange={handlePaymentChange}
                          autoComplete="cc-exp-month"
                        >
                          <option value="">Month</option>
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                      </div>

                      <div className="checkout-page__field checkout-page__select-field">
                        <label htmlFor="expiryYear">Year</label>

                        <select
                          id="expiryYear"
                          name="expiryYear"
                          value={paymentInfo.expiryYear}
                          onChange={handlePaymentChange}
                          autoComplete="cc-exp-year"
                        >
                          <option value="">Year</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                          <option value="2031">2031</option>
                          <option value="2032">2032</option>
                        </select>
                      </div>

                      <div className="checkout-page__field">
                        <label htmlFor="securityCode">Security Code</label>

                        <input
                          id="securityCode"
                          name="securityCode"
                          type="password"
                          inputMode="numeric"
                          value={paymentInfo.securityCode}
                          onChange={handlePaymentChange}
                          placeholder="Security Code"
                          autoComplete="cc-csc"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <label className="checkout-page__payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <span>PayPal</span>
                </label>

                <label className="checkout-page__payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="googlePay"
                    checked={paymentMethod === "googlePay"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <span>Google Pay</span>
                </label>
              </div>
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
