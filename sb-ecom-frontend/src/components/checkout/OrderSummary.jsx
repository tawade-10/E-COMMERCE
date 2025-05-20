import React from "react";

const OrderSummary = ({totalPrice,cart,address,paymentMethod}) => {
  return (
    <React.Fragment>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 pr-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg shadpw-sm">
                <h2 className="text-2xl font-semibold mb-2">Billing Address</h2>
                <p>
                  <strong>Buiding Name: </strong>
                  {address?.buildingName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderSummary;
