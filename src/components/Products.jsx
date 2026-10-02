import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { apiRequest } from "../api/apiClient";
import ProductCard from "./ProductCard.jsx";

const STORE_CATEGORIES = new Set(["men clothing", "women clothing", "footwear", "accessories"]);
const CATEGORY_ALIASES = {
  women: "women clothing",
  men: "men clothing",
  kids: "kids clothing",
};

function Products({ category }) {
  const [searchParams] = useSearchParams();
  const activeCategory = category || searchParams.get("category");
  const normalizedCategory = activeCategory?.toLowerCase();
  const requestedCategory = CATEGORY_ALIASES[normalizedCategory] || normalizedCategory;
  const pageTitle = { women: "Women", men: "Men", kids: "Kids" }[normalizedCategory] || "All Products";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    apiRequest("/products")
      .then((data) => {
        const fetchedProducts = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];
        setProducts(fetchedProducts.filter((product) =>
          STORE_CATEGORIES.has(product.category?.toLowerCase())
        ));
      })
      .catch(() => {
        setError("Failed to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((product) => product.category?.toLowerCase() === requestedCategory)
    : products;

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ClipLoader size={50} color="#000000" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">{pageTitle}</h1>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;