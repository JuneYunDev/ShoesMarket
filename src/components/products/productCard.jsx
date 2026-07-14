import { Heart, Star } from "lucide-react";
import "./productCard.css";

const ProductCard = ({ shoe, isFavorite, onToggleFavorite, onAddToCart }) => {
  const { id, name, image, price, discount, rating, reviewCount } = shoe;

  const stars = Array.from({ length: 5 }, (_, index) => {
    const isActive = index < rating;

    return (
      <Star
        key={index}
        size={13}
        strokeWidth={2}
        fill={isActive ? "currentColor" : "none"}
        className={
          isActive
            ? "product-card__star product-card__star--active"
            : "product-card__star"
        }
      />
    );
  });

  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <button
          type="button"
          className={
            isFavorite
              ? "product-card__favorite product-card__favorite--active"
              : "product-card__favorite"
          }
          aria-label={
            isFavorite
              ? `Remove ${name} from favorites`
              : `Add ${name} to favorites`
          }
          onClick={() => onToggleFavorite(id)}
        >
          <Heart size={21} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <img className="product-card__image" src={image} alt={name} />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>

        <div className="product-card__price-row">
          <span
            className={
              discount > 0
                ? "product-card__price product-card__price--sale"
                : "product-card__price"
            }
          >
            ${price.toFixed(2)}
          </span>

          {discount > 0 && (
            <span className="product-card__discount">({discount}% off)</span>
          )}
        </div>

        <div
          className="product-card__rating"
          aria-label={`${rating} out of 5 stars`}
        >
          <div className="product-card__stars">{stars}</div>

          <span className="product-card__reviews">({reviewCount})</span>
        </div>

        <button
          type="button"
          className="product-card__cart-button"
          onClick={() => onAddToCart(shoe)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
