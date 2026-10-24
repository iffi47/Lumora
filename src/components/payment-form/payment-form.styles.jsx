import styled from "styled-components";

export const PaymentContainer = styled.section`
  min-width: 0;
  margin-top: 20px;
  padding-top: 24px;
  border-top: 1px solid #d9cfc0;

  h3 {
    margin: 0 0 18px;
    color: var(--ink);
    font-size: 16px;
    font-weight: 600;
  }

  .payment-label {
    margin: 0 0 10px;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.5;
  }

  .payment-button {
    width: 100%;
    min-height: 48px;
    margin-top: 18px;
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);

    &:hover {
      background: #544b40;
      border-color: #544b40;
    }
  }
`;

export const CardField = styled.div`
  min-width: 0;
  padding: 14px 12px;
  background: var(--paper);
  border: 1px solid #c9bdae;
  border-radius: 8px;

  &:focus-within {
    border-color: #987c53;
    outline: 2px solid #987c53;
    outline-offset: 2px;
  }
`;
