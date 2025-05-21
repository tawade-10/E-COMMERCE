import React from "react";
import { formatPriceCalculation } from "../utils/formatPrice";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  return (
    <React.Fragment>
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Billing Address
              </h2>
              <div className="text-gray-700 space-y-1">
                <p>
                  <strong>Building Name:</strong> {address?.buildingName}
                </p>
                <p>
                  <strong>Street:</strong> {address?.street}
                </p>
                <p>
                  <strong>City:</strong> {address?.city}
                </p>
                <p>
                  <strong>State:</strong> {address?.state}
                </p>
                <p>
                  <strong>Pincode:</strong> {address?.pincode}
                </p>
                <p>
                  <strong>Country:</strong> {address?.country}
                </p>
              </div>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Payment Method
              </h2>
              <p className="text-gray-700">
                <strong>Method:</strong> {paymentMethod}
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Order Items
              </h2>
              <div className="space-y-4">
                {cart?.map((item) => (
                  <div
                    key={item?.productId}
                    className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50"
                  >
                    <img
                      src={`${import.meta.env.VITE_BACK_END_URL}/images/${
                        item?.image
                      }`}
                      alt={item?.productName}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">
                        {item?.productName}
                      </p>
                      <p className="text-gray-600">
                        {item?.quantity} x ₹{item?.specialPrice} = $
                        {formatPriceCalculation(
                          item?.quantity,
                          item?.specialPrice
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        Original Price: ₹{item?.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="p-6 border rounded-lg shadow-md bg-white lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Order Summary
              </h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Products Total</span>
                  <span>₹{formatPriceCalculation(totalPrice,1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (0%)</span>
                  <span>₹0.00</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Subtotal</span>
                    <span>₹{formatPriceCalculation(totalPrice,1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderSummary;
