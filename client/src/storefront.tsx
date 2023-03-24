import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function StoreFront() {
  const getProducts = gql`
    query Query {
      products {
        name
        price
        quantity
        img
        id
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(getProducts);
  return (
    <>
      <div className="container">
        {loading && <Loader />}
        {error && <p>Error : {error.message}</p>}
        <div className="row-m2">
          {data &&
            data.products.map(
              ({ id, name, price, quantity, description, img }: any) => (
                <div key={id} className="col-sm-6 col-md-4 v my-2">
                  <div
                    className="card"
                    style={{ width: "18rem", minHeight: 225 }}
                  >
                    <img src={img} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <Link to={`${id}/`}>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                      </Link>
                      <button type="button" className="btn btn-primary">
                        {price}
                      </button>
                      <p className="card-text">rest: {quantity}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          ;
        </div>
      </div>
    </>
  );
}
