import "./App.css";
import StoreFront from "./StoreFront";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import NotFound from "./NotFound";
import Nutrition from "./Nutrition";
import Storage from "./Storage";
import ProductDetailsInfo from "./ProductDetailsInfo";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="/:productId" element={<ProductDetails />}>
          <Route path="" element={<ProductDetailsInfo />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="storage" element={<Storage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
