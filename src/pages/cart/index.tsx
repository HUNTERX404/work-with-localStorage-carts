import { useEffect } from "react";
import { TProduct } from "../../utils/types";
import { FaPlus, FaMinus, FaWindowClose } from "react-icons/fa";
import { Button, Error, Loading, NoData } from "../../components/ui";
import {
  getCarts,
  orderAllCart,
  removeProductCart,
  selectCarts,
  updateProductCart,
} from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import toast from "react-hot-toast";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error, totalPrice } = useSelector(selectCarts);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  const orderAll = () => {
    dispatch(orderAllCart());
    toast.success("order all");
  };
  const removeProduct = (id: number) => {
    dispatch(removeProductCart(id));
  };
  const updateProduct = (
    id: number,
    type?: "add" | "sub" | "any",
    amount?: number
  ) => {
    if (type !== "any") {
      if ((type === "sub" && data[id].amount > 1) || type === "add") {
        dispatch(updateProductCart({ id, type }));
      }
    } else {
      dispatch(updateProductCart({ id, type, amount: amount ? amount : 0 }));
    }
  };
  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="container">
      {totalPrice > 0 ? (
        <>
          <div className="cart-container">
            {data.map((product: TProduct, index: number) => (
              <div key={index} className="order">
                <img
                  src={product.images[0]}
                  className="order-image"
                  alt={product.images[0]}
                />
                <div className="order-details">
                  <div>
                    <p className="font-bold text-secondary-500">
                      {product.title}
                    </p>
                    <FaWindowClose
                      onClick={() => removeProduct(index)}
                      className="order-remove-icon"
                    />
                  </div>
                  <div className="order-amount">
                    <div className="border rounded-3 p-2 d-flex align-items-center gap-2 counter text-secondary-500 order">
                      <FaMinus
                        className="cursor-pointer"
                        onClick={() => {
                          updateProduct(index, "sub");
                        }}
                      />
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        onChange={(event) => {
                          updateProduct(
                            index,
                            "any",
                            parseInt(event.target.value)
                          );
                        }}
                        defaultValue={product.amount}
                        value={product.amount}
                        id={`counterInput-${index}`}
                        className="counter-input"
                      />
                      <FaPlus
                        className="cursor-pointer"
                        onClick={() => {
                          updateProduct(index, "add");
                        }}
                      />
                    </div>
                    <span className="order-span"></span>
                    <p
                      className="m-0 p-0 flex-shrink-0 text-primary fw-semibold order-price"
                      id={`price-${product.id}`}
                    >
                      {product.price * product.amount!} $
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-buttons">
            <p className="total-price">
              <span className="font-bold">total price :</span> {totalPrice}$
            </p>
            <Button onClick={orderAll}>order all</Button>
          </div>
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Cart;
