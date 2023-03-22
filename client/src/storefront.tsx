import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  return data.products.map(
    ({ id, name, price, quantity, description, img }: any) => (
      <div className="container">
        <div className="row-m2">
          <div key={id} className="col-sm-6 col-md-4 v my-2">
            <Link to={`${id}`}>
              <div className="card" style={{ width: "18rem", minHeight: 225 }}>
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{description}</p>
                  <a href="#" className="btn btn-primary">
                    {price}
                  </a>
                  <p className="card-text">rest: {quantity}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
