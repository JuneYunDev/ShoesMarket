import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/layout/header";
import "./account.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage(
      "If an account exists for this e-mail, password reset instructions will be sent.",
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
                <h2>Forgot Password?</h2>

                <p>
                  Enter your e-mail address and we will send you password reset
                  instructions.
                </p>
              </div>

              <div className="account-form__field">
                <label className="sr-only" htmlFor="forgot-password-email">
                  E-mail
                </label>

                <input
                  id="forgot-password-email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              {message && (
                <p className="account-form__success" role="status">
                  {message}
                </p>
              )}

              <button className="account-form__submit" type="submit">
                Send Reset Link
              </button>

              <p className="account-form__switch">
                Remember your password?{" "}
                <Link to="/signin">Return to Sign In</Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgotPasswordPage;
