import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";

function App() {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="/products/:productId" element={<Product />} />
          </Routes>
        </Layout>
      </Provider>
      <Toaster position={"top-left"} />
    </>
  );
}

export default App;
