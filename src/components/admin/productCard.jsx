import { Star, Trash2 } from "lucide-react";
import "./productCard.css";

const ProductCard = ({ shoe, onEdit, onDelete }) => {
  const { id, name, image, price, discount, rating, reviewCount } = shoe;

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={
          index < rating
            ? "product-card__star product-card__star--active"
            : "product-card__star"
        }
        size={14}
        fill={index < rating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <button
          className="product-card__delete-button"
          type="button"
          aria-label={`Delete ${name}`}
          onClick={() => onDelete(id)}
        >
          <Trash2 size={20} />
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
          <div className="product-card__stars">{renderStars()}</div>

          <span className="product-card__review-count">({reviewCount})</span>
        </div>

        <button
          className="product-card__edit-button"
          type="button"
          onClick={() => onEdit(shoe)}
        >
          Edit Item
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
