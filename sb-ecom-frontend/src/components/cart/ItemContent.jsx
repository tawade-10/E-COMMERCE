import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../store/actions";
import SetQuantity from "./setQuantity";
import { formatPrice } from './../utils/formatPrice';
import truncateText from "../utils/truncate";

const ItemContent = ({
  productId,
  productName,
  quantity,
  image,
  description,
  price,
  discount,
  specialPrice,
  cartId,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();

  // Sync local quantity state with redux prop quantity changes
  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  // Increase quantity handler
  const handleQuantityIncrease = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    dispatch(
      increaseCartQuantity(
        { productId, productName, image, description, specialPrice, price },
        toast,
        currentQuantity,
        setCurrentQuantity
      )
    );
  };

  const handleQuantityDecrease = () => {
    if (currentQuantity <= 1) return; 
    const newQuantity = currentQuantity ;
    setCurrentQuantity(newQuantity);
    dispatch(
      decreaseCartQuantity(
        { productId, productName, image, description, specialPrice, price },
        newQuantity
      )
    );
  };

  // Remove item from cart handler
  const removeItemFromCart = () => {
    dispatch(
      removeFromCart(
        { productId, productName, quantity, image, description, price, specialPrice },
        toast
      )
    );
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-200">
      <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600 px-3 py-1">
            {truncateText (productName)}
          </h3>
        </div>
        <div className="md:w-36 sm:w-24 w-12">
          <img
            src={image}
            alt={productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
          />
          <div className="flex items-start gap-5 mt-3">
            <button
              onClick={removeItemFromCart}
              className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border mb-2 ml-1 border-rose-700 text-rose-700 rounded-md hover:bg-red-50 transition-colors duration-200"
            >
              <HiOutlineTrash size={16} className="text-rose-700 mr-1" />
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {formatPrice(Number(specialPrice))}
      </div>
      <div className="justify-self-center">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handleQuantityIncrease={handleQuantityIncrease}
          handleQuantityDecrease={handleQuantityDecrease}
        />
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {formatPrice(Number(currentQuantity) * Number(specialPrice))}
      </div>
    </div>
  );
};

export default ItemContent;
