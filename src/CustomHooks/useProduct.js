import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://murmuring-citadel-05940.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  return [products];
};

export default useProduct;
