import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.div`
  h2 {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 10px;

    input,
    select {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
    }
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const RecordsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    margin-top: -1px;
    padding: 10px;
    position: relative;
    display: flex;
    justify-content: space-between;

    button {
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #cc0000;
      }
    }
  }
`;

const Totals = styled.div`
  margin-top: 20px;
  p {
    font-weight: bold;
  }
`;

const WalletBalance = styled.div`
  h2 {
    margin-bottom: 10px;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => (props.balance >= 0 ? "green" : "red")};
  }
`;

const FinancialTracker = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    name: "",
    value: "",
    type: "income",
    paymentMethod: "cash",
  });
  const [walletBalance, setWalletBalance] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

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
        setIncomeTotal(incomeTotal);

        const expenseTotal = records
          .filter((record) => record.type === "expense")
          .reduce((acc, record) => acc + parseFloat(record.value), 0);
        setExpenseTotal(expenseTotal);

        const newBalance = incomeTotal - expenseTotal;
        setWalletBalance(newBalance);
      };

      calculateTotals();
      localStorage.setItem("financialRecords", JSON.stringify(records));
    }, 0);
  }, [records]);

  const addRecord = () => {
    if (
      newRecord.name &&
      newRecord.value &&
      newRecord.type &&
      newRecord.paymentMethod
    ) {
      setRecords([...records, newRecord]);
      setNewRecord({
        name: "",
        value: "",
        type: "income",
        paymentMethod: "cash",
      });
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const deleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  return (
    <Wrapper>
      <Column>
        <Form>
          <h2>Registrar</h2>
          <label>
            Nome:
            <input
              type="text"
              value={newRecord.name}
              onChange={(e) =>
                setNewRecord({ ...newRecord, name: e.target.value })
              }
            />
          </label>
          <label>
            Valor:
            <input
              type="number"
              value={newRecord.value}
              onChange={(e) =>
                setNewRecord({ ...newRecord, value: e.target.value })
              }
            />
          </label>
          <label>
            Tipo:
            <select
              value={newRecord.type}
              onChange={(e) =>
                setNewRecord({ ...newRecord, type: e.target.value })
              }
            >
              <option value="income">Entrada</option>
              <option value="expense">Despesa</option>
            </select>
          </label>
          <label>
            Pago por:
            <select
              value={newRecord.paymentMethod}
              onChange={(e) =>
                setNewRecord({ ...newRecord, paymentMethod: e.target.value })
              }
            >
              <option value="cash">Dinheiro</option>
              <option value="card">Cartão</option>
              <option value="pix">PIX</option>
            </select>
          </label>
          <button onClick={addRecord}>Adicionar</button>
        </Form>
      </Column>

      <Column>
        <h2>Entradas</h2>
        <RecordsList>
          {records.map((record, index) =>
            record.type === "income" ? (
              <li key={index}>
                {record.name} - R${record.value} - {record.paymentMethod}
                <button onClick={() => deleteRecord(index)}>Excluir</button>
              </li>
            ) : null
          )}
        </RecordsList>
        <Totals>
          <p>Total de Entradas: R${incomeTotal}</p>
        </Totals>
      </Column>

      <Column>
        <h2>Despesas</h2>
        <RecordsList>
          {records.map((record, index) =>
            record.type === "expense" ? (
              <li key={index}>
                {record.name} - R${record.value} - {record.paymentMethod}
                <button onClick={() => deleteRecord(index)}>Excluir</button>
              </li>
            ) : null
          )}
        </RecordsList>
        <Totals>
          <p>Total de Despesas: R${expenseTotal}</p>
        </Totals>
      </Column>

      <Column>
        <WalletBalance balance={walletBalance}>
          <h2>Saldo em Carteira</h2>
          <p>R${walletBalance}</p>
        </WalletBalance>
      </Column>
    </Wrapper>
  );
};

export default FinancialTracker;
