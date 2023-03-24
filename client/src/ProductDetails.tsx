import { useParams, NavLink, Outlet } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Loader from "./Loader";

export default function ProductDetails() {
  const { productId } = useParams();
  console.log(productId);

  const getProduct = gql`
    query Product($productId: ID!) {
      product(id: $productId) {
        name
        price
        quantity
        img
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(getProduct, {
    variables: {
      productId,
    },
  });
  //console.log(data); this couses Error and undefined response
  //Must develop after the return
  //const { name, price, description, quantity, img }: Product = data.product;
  return (
    <>
      {loading && <Loader />}
      {error && <p>Error : {error.message}</p>}
      {data && (
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="true"
                  to={""}
                >
                  Active
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={""}>
                  Link
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={""} className="nav-link disabled">
                  Disabled
                </NavLink>
              </li>
            </ul>
          </div>
          <Outlet context={data.product} />
          <div className="card-body">
            <h5 className="card-title">{data.product.name}</h5>
            <img src={data.product.img} className="card-img-top" alt="..." />
            <p className="card-text">{data.product.description}</p>
            <p className="card-text">Quantity left: {data.product.quantity}</p>
            <NavLink to={""} className="btn btn-primary">
              {data.product.price}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
