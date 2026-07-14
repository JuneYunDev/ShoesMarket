import { useMemo, useState } from "react";
import { ChevronUp, Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../../components/products/ProductCard";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { shoesData } from "../../data/shoesData";

import "./ProductListPage.css";

const sizeOptions = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  10.5, 11, 11.5, 12,
];

const pageTitles = {
  women: "Women's Shoes",
  men: "Men's Shoes",
  kids: "Kid's Shoes",
  brand: "Brand Shoes",
  trend: "Trending Shoes",
  deals: "Special Deals",
};

const sortOptions = [
  "Featured",
  "Newest",
  "Top Rated",
  "Price Low to High",
  "Price High to Low",
];

const widthOptions = ["Medium", "Wide", "Extra Wide"];

const ProductListPage = () => {
  const [products] = useState(shoesData);
  const [selectedSize, setSelectedSize] = useState(5.5);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [selectedWidth, setSelectedWidth] = useState("Medium");
  const [brandSearch, setBrandSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category")?.toLowerCase();
  const pageTitle = pageTitles[category] ?? "All Shoes";

  console.log("URL:", window.location.href);
  console.log("category:", category);
  console.log("pageTitle:", pageTitle);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedSize !== null) {
      result = result.filter((product) => product.sizes.includes(selectedSize));
    }

    if (selectedWidth) {
      result = result.filter((product) => product.width === selectedWidth);
    }

    if (brandSearch.trim()) {
      result = result.filter((product) =>
        product.brand.toLowerCase().includes(brandSearch.trim().toLowerCase()),
      );
    }

    if (selectedSort === "Top Rated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (selectedSort === "Price Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (selectedSort === "Price High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (selectedSort === "Featured") {
      result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [products, selectedSize, selectedSort, selectedWidth, brandSearch]);

  const handleToggleFavorite = (productId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(productId)
        ? currentFavorites.filter((id) => id !== productId)
        : [...currentFavorites, productId],
    );
  };

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  return (
    <>
      <Header />

      <main className="product-list-page">
        <h1>{pageTitle}</h1>

        <section className="filters">
          <div className="filters__heading">
            <div>
              <SlidersHorizontal size={30} />
              <h2>Filters</h2>
            </div>

            <button
              type="button"
              aria-label={isFilterOpen ? "Collapse filters" : "Expand filters"}
              aria-expanded={isFilterOpen}
              onClick={() => setIsFilterOpen((current) => !current)}
            >
              <ChevronUp
                size={30}
                className={
                  isFilterOpen
                    ? "filters__chevron"
                    : "filters__chevron filters__chevron--closed"
                }
              />
            </button>
          </div>

          {isFilterOpen && (
            <div className="filters__body">
              <div className="filter-row">
                <h3>Size</h3>

                <div className="size-options">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={
                        selectedSize === size
                          ? "size-option size-option--active"
                          : "size-option"
                      }
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-row">
                <h3>Sort</h3>

                <div className="filter-options">
                  {sortOptions.map((sortOption) => (
                    <label key={sortOption}>
                      <input
                        type="radio"
                        name="sort"
                        value={sortOption}
                        checked={selectedSort === sortOption}
                        onChange={(event) =>
                          setSelectedSort(event.target.value)
                        }
                      />

                      <span>{sortOption}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-row">
                <h3>Width</h3>

                <div className="filter-options">
                  {widthOptions.map((width) => (
                    <label key={width}>
                      <input
                        type="radio"
                        name="width"
                        value={width}
                        checked={selectedWidth === width}
                        onChange={(event) =>
                          setSelectedWidth(event.target.value)
                        }
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
            </div>
          )}
        </section>

        <section className="products-grid">
          {filteredProducts.map((shoe) => (
            <ProductCard
              key={shoe.id}
              shoe={shoe}
              isFavorite={favorites.includes(shoe.id)}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          ))}
        </section>

        {filteredProducts.length === 0 && (
          <p className="products-empty">
            No products match the selected filters.
          </p>
        )}

        <nav className="pagination" aria-label="Product pagination">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            &lt;
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              className={currentPage === page ? "pagination__active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage === 5}
            onClick={() => setCurrentPage((page) => Math.min(5, page + 1))}
          >
            &gt;
          </button>
        </nav>
      </main>

      <Footer />
    </>
  );
};

export default ProductListPage;
