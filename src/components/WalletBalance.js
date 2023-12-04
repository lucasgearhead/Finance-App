// components/WalletBalance.js
import React from "react";
import { formatCurrency } from "../utils";
import styled from "styled-components";

const WalletBalance = ({ balance }) => (
  <BalanceContainer>
    <h2>Saldo em Carteira</h2>
    <p
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        color: balance >= 0 ? "green" : "red",
      }}
    >
      {formatCurrency(balance.toFixed(2))}
    </p>
  </BalanceContainer>
);

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;

  h2 {
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }
`;

export default WalletBalance;
