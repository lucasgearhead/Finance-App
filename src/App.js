import React, { useState, useEffect } from "react";

const FinancialTracker = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    name: "",
    value: "",
    type: "income",
    paymentMethod: "cash",
  });

  useEffect(() => {
    // Carregar registros do localStorage ao montar o componente
    const storedRecords =
      JSON.parse(localStorage.getItem("financialRecords")) || [];
    setRecords(storedRecords);
  }, []);

  useEffect(() => {
    // Atualizar localStorage sempre que o estado de registros for alterado
    localStorage.setItem("financialRecords", JSON.stringify(records));
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

  const calculateTotal = (type) => {
    return records
      .filter((record) => record.type === type)
      .reduce((total, record) => total + parseFloat(record.value), 0)
      .toFixed(2);
  };

  const totalIncome = calculateTotal("income");
  const totalExpense = calculateTotal("expense");
  const walletBalance = (totalIncome - totalExpense).toFixed(2);
  const balanceColor = walletBalance >= 0 ? "green" : "red";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ borderRight: "1px solid #ccc", padding: "10px" }}>
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
        <br />
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
        <br />
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
        <br />
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
        <br />
        <button onClick={addRecord}>Adicionar</button>
      </div>

      <div style={{ padding: "10px" }}>
        <h2>Entradas</h2>
        {records.map((record, index) =>
          record.type === "income" ? (
            <div key={index}>
              {record.name} - R${record.value} - {record.paymentMethod}
              <button onClick={() => deleteRecord(index)}>Excluir</button>
            </div>
          ) : null
        )}
        <div>Total de Entradas: R${totalIncome}</div>
      </div>

      <div style={{ paddingLeft: "10px" }}>
        <h2>Despesas</h2>
        {records.map((record, index) =>
          record.type === "expense" ? (
            <div key={index}>
              {record.name} - R${record.value} - {record.paymentMethod}
              <button onClick={() => deleteRecord(index)}>Excluir</button>
            </div>
          ) : null
        )}
        <div>Total de Despesas: R${totalExpense}</div>
      </div>

      <div style={{ marginLeft: "10px", padding: "10px" }}>
        <h2>Saldo</h2>
        <div
          style={{ color: balanceColor, fontSize: "20px", fontWeight: "bold" }}
        >
          R${walletBalance}
        </div>
      </div>
    </div>
  );
};

export default FinancialTracker;
