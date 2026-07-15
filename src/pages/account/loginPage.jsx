import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../../components/layout/header";
import "./account.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Login data:", formData);
  };

  return (
    <>
      <Header />

      <main className="account-page">
        <h1 className="account-page__title">Account</h1>

        <section className="account-page__background">
          <div className="account-card account-card--login">
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="account-form__heading">
                <h2>Sign In</h2>

                <p>Sign in to access your account and rewards.</p>
              </div>

              <div className="account-form__field">
                <label className="sr-only" htmlFor="login-email">
                  E-mail
                </label>

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="account-form__field account-form__field--password">
                <label className="sr-only" htmlFor="login-password">
                  Password
                </label>

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff size={28} /> : <Eye size={28} />}
                </button>
              </div>

              <div className="account-form__links">
                <Link to="/forgot-password">Forgot Password?</Link>

                <Link to="/forgot-email">Forgot E-mail?</Link>
              </div>

              <button className="account-form__submit" type="submit">
                Sign In
              </button>

              <p className="account-form__switch">
                Don&apos;t have an account?{" "}
                <Link to="/signup">Create Account</Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
