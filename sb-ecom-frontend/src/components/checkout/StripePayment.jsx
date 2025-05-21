import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStripePaymentSecret } from "../store/actions";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!clientSecret && totalPrice) {
      dispatch(createStripePaymentSecret(totalPrice));
    }
  }, [clientSecret, totalPrice, dispatch]);

  return (
    <React.Fragment>
      <div className="">
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
          </Elements>
        )}
      </div>
    </React.Fragment>
  );
};

export default StripePayment;
