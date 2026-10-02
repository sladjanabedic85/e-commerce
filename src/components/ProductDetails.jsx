import { useContext, useEffect, useState } from "react";
import { apiRequest } from "../api/apiClient";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import { Button } from "./ui/button";

const SIZES = ["S", "M", "L", "XL"];

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);

  useEffect(() => {
    setLoading(true);
    setError("");
    apiRequest(`/products/${id}`)
      .then((data) => {
        setProduct(data);
      })
      .catch(() => {
        setError("Neuspešno učitavanje proizvoda.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
  }

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <img
        className="aspect-3/4 w-full rounded-lg object-cover"
        src={`/images/${id}.png`}
        alt={product.title}
      />

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-xl font-medium">${product.price}</p>
        <p className="text-muted-foreground">{product.description}</p>

        <div>
          <p className="mb-2 font-medium">Size</p>
          <div className="flex gap-2">
            {SIZES.map((size) => (
              <Button
                key={size}
                type="button"
                variant={selectedSize === size ? "default" : "outline"}
                size="icon"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <Button onClick={handleAddToCart} className="w-fit">Add to Cart</Button>
      </div>
    </div>
  );
}

export default ProductDetails;