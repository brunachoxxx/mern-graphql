import "./App.css";
import StoreFront from "./storefront";
import { Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import NotFound from "./NotFound";
function App() {
  return (
    <div className="container">
      <Route path="/" element={<StoreFront />}></Route>
      <Route path="/:id" element={<ProductDetails />}></Route>
      <Route path="*" element={<NotFound />}></Route>{" "}
      <Route path="/storefront" element={<StoreFront />}></Route>
    </div>
  );
}

export default App;
