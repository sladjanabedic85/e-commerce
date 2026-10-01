import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import { Button } from "./ui/button";

function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    function handleAddToCart() {
        addToCart({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.image,
        });
    }

    return (
        <div className="flex flex-col gap-2">
            <Link to={`/products/${product.id}`}>
                <img
                    className="aspect-3/4 w-full rounded-lg object-cover"
                    src={`/images/${product.id}.png`}
                    alt={product.title}
                />
            </Link>

            <p className="font-medium">{product.title}</p>

            <div className="flex items-center justify-between">
                <span className="font-semibold">${product.price}</span>
            </div>

            <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;