import React, { useState } from "react";

const FinancialTracker = () => {
  // Estado para armazenar os registros
  const [records, setRecords] = useState([]);
  // Estado para armazenar os dados do novo registro
  const [newRecord, setNewRecord] = useState({
    name: "",
    value: "",
    type: "income", // Pode ser 'income' ou 'expense'
    paymentMethod: "cash", // Pode ser 'cash', 'card' ou 'pix'
  });

  // Função para adicionar um novo registro
  const addRecord = () => {
    // Validar se todos os campos estão preenchidos
    if (
      newRecord.name &&
      newRecord.value &&
      newRecord.type &&
      newRecord.paymentMethod
    ) {
      setRecords([...records, newRecord]);
      // Limpar os campos do novo registro
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

  // Função para excluir um registro
  const deleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {/* Coluna de Registro */}
      <div>
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

      {/* Coluna de Entradas */}
      <div>
        <h2>Entradas</h2>
        {records.map((record, index) =>
          record.type === "income" ? (
            <div key={index}>
              {record.name} - R${record.value} - {record.paymentMethod}
              <button onClick={() => deleteRecord(index)}>Excluir</button>
            </div>
          ) : null
        )}
      </div>

      {/* Coluna de Despesas */}
      <div>
        <h2>Despesas</h2>
        {records.map((record, index) =>
          record.type === "expense" ? (
            <div key={index}>
              {record.name} - R${record.value} - {record.paymentMethod}
              <button onClick={() => deleteRecord(index)}>Excluir</button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default FinancialTracker;
