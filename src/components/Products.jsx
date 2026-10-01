import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { apiRequest } from "../api/apiClient";
import ProductCard from "./ProductCard.jsx";

function Products({ category }) {
  const [searchParams] = useSearchParams();
  const activeCategory = category || searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    apiRequest("/products")
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.products || []);
      })
      .catch(() => {
        setError("Failed to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
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
      <h1 className="mb-6 text-2xl font-semibold">All Products</h1>
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