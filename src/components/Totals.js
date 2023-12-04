// components/Totals.js
import React from "react";
import { formatCurrency } from "../utils";
import styled from "styled-components";

const Totals = ({ records, type }) => {
  const total = records
    .filter((record) => record.type === type)
    .reduce((acc, record) => acc + parseFloat(record.value), 0);

  return (
    <TotalsContainer>
      <p>
        Total de {type === "income" ? "Entradas" : "Despesas"}:{" "}
        {formatCurrency(total.toFixed(2))}
      </p>
    </TotalsContainer>
  );
};

const TotalsContainer = styled.div`
  p {
    font-weight: bold;
  }
`;

export default Totals;
