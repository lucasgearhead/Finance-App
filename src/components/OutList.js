import "./style/view.css";

/**
 * Componente responsável por exibir uma lista de tarefas.
 *
 * Props:
 * - tasks: Array contendo as tarefas a serem exibidas.
 * - deleteTask: Função para excluir uma tarefa da lista.
 * - toggleComplete: Função para alternar o status de conclusão de uma tarefa.
 */
const TaskList = ({ tasks, deleteTask, toggleComplete }) => {
  return (
    <div className="cards center column">
      {tasks.map((task, index) => (
        <div key={index} className="row gap">
          <div className="card column">
            <p>
              <b>{task.task}</b>
            </p>
            <p>{task.description}</p>
          </div>
          <div className="column buttons gap">
            <div
              onClick={() => toggleComplete(index)}
              className="button"
              style={{
                backgroundColor: task.completed ? "green" : "red",
              }}
            >
              {task.completed ? "Desfazer" : "Feito"}
            </div>
            <div onClick={() => deleteTask(index)} className="button">
              Deletar
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
