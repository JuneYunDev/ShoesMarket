import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartContext";

import "./productCard.css";

const ProductCard = ({ shoe }) => {
  const { addToCart } = useCart();

  const [isSelectingSize, setIsSelectingSize] = useState(false);

  const [selectedSize, setSelectedSize] = useState(null);

  const handleOpenSizeSelection = () => {
    setIsSelectingSize(true);
  };

  const handleCancel = () => {
    setIsSelectingSize(false);
    setSelectedSize(null);
  };

  const handleConfirmAddToCart = () => {
    if (selectedSize === null) {
      window.alert("Please select a size.");
      return;
    }

    addToCart({
      product: shoe,
      selectedSize,
      selectedWidth: "Medium",
      quantity: 1,
    });

    setIsSelectingSize(false);
    setSelectedSize(null);

    window.alert(`${shoe.name} was added to your cart.`);
  };

  return (
    <article className="product-card">
      <Link className="product-card__detail-link" to={`/products/${shoe.id}`}>
        <div className="product-card__image-container">
          <img
            className="product-card__image"
            src={shoe.image}
            alt={shoe.name}
          />
        </div>

        <h2 className="product-card__name">{shoe.name}</h2>
      </Link>

      <p className="product-card__price">${shoe.price.toFixed(2)}</p>

      {!isSelectingSize ? (
        <button
          className="product-card__add-button"
          type="button"
          onClick={handleOpenSizeSelection}
        >
          Add to Cart
        </button>
      ) : (
        <div className="product-card__size-selection">
          <p>Select a Size</p>

          <div className="product-card__sizes">
            {shoe.sizes.map((size) => (
              <button
                className={
                  selectedSize === size
                    ? "product-card__size-button product-card__size-button--selected"
                    : "product-card__size-button"
                }
                type="button"
                key={size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="product-card__actions">
            <button
              className="product-card__confirm-button"
              type="button"
              onClick={handleConfirmAddToCart}
              disabled={selectedSize === null}
            >
              Confirm
            </button>

            <button
              className="product-card__cancel-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProductCard;
