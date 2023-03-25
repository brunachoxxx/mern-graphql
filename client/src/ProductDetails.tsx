import { useParams, NavLink, Link, Outlet } from "react-router-dom";
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
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  end
                  aria-current="true"
                  to={""}
                >
                  Product Details
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"nutrition"}
                >
                  Nutrition
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"storage"}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Storage
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <Outlet context={data.product} />
            <Link to={""} className="btn btn-primary">
              {data.product.price}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
