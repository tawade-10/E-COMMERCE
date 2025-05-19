import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../store/actions";
import AddressInfo from "./AddressInfo";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.auth);

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

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
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo address={address} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
