import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const steps = ["Placed", "Order Confirmed", "Shipped", "Out for Delivery", "Delivered"];

export default function OrderTracker() {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  const step = querySearch.get("step");

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="px-10 lg:p-10 bg-smoke">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </Box>
            {/* <div>{step == 2 ? <DeliveryAddressForm /> : <OrderSummary />}</div> */}
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
