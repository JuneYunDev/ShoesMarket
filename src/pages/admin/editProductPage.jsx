import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useProducts } from "../../context/productContext";

import "./addProductPage.css";

const sectionOptions = [
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Kids", value: "kids" },
];

const brandOptions = [
  "Nike",
  "Adidas",
  "PUMA",
  "New Balance",
  "Converse",
  "Vans",
  "Reebok",
  "Skechers",
  "Other",
];

const widthOptions = ["Medium", "Wide", "Extra Wide"];

const collectionOptions = ["Regular", "Featured", "Newest", "Trend", "Deals"];

const sizeOptions = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  10.5, 11, 11.5, 12,
];

const EditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const fileInputRef = useRef(null);

  const { products, updateProduct } = useProducts();

  const product = useMemo(
    () =>
      products.find(
        (currentProduct) => String(currentProduct.id) === String(productId),
      ),
    [products, productId],
  );

  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!product) {
      return;
    }

    setFormData({
      name: product.name ?? "",
      brand: product.brand ?? "",
      section: product.section ?? product.category ?? "",
      collection:
        product.collection ??
        (product.isDeal
          ? "Deals"
          : product.isTrend
            ? "Trend"
            : product.isFeatured
              ? "Featured"
              : "Regular"),
      price: product.price ?? "",
      originalPrice: product.originalPrice ?? "",
      stock: product.stock ?? 0,
      width: product.width ?? product.widths?.[0] ?? "",
      sizes: product.sizes ?? [],
      image: product.image ?? "",
      description: product.description ?? "",
    });
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  const handleSizeToggle = (size) => {
    setFormData((currentFormData) => {
      const isSelected = currentFormData.sizes.includes(size);

      return {
        ...currentFormData,
        sizes: isSelected
          ? currentFormData.sizes.filter(
              (selectedSize) => selectedSize !== size,
            )
          : [...currentFormData.sizes, size].sort(
              (firstSize, secondSize) => firstSize - secondSize,
            ),
      };
    });

    if (errors.sizes) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        sizes: "",
      }));
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        image: "Please select a valid image file.",
      }));
      return;
    }

    const maximumFileSize = 3 * 1024 * 1024;

    if (file.size > maximumFileSize) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        image: "The image must be smaller than 3 MB.",
      }));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((currentFormData) => ({
        ...currentFormData,
        image: reader.result,
      }));

      setErrors((currentErrors) => ({
        ...currentErrors,
        image: "",
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.image) {
      nextErrors.image = "A product image is required.";
    }

    if (!formData.name.trim()) {
      nextErrors.name = "Product name is required.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      nextErrors.price = "Enter a valid product price.";
    }

    if (
      formData.originalPrice &&
      Number(formData.originalPrice) < Number(formData.price)
    ) {
      nextErrors.originalPrice =
        "Original price must be greater than the sale price.";
    }

    if (!formData.section) {
      nextErrors.section = "Select a section.";
    }

    if (!formData.brand) {
      nextErrors.brand = "Select a brand.";
    }

    if (!formData.width) {
      nextErrors.width = "Select a width.";
    }

    if (formData.sizes.length === 0) {
      nextErrors.sizes = "Select at least one size.";
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      nextErrors.stock = "Enter a valid stock quantity.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      updateProduct(productId, {
        name: formData.name.trim(),
        brand: formData.brand,
        category: formData.section,
        section: formData.section,
        collection: formData.collection,
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : null,
        stock: Number(formData.stock),
        width: formData.width,
        widths: [formData.width],
        sizes: formData.sizes,
        image: formData.image,
        description: formData.description.trim(),
        isFeatured: formData.collection === "Featured",
        isTrend: formData.collection === "Trend",
        isDeal: formData.collection === "Deals",
      });

      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", error);

      setErrors((currentErrors) => ({
        ...currentErrors,
        submit: "The product could not be updated. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return (
      <main className="add-product-page">
        <div className="add-product-page__heading">
          <h1>Product Management</h1>
        </div>

        <section className="add-product-page__content">
          <div className="product-form">
            <h2>Product not found</h2>

            <button
              className="product-form__submit"
              type="button"
              onClick={() => navigate("/admin/products")}
            >
              Back to Product Management
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <main className="add-product-page">
      <div className="add-product-page__heading">
        <h1>Product Management</h1>
      </div>

      <section className="add-product-page__content">
        <form className="product-form" onSubmit={handleSubmit} noValidate>
          <h2 className="product-form__title">
            Edit {formData.name || "Product"}
          </h2>

          <div className="product-form__row product-form__row--image">
            <label htmlFor="product-image">
              Image
              <span aria-hidden="true">*</span>
            </label>

            <div className="product-form__field">
              <div className="product-image-control">
                <input
                  ref={fileInputRef}
                  id="product-image"
                  className="product-image-control__file"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                />

                <div className="product-image-control__display">
                  {formData.image ? (
                    <div className="product-image-preview">
                      <img src={formData.image} alt="Product preview" />

                      <button
                        type="button"
                        aria-label="Remove product image"
                        onClick={handleRemoveImage}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="product-image-placeholder">
                      <ImagePlus size={24} />
                      <span>No image selected</span>
                    </div>
                  )}
                </div>

                <button
                  className="product-image-control__upload"
                  type="button"
                  onClick={handleUploadButtonClick}
                >
                  <Upload size={19} />
                  Upload
                </button>
              </div>

              {errors.image && (
                <p className="product-form__error">{errors.image}</p>
              )}
            </div>
          </div>

          <div className="product-form__row">
            <label htmlFor="product-name">
              Name
              <span aria-hidden="true">*</span>
            </label>

            <div className="product-form__field">
              <input
                id="product-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />

              {errors.name && (
                <p className="product-form__error">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="product-form__row">
            <label htmlFor="product-price">
              Price
              <span aria-hidden="true">*</span>
            </label>

            <div className="product-form__field">
              <div className="product-form__price">
                <input
                  id="product-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                />

                <strong>CAD ($)</strong>
              </div>

              {errors.price && (
                <p className="product-form__error">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="product-form__row">
            <label htmlFor="product-original-price">Original Price</label>

            <div className="product-form__field">
              <div className="product-form__price">
                <input
                  id="product-original-price"
                  name="originalPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                />

                <strong>CAD ($)</strong>
              </div>

              {errors.originalPrice && (
                <p className="product-form__error">{errors.originalPrice}</p>
              )}
            </div>
          </div>

          <div className="product-form__row">
            <label htmlFor="product-section">
              Section
              <span aria-hidden="true">*</span>
            </label>

            <div className="product-form__field">
              <select
                id="product-section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
              >
                <option value="">Select section</option>

                {sectionOptions.map((section) => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>

              {errors.section && (
                <p className="product-form__error">{errors.section}</p>
              )}
            </div>
          </div>

          <fieldset className="product-form__row product-form__row--sizes">
            <legend>
              Size
              <span aria-hidden="true">*</span>
            </legend>

            <div className="product-form__field">
              <div className="product-form__sizes">
                {sizeOptions.map((size) => {
                  const isSelected = formData.sizes.includes(size);

                  return (
                    <button
                      key={size}
                      className={
                        isSelected
                          ? "product-form__size product-form__size--selected"
                          : "product-form__size"
                      }
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleSizeToggle(size)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {errors.sizes && (
                <p className="product-form__error">{errors.sizes}</p>
              )}
            </div>
          </fieldset>

          <div className="product-form__row">
            <label htmlFor="product-collection">Collection</label>

            <div className="product-form__field">
              <select
                id="product-collection"
                name="collection"
                value={formData.collection}
                onChange={handleInputChange}
              >
                {collectionOptions.map((collection) => (
                  <option key={collection} value={collection}>
                    {collection}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="product-form__row">
            <label htmlFor="product-width">
              Width
              <span aria-hidden="true">*</span>
            </label>

            <div className="product-form__field">
              <select
                id="product-width"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
              >
                <option value="">Select width</option>

                {widthOptions.map((width) => (
                  <option key={width} value={width}>
                    {width}
                  </option>
                ))}
              </select>

              {errors.width && (
                <p className="product-form__error">{errors.width}</p>
              )}
            </div>
          </div>

          <div className="product-form__row">
            <label htmlFor="product-brand">
              Brand
              <span aria-hidden="true">*</span>
            </label>

            <div className="product-form__field">
              <select
                id="product-brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              >
                <option value="">Select brand</option>

                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              {errors.brand && (
                <p className="product-form__error">{errors.brand}</p>
              )}
            </div>
          </div>

          <div className="product-form__row">
            <label htmlFor="product-stock">
              Stock
              <span aria-hidden="true">*</span>
            </label>

            <div className="product-form__field">
              <input
                id="product-stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleInputChange}
              />

              {errors.stock && (
                <p className="product-form__error">{errors.stock}</p>
              )}
            </div>
          </div>

          <div className="product-form__row product-form__row--description">
            <label htmlFor="product-description">Description</label>

            <div className="product-form__field">
              <textarea
                id="product-description"
                name="description"
                rows="5"
                maxLength="600"
                value={formData.description}
                onChange={handleInputChange}
              />

              <p className="product-form__character-count">
                {formData.description.length}/600
              </p>
            </div>
          </div>

          {errors.submit && (
            <p className="product-form__submit-error">{errors.submit}</p>
          )}

          <div className="product-form__actions">
            <button
              className="product-form__cancel"
              type="button"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>

            <button
              className="product-form__submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditProductPage;
