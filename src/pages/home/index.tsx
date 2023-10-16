import React, { useEffect, useState } from "react";
import { getProducts, selectProducts } from "../../store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { TProduct } from "../../utils/types";
import { Button, Error, Loading } from "../../components/ui";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(selectProducts);
  const [limit, setLimit] = useState<number>(10);
  useEffect(() => {
    dispatch(getProducts({ params: { offset: 0, limit: limit } }));
  }, [dispatch, limit]);

  const addToCart = (product: TProduct) => {
    const value = {
      ...product,
      amount: 1,
    };
    let cart = [];
    if (localStorage.getItem("cart") !== null) {
      cart = JSON.parse(localStorage.getItem("cart")!);
    }
    cart.push(value);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("done");
  };
  const loadMoreCards = () => {
    setLimit((prev) => prev * 2);
  };
  if (loading) {
    return <Loading/>;
  }
  if (error) {
    return <Error/>;
  }
  return (
    <div className="container home">
      {data.map((product: TProduct) => (
        <div className="card" key={product.id}>
          <img
            className="card-image"
            src={product.images[0]}
            alt={product.title}
          />
          <h3 className="card-title">{product.title}</h3>
          <p className="px-2 card-description">
            {product.description.substring(0, 50)}
            {product.description.length > 50 ? "..." : ""}
          </p>
          <p className="card-price px-2">
            <span className="font-bold">price :</span> {product.price}$
          </p>
          <div className="card-buttons">
            <Button to={`/products/${product.id}`}>
              show details
            </Button>
            <Button theme="secondary" onClick={() => addToCart(product)}>
              add to cart
            </Button>
          </div>
        </div>
      ))}
      <Button theme="secondary" onClick={loadMoreCards}>
        load more cards
      </Button>
    </div>
  );
}

export default Home;
