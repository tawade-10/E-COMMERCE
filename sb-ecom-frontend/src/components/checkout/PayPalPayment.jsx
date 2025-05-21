import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const PayPalPayment = () => {
  return (
    <React.Fragment>
      <div className="h-96 flex justify-center items-center">
        <Alert
          severity="warning"
          variant="filled"
          style={{ maxWidth: "400px" }}
        >
          <AlertTitle>PayPal Method Unavailable</AlertTitle>
          PayPal payment is unavailable.Please try another method.
        </Alert>
      </div>
    </React.Fragment>
  );
};

export default PayPalPayment;
