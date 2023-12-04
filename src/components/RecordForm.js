// components/RecordForm.js
import React, { useState } from "react";
import styled from "styled-components";

const RecordForm = ({ onAddRecord }) => {
  const [newRecord, setNewRecord] = useState({
    name: "",
    value: "",
    type: "income",
    paymentMethod: "cash",
  });

  const handleValueChange = (e) => {
    const inputValue = e.target.value;

    // Substitui a vírgula por ponto para permitir valores decimais
    const numericValue = inputValue.replace(/,/g, ".");

    // Verifica se a entrada corresponde ao formato desejado
    if (/^\d+(\.\d{0,2})?$/.test(numericValue)) {
      // Atualiza o estado
      setNewRecord({ ...newRecord, value: numericValue });
    } else {
      // Exibe um alerta se a entrada for inválida
      alert("Por favor, insira um número válido.");
    }
  };

  const handleInputChange = (field, value) => {
    setNewRecord({ ...newRecord, [field]: value });
  };

  const handleAddRecord = () => {
    if (
      newRecord.name &&
      newRecord.value &&
      newRecord.type &&
      newRecord.paymentMethod
    ) {
      onAddRecord(newRecord);
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

  return (
    <Form>
      <h2>Registrar</h2>
      <label>
        Nome:
        <input
          type="text"
          value={newRecord.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </label>
      <label>
        Valor:
        <input
          type="text"
          value={newRecord.value}
          onChange={handleValueChange}
          placeholder="0,00"
        />
      </label>
      <label>
        Tipo:
        <select
          value={newRecord.type}
          onChange={(e) => handleInputChange("type", e.target.value)}
        >
          <option value="income">Entrada</option>
          <option value="expense">Despesa</option>
        </select>
      </label>
      <label>
        Método de pagamento:
        <select
          value={newRecord.paymentMethod}
          onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
        >
          <option value="cash">Dinheiro</option>
          <option value="card">Cartão</option>
          <option value="pix">PIX</option>
        </select>
      </label>
      <button onClick={handleAddRecord}>Adicionar</button>
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50vh;

  h2 {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 10px;
    width: 80%;

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

export default RecordForm;
