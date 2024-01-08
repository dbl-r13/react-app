import React, { useEffect, useState } from "react";

/**
 * Interface can be done inline, please see below. This is best practice for smaller shaped objects
 * interface ProductListProps {
 * category: string;
 * }
 */

const ProductList = ({ category }: { category: string }) => {
  const [product, setProduct] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetching products in ", category);
    setProduct(["Clothing", "Household"]);
  }, [category]); //Adding the second value on the calback function for the useEffect, keeps it from going into an infite loop.

  return <div>ProductList</div>;
};

export default ProductList;
