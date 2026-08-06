import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";

import ProductCard from "../../components/admin/ProductCard";
import { useAccount } from "../../context/accountContext";
import { shoesData } from "../../data/shoesData";
import { useProducts } from "../../context/productContext";
import AdminHeader from "../../components/admin/adminHeader";

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

const PRODUCTS_PER_PAGE = 6;

const ProductManagement = () => {
  const navigate = useNavigate();
  const { currentAccount, logout } = useAccount();

  const { products, deleteProduct } = useProducts();

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("Women");
  const [selectedSize, setSelectedSize] = useState(5.5);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [selectedWidth, setSelectedWidth] = useState("Medium");
  const [brandSearch, setBrandSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (brandSearch.trim()) {
      const searchValue = brandSearch.trim().toLowerCase();

      result = result.filter((product) => {
        const brand = product.brand?.toLowerCase() ?? "";
        const name = product.name?.toLowerCase() ?? "";

        return brand.includes(searchValue) || name.includes(searchValue);
      });
    }

    if (selectedSort === "Newest") {
      result.sort((firstProduct, secondProduct) => {
        return Number(secondProduct.id) - Number(firstProduct.id);
      });
    }

    if (selectedSort === "Top Rated") {
      result.sort((firstProduct, secondProduct) => {
        return (secondProduct.rating ?? 0) - (firstProduct.rating ?? 0);
      });
    }

    if (selectedSort === "Price Low to High") {
      result.sort((firstProduct, secondProduct) => {
        return firstProduct.price - secondProduct.price;
      });
    }

    if (selectedSort === "Price High to Low") {
      result.sort((firstProduct, secondProduct) => {
        return secondProduct.price - firstProduct.price;
      });
    }

    return result;
  }, [products, brandSearch, selectedSort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  const handleEditProduct = (shoe) => {
    navigate(`/admin/products/${shoe.id}/edit`);
  };

  const handleDeleteProduct = (productId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!shouldDelete) {
      return;
    }

    deleteProduct(productId);
  };

  const handleAddProduct = () => {
    navigate("/admin/products/add");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    setCurrentPage(1);
  };

  return (
    <div className="admin-page">
      <AdminHeader />
      <main className="product-management">
        <h1 className="product-management__title">Product Management</h1>

        <section className="product-filters">
          <div className="product-filters__heading">
            <div className="product-filters__heading-title">
              <SlidersHorizontal size={28} aria-hidden="true" />
              <h2>Filters</h2>
            </div>

            <button
              className="product-filters__toggle"
              type="button"
              aria-label={filtersOpen ? "Collapse filters" : "Expand filters"}
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((currentValue) => !currentValue)}
            >
              {filtersOpen ? (
                <ChevronUp size={30} />
              ) : (
                <ChevronDown size={30} />
              )}
            </button>
          </div>

          {filtersOpen && (
            <div className="product-filters__content">
              <div className="filter-row">
                <h3>Section</h3>

                <div className="filter-row__options">
                  {sectionOptions.map((section) => (
                    <label className="filter-radio" key={section}>
                      <input
                        type="radio"
                        name="section"
                        value={section}
                        checked={selectedSection === section}
                        onChange={() => handleSectionChange(section)}
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
                    <label className="filter-radio" key={sortOption}>
                      <input
                        type="radio"
                        name="sort"
                        value={sortOption}
                        checked={selectedSort === sortOption}
                        onChange={() => handleSortChange(sortOption)}
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
                    <label className="filter-radio" key={width}>
                      <input
                        type="radio"
                        name="width"
                        value={width}
                        checked={selectedWidth === width}
                        onChange={() => setSelectedWidth(width)}
                      />

                      <span>{width}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-row">
                <h3>Brand</h3>

                <label className="brand-search">
                  <Search size={19} aria-hidden="true" />

                  <input
                    type="search"
                    placeholder="Search..."
                    value={brandSearch}
                    onChange={(event) => {
                      setBrandSearch(event.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </label>
              </div>
            </div>
          )}
        </section>

        <button
          className="add-product-button"
          type="button"
          onClick={handleAddProduct}
        >
          + Add Product
        </button>

        {paginatedProducts.length > 0 ? (
          <section className="products-grid" aria-label="Products">
            {paginatedProducts.map((shoe) => (
              <ProductCard
                key={shoe.id}
                shoe={shoe}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </section>
        ) : (
          <p className="products-empty-message">
            No products match the selected filters.
          </p>
        )}

        {filteredProducts.length > 0 && (
          <nav className="pagination" aria-label="Product pagination">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={currentPage === page ? "pagination__active" : ""}
                  type="button"
                  aria-current={currentPage === page ? "page" : undefined}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </nav>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
