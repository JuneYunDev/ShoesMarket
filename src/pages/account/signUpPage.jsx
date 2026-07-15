import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../../components/layout/header";
import "./account.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  postalCode: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility((currentVisibility) => ({
      ...currentVisibility,
      [fieldName]: !currentVisibility[fieldName],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      setErrorMessage("E-mail addresses do not match.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");

    console.log("Sign-up data:", formData);
  };

  return (
    <>
      <Header />

      <main className="account-page">
        <h1 className="account-page__title">Account</h1>

        <section className="account-page__background">
          <div className="account-card account-card--signup">
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="account-form__heading">
                <h2>Create Account</h2>

                <p>Earn rewards, exclusive benefits, and more!</p>
              </div>

              <div className="account-form__name-row">
                <div className="account-form__field">
                  <label className="sr-only" htmlFor="first-name">
                    First Name
                  </label>

                  <input
                    id="first-name"
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
                  <label className="sr-only" htmlFor="last-name">
                    Last Name
                  </label>

                  <input
                    id="last-name"
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
                <label className="sr-only" htmlFor="postal-code">
                  Postal Code
                </label>

                <input
                  id="postal-code"
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  required
                />
              </div>

              <div className="account-form__field">
                <label className="sr-only" htmlFor="signup-email">
                  E-mail
                </label>

                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="account-form__field">
                <label className="sr-only" htmlFor="confirm-email">
                  Confirm E-mail
                </label>

                <input
                  id="confirm-email"
                  type="email"
                  name="confirmEmail"
                  placeholder="E-mail to confirm"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="account-form__field account-form__field--password">
                <label className="sr-only" htmlFor="signup-password">
                  Password
                </label>

                <input
                  id="signup-password"
                  type={passwordVisibility.password ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  aria-label={
                    passwordVisibility.password
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {passwordVisibility.password ? (
                    <EyeOff size={28} />
                  ) : (
                    <Eye size={28} />
                  )}
                </button>
              </div>

              <div className="account-form__field account-form__field--password">
                <label className="sr-only" htmlFor="confirm-password">
                  Confirm Password
                </label>

                <input
                  id="confirm-password"
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  placeholder="Password to confirm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  aria-label={
                    passwordVisibility.confirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {passwordVisibility.confirmPassword ? (
                    <EyeOff size={28} />
                  ) : (
                    <Eye size={28} />
                  )}
                </button>
              </div>

              {errorMessage && (
                <p className="account-form__error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button className="account-form__submit" type="submit">
                Sign Up
              </button>

              <p className="account-form__switch">
                Already have an account? <Link to="/signin">Sign In</Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default SignUpPage;
