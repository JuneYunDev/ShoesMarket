import { useState } from "react";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/layout/Header";
import { useCart } from "../../context/cartContext";

import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();

  const { cartItems, removeFromCart, totalQuantity, subtotal } = useCart();

  const [deliveryType, setDeliveryType] = useState("standard");

  const hasItems = cartItems.length > 0;

  const deliveryFee = hasItems ? (deliveryType === "quick" ? 15.99 : 7.99) : 0;

  const orderTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!hasItems) {
      window.alert("Your cart is empty.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <>
      <Header />

      <main className="cart-page">
        <h1 className="cart-page__title">My Cart</h1>

        <section className="cart-page__background">
          <div className="cart-layout">
            <section className="cart-items-panel">
              {hasItems ? (
                <div className="cart-items-list">
                  {cartItems.map((cartItem) => {
                    const { product } = cartItem;

                    const hasDiscount =
                      product.discount > 0 && product.originalPrice;

                    return (
                      <article className="cart-item" key={cartItem.cartItemId}>
                        <div className="cart-item__image-container">
                          <img
                            className="cart-item__image"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>

                        <div className="cart-item__information">
                          <h2>{product.name}</h2>

                          <div className="cart-item__price-row">
                            <span
                              className={
                                hasDiscount
                                  ? "cart-item__price cart-item__price--sale"
                                  : "cart-item__price"
                              }
                            >
                              ${product.price.toFixed(2)}
                            </span>

                            {hasDiscount && (
                              <span className="cart-item__discount">
                                ({product.discount}% off)
                              </span>
                            )}
                          </div>

                          <p>
                            Size: {cartItem.selectedSize}{" "}
                            {cartItem.selectedWidth}
                          </p>

                          <p>Quantity: {cartItem.quantity}</p>

                          <button
                            className="cart-item__remove-button"
                            type="button"
                            onClick={() => removeFromCart(cartItem.cartItemId)}
                          >
                            Remove from Cart
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="cart-empty">
                  <h2>Your cart is empty.</h2>

                  <button
                    type="button"
                    onClick={() => navigate("/products?category=women")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </section>

            <aside className="order-summary">
              <h2>Order Summary</h2>

              <div className="order-summary__row">
                <span>
                  Subtotal ({totalQuantity}{" "}
                  {totalQuantity === 1 ? "Item" : "Items"})
                </span>

                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="order-summary__row">
                <span>Taxes &amp; Delivery Fees</span>

                <strong>${deliveryFee.toFixed(2)}</strong>
              </div>

              <div className="order-summary__divider" />

              <div className="order-summary__row order-summary__row--total">
                <span>Order Total</span>

                <strong>${orderTotal.toFixed(2)}</strong>
              </div>

              <section className="cart-delivery">
                <h2>
                  <Truck aria-hidden="true" />
                  Delivery Options
                </h2>

                <label className="cart-delivery__option">
                  <input
                    type="radio"
                    name="cart-delivery"
                    value="standard"
                    checked={deliveryType === "standard"}
                    onChange={(event) => setDeliveryType(event.target.value)}
                    disabled={!hasItems}
                  />

                  <span>
                    <strong>Standard Delivery</strong>

                    <small>Arrives in 4 to 7 Business Days</small>
                  </span>
                </label>

                <label className="cart-delivery__option">
                  <input
                    type="radio"
                    name="cart-delivery"
                    value="quick"
                    checked={deliveryType === "quick"}
                    onChange={(event) => setDeliveryType(event.target.value)}
                    disabled={!hasItems}
                  />

                  <span>
                    <strong>Quick Delivery</strong>

                    <small>Arrives in 1 to 3 Business Days</small>
                  </span>
                </label>
              </section>

              <button
                className="checkout-button"
                type="button"
                disabled={!hasItems}
                onClick={handleCheckout}
              >
                Go to Check Out
              </button>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
};

export default CartPage;
