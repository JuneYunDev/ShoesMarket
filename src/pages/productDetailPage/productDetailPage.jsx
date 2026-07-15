import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { shoesData } from "../../data/shoesData";

import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const product = shoesData.find((shoe) => shoe.id === Number(productId));

  const [selectedSize, setSelectedSize] = useState(null);
  const [deliveryType, setDeliveryType] = useState("standard");
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <>
        <Header />

        <main className="product-not-found">
          <h1>Product not found</h1>

          <Link to="/products?category=women">Return to products</Link>
        </main>

        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize === null) {
      window.alert("Please select a size.");
      return;
    }

    const cartItem = {
      ...product,
      selectedSize,
      deliveryType,
      quantity: 1,
    };

    console.log("Add to cart:", cartItem);
  };

  return (
    <>
      <Header />

      <main className="product-detail-page">
        <section className="product-detail">
          <div className="product-detail__image-container">
            <img
              className="product-detail__image"
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="product-detail__information">
            <h1>{product.name}</h1>

            <div className="product-detail__price-container">
              {product.discount > 0 && product.originalPrice ? (
                <>
                  <div className="product-detail__sale-price-row">
                    <span className="product-detail__price product-detail__price--sale">
                      ${product.price.toFixed(2)}
                    </span>

                    <span className="product-detail__discount">
                      ({product.discount}% off)
                    </span>
                  </div>

                  <span className="product-detail__original-price">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="product-detail__price">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div
              className="product-detail__rating"
              aria-label={`${product.rating} out of 5 stars`}
            >
              <div className="product-detail__stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={23}
                    fill={index < product.rating ? "currentColor" : "none"}
                    className={
                      index < product.rating
                        ? "product-detail__star product-detail__star--active"
                        : "product-detail__star"
                    }
                  />
                ))}
              </div>

              <strong>
                {product.rating.toFixed(1)} ({product.reviewCount})
              </strong>
            </div>

            <section className="product-options">
              <h2>Size</h2>

              <div className="size-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={
                      selectedSize === size
                        ? "size-button size-button--selected"
                        : "size-button"
                    }
                    aria-pressed={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </section>

            <section className="product-options">
              <h2>Width</h2>

              <div className="product-width">{product.width}</div>
            </section>

            <fieldset className="delivery-options">
              <legend className="sr-only">Select delivery type</legend>

              <label className="delivery-option">
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={deliveryType === "standard"}
                  onChange={(event) => setDeliveryType(event.target.value)}
                />

                <span>
                  <strong>Standard Delivery</strong>
                  <small>Arrives in 4 to 7 Business Days</small>
                </span>
              </label>

              <label className="delivery-option">
                <input
                  type="radio"
                  name="delivery"
                  value="quick"
                  checked={deliveryType === "quick"}
                  onChange={(event) => setDeliveryType(event.target.value)}
                />

                <span>
                  <strong>Quick Delivery</strong>
                  <small>Arrives in 1 to 3 Business Days</small>
                </span>
              </label>
            </fieldset>

            <div className="product-detail__actions">
              <button
                className="add-to-cart-button"
                type="button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className={
                  isFavorite
                    ? "favorite-button favorite-button--active"
                    : "favorite-button"
                }
                type="button"
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                aria-pressed={isFavorite}
                onClick={() => setIsFavorite((current) => !current)}
              >
                <Heart size={40} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailPage;
