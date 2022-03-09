import { useState } from "react";

import { modifyOneDoc } from "../utilities/firebase";

export default function Main({
  tasks,
  filterCat,
  renderTasks,
  setEditTaskId,
  showModal,
  setShowModal,
}) {
  const [category, setCategory] = useState("inbox");

  function handleCompleteTask(e) {
    let docId = e.currentTarget.dataset.id;
    modifyOneDoc(docId, { category: "completed" });
    renderTasks();

    // This is like edit task shortcut.
    //find task from task id
    //filter task from task array
    //modify category to complete - can do it directly in firebase
    //add to new array - not required if updating in firebase.
    //update in firebase
    //rerender from state or read from firebase again
  }

  function handleEditTask(e) {
    console.log("editTask");
    setShowModal(true);
    let docId = e.currentTarget.dataset.id;
    setEditTaskId(docId);

    //find task from task id
    let foundTask = tasks.filter((item) => item.id === docId);
    console.log(foundTask);
    //filter task from task array
    //render it in form. The Save button should keep the same id and overwrite the doc.
    //add to new array
    //update in firebase
    //rerender from state or read from firebase again
  }

  function handleDeleteTask(e) {
    console.log("delete task");
    let docId = e.currentTarget.dataset.id;
    modifyOneDoc(docId, { category: "deleted" });
    renderTasks();
    //find task from task id
    //filter task from task array
    //modify category to complete
    //update in firebase
    //rerender from state or read from firebase again
  }

  const taskArray = tasks;
  const renderArray = taskArray.filter((item) => item.category === filterCat);

  return (
    <main className="main">
      <button className="add-new-task-btn" onClick={(e) => setShowModal(true)}>
        Add new task
      </button>

      {renderArray.map((item) => {
        return (
          <div className="task-container">
            <div className="button-group">
              <button
                className="action-btn"
                data-id={item.id}
                onClick={handleCompleteTask}
              >
                <img src="/icons/complete.png" alt="complete icon" />
              </button>

              <button
                className="action-btn"
                data-id={item.id}
                onClick={handleEditTask}
              >
                <img src="/icons/edit.png" alt="edit icon" />
              </button>

              <button
                className="action-btn"
                data-id={item.id}
                onClick={handleDeleteTask}
              >
                <img src="/icons/delete.png" alt="delete icon" />
              </button>

              <button
                className="action-btn"
                data-id={item.id}
                onClick={handleEditTask}
              >
                <img src="/icons/move.png" alt="move icon" />
              </button>

              <button
                className="action-btn"
                title="schedule"
                aria-label="schedule"
                data-id={item.id}
                onClick={handleEditTask}
              >
                <img src="/icons/schedule.png" alt="schedule icon" />
              </button>
            </div>
            <p className="task">{item?.task}</p>
          </div>
        );
      })}
    </main>
  );
}
