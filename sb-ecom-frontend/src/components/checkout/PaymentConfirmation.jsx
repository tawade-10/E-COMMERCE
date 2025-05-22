import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Skeleton from "../Skeleton";
import { stripePaymentConfirmation } from "../store/actions";

const PaymentConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { cart } = useSelector((state) => state.carts); // Assuming 'cart' is a state in your Redux store
  const [loading, setLoading] = useState(false);

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");
  const { selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Also, ensure `selectedUserCheckoutAddress` is available and has an `addressId`
    // before attempting to dispatch the order, as your backend requires it.
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart.length > 0 &&
      selectedUserCheckoutAddress && // Check if address exists
      selectedUserCheckoutAddress.addressId // Check if addressId exists
    ) {
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId, // THIS IS CRUCIAL FOR YOUR BACKEND
        paymentMethod: "Stripe", // This should match your backend's expected payment method
        pgName: "Stripe", // This is the pgName
        pgPaymentId: paymentIntent,
        pgStatus: redirectStatus === "succeeded" ? "succeeded" : "failed", // Use redirectStatus for actual status
        pgResponseMessage: redirectStatus === "succeeded" ? "Payment Successful" : "Payment Failed",
      };

      console.log("Sending data to backend for Stripe confirmation:", sendData); // ADD THIS LINE

      dispatch(
        stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast)
      );
    } else {
        // You might want to log why the dispatch isn't happening
        console.log("Stripe confirmation skipped. Missing data:", {
            paymentIntent,
            clientSecret,
            redirectStatus,
            cart,
            selectedUserCheckoutAddress
        });
        if (!selectedUserCheckoutAddress || !selectedUserCheckoutAddress.addressId) {
            setErrorMessage("Address information is missing. Cannot place order.");
            toast.error("Address information is missing. Cannot place order.");
        }
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart, selectedUserCheckoutAddress, dispatch, toast]); // Added dispatch and toast to dependency array

  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center"> {/* Corrected typo: justice-center -> justify-center */}
        {loading ? (
          <div className="max-w-xl mx-auto">
            <Skeleton />
          </div>
        ) : (
          <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto"> {/* Corrected typo: text-cebter -> text-center, mx -> mx-auto */}
            <div className="text-green-500 mb-4 flex justify-center">
              <FaCheckCircle size={64} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p>Thank You for your Purchase! Your order is being processed.</p>
            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PaymentConfirmation;