// FinancialTracker.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RecordForm from "./components/RecordForm";
import RecordsList from "./components/RecordsList";
import Totals from "./components/Totals";
import WalletBalance from "./components/WalletBalance";

const FinancialTracker = () => {
  const [records, setRecords] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const storedRecords =
      JSON.parse(localStorage.getItem("financialRecords")) || [];
    setRecords(storedRecords);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const calculateTotals = () => {
        const incomeTotal = records
          .filter((record) => record.type === "income")
          .reduce((acc, record) => acc + parseFloat(record.value), 0);

        const expenseTotal = records
          .filter((record) => record.type === "expense")
          .reduce((acc, record) => acc + parseFloat(record.value), 0);

        const newBalance = incomeTotal - expenseTotal;
        setWalletBalance(newBalance);
      };

      calculateTotals();
      localStorage.setItem("financialRecords", JSON.stringify(records));
    }, 0);
  }, [records]);

  const addRecord = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  const deleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  return (
    <Wrapper>
      <Column className="record">
        <RecordForm onAddRecord={addRecord} />
        <WalletBalance balance={walletBalance} />
      </Column>

      <Column>
        <h2>Entradas</h2>
        <RecordsList
          records={records}
          onDeleteRecord={deleteRecord}
          type="income"
        />
        <Totals records={records} type="income" />
      </Column>

      <Column>
        <h2>Despesas</h2>
        <RecordsList
          records={records}
          onDeleteRecord={deleteRecord}
          type="expense"
        />
        <Totals records={records} type="expense" />
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  &:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
  }
`;

export default FinancialTracker;
