import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Skeleton from "../Skeleton";

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {};

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        {clientSecret ? (
          <Skeleton />
        ) : (
          <>
            {clientSecret && <PaymentElement options={paymentElementOptions} />}
            {errorMessage && (
              <div className="text-red-500 mt-2">{errorMessage}</div>
            )}
            <button disabled={!stripe || loading}>
              {!loading
                ? `Pay $${Number(totalPrice).toFixed(2)}`
                : "Processing"}
            </button>
          </>
        )}
      </form>
    </React.Fragment>
  );
};

export default PaymentForm;
