import { useState } from "react";
import { ChevronUp, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../../components/admin/ProductCard";
import { shoesData } from "../../data/shoesData";
import "./productManagement.css";

const sectionOptions = ["Women", "Men", "Kids", "Brand", "Trend", "Deals"];

const sizeOptions = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  10.5, 11, 11.5, 12,
];

const sortOptions = [
  "Featured",
  "Newest",
  "Top Rated",
  "Price Low to High",
  "Price High to Low",
];

const widthOptions = ["Medium", "Wide", "Extra Wide"];

const ProductManagement = () => {
  const [products, setProducts] = useState(shoesData);
  const [selectedSection, setSelectedSection] = useState("Women");
  const [selectedSize, setSelectedSize] = useState(5.5);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [selectedWidth, setSelectedWidth] = useState("Medium");
  const [brandSearch, setBrandSearch] = useState("");

  const handleEditProduct = (shoe) => {
    console.log("Edit product:", shoe);
  };

  const handleDeleteProduct = (productId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!shouldDelete) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const handleAddProduct = () => {
    console.log("Open Add Product form");
  };

  return (
    <main className="product-management">
      <h1 className="product-management__title">Product Management</h1>

      <section className="product-filters">
        <div className="product-filters__heading">
          <div>
            <SlidersHorizontal size={30} />
            <h2>Filters</h2>
          </div>

          <button type="button" aria-label="Collapse filters">
            <ChevronUp size={32} />
          </button>
        </div>

        <div className="filter-row">
          <h3>Section</h3>

          <div className="filter-row__options">
            {sectionOptions.map((section) => (
              <label key={section}>
                <input
                  type="radio"
                  name="section"
                  value={section}
                  checked={selectedSection === section}
                  onChange={(event) => setSelectedSection(event.target.value)}
                />

                <span>{section}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <h3>Size</h3>

          <div className="size-options">
            {sizeOptions.map((size) => (
              <button
                key={size}
                className={
                  selectedSize === size
                    ? "size-option size-option--active"
                    : "size-option"
                }
                type="button"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <h3>Sort</h3>

          <div className="filter-row__options">
            {sortOptions.map((sortOption) => (
              <label key={sortOption}>
                <input
                  type="radio"
                  name="sort"
                  value={sortOption}
                  checked={selectedSort === sortOption}
                  onChange={(event) => setSelectedSort(event.target.value)}
                />

                <span>{sortOption}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <h3>Width</h3>

          <div className="filter-row__options">
            {widthOptions.map((width) => (
              <label key={width}>
                <input
                  type="radio"
                  name="width"
                  value={width}
                  checked={selectedWidth === width}
                  onChange={(event) => setSelectedWidth(event.target.value)}
                />

                <span>{width}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <h3>Brand</h3>

          <div className="brand-search">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search..."
              value={brandSearch}
              onChange={(event) => setBrandSearch(event.target.value)}
            />
          </div>
        </div>
      </section>

      <button
        className="add-product-button"
        type="button"
        onClick={handleAddProduct}
      >
        + Add Product
      </button>

      <section className="products-grid">
        {products.map((shoe) => (
          <ProductCard
            key={shoe.id}
            shoe={shoe}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </section>

      {products.length === 0 && (
        <p className="products-empty-message">
          No products are currently available.
        </p>
      )}

      <nav className="pagination" aria-label="Product pagination">
        <button type="button" aria-label="Previous page">
          &lt;
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={page === 1 ? "pagination__active" : ""}
            type="button"
          >
            {page}
          </button>
        ))}

        <button type="button" aria-label="Next page">
          &gt;
        </button>
      </nav>
    </main>
  );
};

export default ProductManagement;
