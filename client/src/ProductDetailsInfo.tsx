import { useOutletContext } from "react-router-dom";
import { Product } from "./interfaces/product";
const ProductDetailsInfo = () => {
  const product: Product = useOutletContext();
  return (
    <div>
      <h5 className="card-title">{product.name}</h5>
      <img src={product.img} className="card-img-top" alt="..." />
      <p className="card-text">{product.description}</p>
      <p className="card-text">Quantity left: {product.quantity}</p>
    </div>
  );
};
export default ProductDetailsInfo;
