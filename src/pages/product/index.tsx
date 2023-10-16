import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsItem, selectProducts } from "../../store/productsSlice";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Badge, Button, Error, Loading } from "../../components/ui";
import { FaPlus, FaMinus } from "react-icons/fa";
function Product() {
  const ref = useRef<HTMLInputElement>(null);
  const params = useParams();
  const productId = params.productId;
  const dispatch = useDispatch<AppDispatch>();
  const { loadingItem, dataItem, errorItem } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProductsItem({ id: productId }));
  }, [dispatch, productId]);

  const addToCart = () => {
    const value = {
      ...dataItem,
      amount: parseInt(ref.current ? ref.current.value : "1"),
    };
    let cart = [];
    if (localStorage.getItem("cart") !== null) {
      cart = JSON.parse(localStorage.getItem("cart")!);
    }
    cart.push(value);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/";
  };

  if (loadingItem) {
    return <Loading />;
  }
  if (errorItem) {
    return <Error />;
  }
  const { title, images, description, category, price } = dataItem;
  return (
    <div className="container product">
      <div>
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={30}
          grabCursor={true}
          modules={[Pagination]}
          className="swiper-images"
        >
          {images.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <img className="slide-image" src={image} alt={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pt-4 product-details">
        <h2>{title}</h2>
        <div>
          <span className="font-bold">category :</span>{" "}
          <Badge>{category.name}</Badge>
        </div>
        <p>
          <span className="font-bold">description :</span> {description}
        </p>
        <p>
          <span className="font-bold">price :</span> {price}$
        </p>
        <div className="counter text-secondary-500">
          <FaMinus
            className="cursor-pointer"
            onClick={() => {
              if (ref.current) {
                if (parseInt(ref.current.value) > 1) {
                  const newValue = parseInt(ref.current.value) - 1;
                  ref.current.value = newValue.toString();
                }
              }
            }}
          />
          <input
            type="number"
            min="1"
            max="1000"
            ref={ref}
            defaultValue={1}
            id="counterInput"
            className="counter-input"
          />
          <FaPlus
            className="cursor-pointer"
            onClick={() => {
              if (ref.current) {
                const newValue = parseInt(ref.current.value) + 1;
                ref.current.value = newValue.toString();
              }
            }}
          />
        </div>
        <div>
          <Button onClick={addToCart}>add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
