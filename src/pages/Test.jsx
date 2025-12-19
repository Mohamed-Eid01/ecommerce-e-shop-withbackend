import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";

function Hello() {
  const [products, setProducts] = useState([]);
console.log(products);
console.log(Array.isArray(products));
  useEffect(() => {
    apiRequest("/products")
      .then((data) => {
        console.log(data); // مهم أول مرة
        setProducts(data.data ?? data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {products.length === 0 && <p>No products</p>}

      {products.map((p) => (
        <p key={p._id}>{p.name}</p>
      ))}
    </div>
  );
}

export default Hello;
