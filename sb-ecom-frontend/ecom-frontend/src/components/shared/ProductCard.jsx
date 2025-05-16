import React,{ useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import truncateText from "../utils/truncate";
import { useDispatch } from 'react-redux';
import { addToCart } from "../store/actions";

const ProductCard = ({
  productId,
  productName,
  quantity,
  image,
  description,
  price,
  discount,
  specialPrice,
  about = false,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState(null);
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const handleProductView = (product) => {
    if (!about) {
      setOpenProductViewModal(product);
      setSelectedViewProduct(true);
    }
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems,1));
  }

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={handleProductView}
        className="w-full overflow-hidden aspect-[3/2] cursor-pointer"
      >
        <img
          className="w-full h-full transition-transform duration-300 transform hover:scale-105"
          src={image}
          alt={productName}
        />
      </div>
      <div className="p-4">
        <h2
          onClick={handleProductView}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {truncateText(productName, 50)}
        </h2>
        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm">
            {truncateText(description, 80)}
          </p>
        </div>

        {!about && (
          <div className="flex items-center justify-between">
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  ${Number(price).toFixed(2)}
                </span>
                <span className="text-xl font-bold text-slate-700">
                  ${Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-slate-700">
                ${Number(price).toFixed(2)}
              </span>
            )}

            <button
              disabled={!isAvailable}
              onClick={() => addToCartHandler({
                image,
                productName,
                description,
                specialPrice,
                price,
                productId,
                quantity,
              })}
              className={`bg-blue-500 ${
                isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
              } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
            >
              <FaShoppingCart className="mr-3" />
              {isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        )}
      </div>
      {/* <ProductViewModal
        isOpen={openProductViewModal}
        onClose={() => setOpenProductViewModal(false)}
        product={selectedViewProduct}
      /> */}
    </div>
  );
};

export default ProductCard;
