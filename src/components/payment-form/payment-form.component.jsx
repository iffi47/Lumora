import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { selectCartTotal } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentContainer, CardField } from "./payment-form.styles";
import { clearCart } from "../../store/cart/cart.action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const cardOptions = {
  style: {
    base: {
      color: "#302d29",
      fontFamily: '"Open Sans", Arial, sans-serif',
      fontSize: "14px",
      lineHeight: "24px",
      "::placeholder": { color: "#756f66" },
    },
    invalid: { color: "#a33e32" },
  },
};

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector(selectCartTotal);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isProcessing || isPaid || total <= 0) {
      return;
    }

    setIsProcessing(true);
    setPaymentMessage("");

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(total * 100) }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create payment intent");
      }
      if (!data.paymentIntent?.client_secret) {
        throw new Error("Payment service returned an invalid response");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.paymentIntent.client_secret,
        { payment_method: { card: elements.getElement(CardElement) } },
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        setIsPaid(true);
        setPaymentMessage("Payment successful.");
        dispatch(clearCart());
        navigate("/");
      } else {
        setPaymentMessage("Payment has not completed. Please check its status before retrying.");
      }
    } catch (error) {
      setPaymentMessage(error.message || "Unable to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <PaymentContainer aria-labelledby="payment-heading">
      <h3 id="payment-heading">Payment details</h3>
      <p className="payment-label">Credit or debit card</p>
      <CardField>
        <CardElement options={cardOptions} />
      </CardField>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        className="payment-button"
        onClick={paymentHandler}
        disabled={!stripe || !elements || isProcessing || isPaid || total <= 0}
      >
        {isProcessing ? "Processing…" : isPaid ? "Paid" : "Pay now"}
      </Button>
      {paymentMessage && <p role="status">{paymentMessage}</p>}
    </PaymentContainer>
  );
}
