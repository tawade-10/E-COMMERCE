import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../shared/ErrorPage";
import Skeleton from "../Skeleton";
import { getUserAddresses } from "../store/actions";
import AddressInfo from "./AddressInfo";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import PayPalPayment from "./PayPalPayment";
import StripePayment from "./StripePayment";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );

  const { paymentMethod } = useSelector((state) => state.payment);

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please Select Checkout Address before Proceeding.");
      return;
    }
    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please Select a Payment Method before Proceeding.");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="py-14 min-h-[calc(100vh-100px)]">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {isLoading ? (
          <div className="lg:w-[80%] mx-auto py-5">
            <Skeleton />
          </div>
        ) : (
          //Render the Payment Pages
          <div className="mt-5">
            {activeStep === 0 && <AddressInfo address={address} />}
            {activeStep === 1 && <PaymentMethod />}
            {activeStep === 2 && (
              <OrderSummary
                totalPrice={totalPrice}
                cart={cart}
                address={selectedUserCheckoutAddress}
                paymentMethod={paymentMethod}
              />
            )}
            {activeStep === 3 && (
              <>
                {paymentMethod === "Stripe" ? (
                  <StripePayment />
                ) : (
                  <PayPalPayment />
                )}
              </>
            )}
          </div>
        )}
        <div
          className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-t border-slate-200"
          style={{ boxShadow: "0 -2px 4px rgba(100,100,100,0.15)" }}
        >
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep !== steps.length - 1 && (
            <button
              disabled={
                isLoading ||
                errorMessage ||
                (activeStep === 0 && !selectedUserCheckoutAddress) ||
                (activeStep === 1 && !paymentMethod) // Ensure paymentMethod is selected for step 1
              }
              onClick={handleNext}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 h-10 rounded-md
                ${
                  isLoading ||
                  errorMessage ||
                  (activeStep === 0 && !selectedUserCheckoutAddress) ||
                  (activeStep === 1 && !paymentMethod)
                    ? "opacity-60 cursor-not-allowed" // Added cursor style
                    : ""
                }`}
            >
              Proceed
            </button>
          )}
          {activeStep === steps.length - 1 && (
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold px-6 h-10 rounded-md">
              Complete Payment
            </button>
          )}
        </div>
        {errorMessage && <ErrorPage message={errorMessage} />}
      </div>
    </React.Fragment>
  );
};

export default Checkout;
