import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart, UserRound } from "lucide-react";

import { useAccount } from "../../context/accountContext";
import "./adminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();

  const { currentAccount, logout } = useAccount();

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  return (
    <header className="admin-header">
      <div className="admin-header__top">
        <button
          className="admin-header__brand"
          type="button"
          onClick={() => navigate("/admin/products")}
        >
          Shoes Market Admin Dashboard
        </button>

        <div className="admin-header__actions">
          <div className="admin-header__account">
            <UserRound size={22} />

            <span>{currentAccount?.name ?? "Store Admin"}</span>
          </div>

          <button
            className="admin-header__sign-out"
            type="button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>

          <button
            className="admin-header__cart"
            type="button"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={22} />
            <span>Cart</span>
          </button>
        </div>
      </div>

      <nav className="admin-navigation" aria-label="Admin navigation">
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "admin-navigation__link admin-navigation__link--active"
              : "admin-navigation__link"
          }
        >
          Product Management
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive
              ? "admin-navigation__link admin-navigation__link--active"
              : "admin-navigation__link"
          }
        >
          Customer Management
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "admin-navigation__link admin-navigation__link--active"
              : "admin-navigation__link"
          }
        >
          Order Management
        </NavLink>
      </nav>
    </header>
  );
};

export default AdminHeader;
