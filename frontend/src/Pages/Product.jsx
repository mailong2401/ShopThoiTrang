import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { ShopContext } from "../Context/ShopContext";

export const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((item) => item.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product}></Breadcrum>
      <ProductDisplay product={product}></ProductDisplay>
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};
