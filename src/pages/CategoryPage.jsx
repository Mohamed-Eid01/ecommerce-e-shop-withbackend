import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../comonents/ProductCard";
import ArrowScroll from "../comonents/ArrowScroll";

function CategoryPage() {
  const { category } = useParams();
  const products = useSelector((state) => state.product.products);

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center items-center mb-6 h-20">
        <h3 className="text-xl font-bold mb-6">{category} Products</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ArrowScroll scrollAmount={100} />
    </div>
  );
}

export default CategoryPage;
