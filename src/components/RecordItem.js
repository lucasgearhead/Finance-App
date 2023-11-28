// components/RecordItem.js
import React from "react";
import { formatCurrency, getPaymentMethodInfo } from "../utils";
import styled from "styled-components";

const RecordItem = ({ record, onDeleteRecord }) => (
  <ListItem>
    {formatCurrency(record.value)} - {record.name} -{" "}
    {getPaymentMethodInfo(record.paymentMethod).name}{" "}
    {getPaymentMethodInfo(record.paymentMethod).icon}
    <DeleteButton onClick={onDeleteRecord}>Excluir</DeleteButton>
  </ListItem>
);

const ListItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-top: -1px;
  padding: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

export default RecordItem;
