import { Link, useLocation } from "react-router-dom";
import "./orderCompletePage.css";

const OrderCompletePage = () => {
  const location = useLocation();

  const order = location.state?.order;

  return (
    <main className="order-complete-page">
      <section className="order-complete-page__card">
        <div className="order-complete-page__icon">✓</div>

        <h1>Order Complete</h1>

        <p>Your order has been successfully placed.</p>

        {order && (
          <div className="order-complete-page__details">
            <div>
              <span>Order Number</span>
              <strong>{order.orderNumber}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>${order.total.toFixed(2)}</strong>
            </div>

            <div>
              <span>Items</span>
              <strong>{order.totalQuantity}</strong>
            </div>
          </div>
        )}

        <Link to="/products" className="order-complete-page__button">
          Continue Shopping
        </Link>
      </section>
    </main>
  );
};

export default OrderCompletePage;
