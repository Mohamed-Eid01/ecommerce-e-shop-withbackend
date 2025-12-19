import { FaStar } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("Please login first");
      navigate("/");
      return;
    }

    dispatch(addToCart(product));
    toast.success("Product added to cart");
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        {/* Image */}
        <div className="w-full h-52 bg-gray-50 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {product.category || "General"}
          </p>

          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p
            className="
              text-sm text-gray-600 leading-relaxed
              line-clamp-1
              transition-all duration-300
            "
          >
            {product.description || "Product description will go here."}
          </p>

          {/* <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <span className="text-sm text-gray-500 ml-1">(4.0)</span>
          </div> */}

          <div className="flex items-center justify-between mt-3">
            <p className="text-xl font-bold text-red-600">${product.price}</p>

            <button
              onClick={handleAddToCart}
              className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
