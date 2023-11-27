import React, { useState } from "react";
import "./style/add.css";
import Image from "../logoTodo.png";

/**
 * Componente responsável por adicionar uma nova tarefa à lista.
 *
 * Props:
 * - addTask: Função para adicionar uma nova tarefa à lista.
 */
const AddTask = ({ addTask }) => {
  const [task, setTask] = useState(""); // Estado para armazenar o nome da tarefa
  const [description, setDescription] = useState(""); // Estado para armazenar a descrição da tarefa

  /**
   * Manipula o evento de adicionar tarefa à lista.
   * Verifica se a tarefa não está vazia antes de adicionar.
   */
  const handleAddTask = () => {
    if (task !== "") {
      addTask({ task, description, completed: false });
      setTask("");
      setDescription("");
    }
  };

  return (
    <div className="center column gap">
      <div className="inputs">
        <div>
          <p className="">Nome:</p>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div>
          <p>Descrição:</p>
          <textarea
            className="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <button className="buttonAdd" onClick={handleAddTask}>
        Adicionar
      </button>
      <img src={Image} className="image" />
    </div>
  );
};

export default AddTask;
