import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/layout/header";
import "./account.css";

const ForgotEmailPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    postalCode: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage(
      "If the information matches an account, recovery instructions will be provided.",
    );
  };

  return (
    <>
      <Header />

      <main className="account-page">
        <h1 className="account-page__title">Account</h1>

        <section className="account-page__background">
          <div className="account-card account-card--recovery">
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="account-form__heading">
                <h2>Forgot E-mail?</h2>

                <p>Enter the information associated with your account.</p>
              </div>

              <div className="account-form__name-row">
                <div className="account-form__field">
                  <label className="sr-only" htmlFor="recovery-first-name">
                    First Name
                  </label>

                  <input
                    id="recovery-first-name"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className="account-form__field">
                  <label className="sr-only" htmlFor="recovery-last-name">
                    Last Name
                  </label>

                  <input
                    id="recovery-last-name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              <div className="account-form__field">
                <label className="sr-only" htmlFor="recovery-postal-code">
                  Postal Code
                </label>

                <input
                  id="recovery-postal-code"
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  required
                />
              </div>

              {message && (
                <p className="account-form__success" role="status">
                  {message}
                </p>
              )}

              <button className="account-form__submit" type="submit">
                Find My E-mail
              </button>

              <p className="account-form__switch">
                Remember your e-mail?{" "}
                <Link to="/signin">Return to Sign In</Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgotEmailPage;
