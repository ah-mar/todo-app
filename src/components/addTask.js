import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addOneDoc } from "../utilities/firebase";

function AddTask(props) {
  const [text, setText] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("work");
  const [schedule, setSchedule] = useState(null);
  const [category, setCategory] = useState("inbox");
  const [project, setProject] = useState("");

  console.log("schedule", schedule);

  const {
    tasks,
    setTasks,
    editTaskId,
    setEditTaskId,
    renderTasks,
    showModal,
    setShowModal,
    projects,
  } = props;

  function handleFormSubmit(e) {
    e.preventDefault();

    //Create form Object
    let docId = editTaskId || uuidv4();
    let dataObj = {
      tags: tags.split(",").map((item) => item.trim()),
      date: schedule,
      category: category,
      createdOn: Date(),
      note: note,
      userId: "007",
      project: project || "default",
      id: docId,
      task: text,
    };

    console.log(dataObj);
    //add to firebase
    addOneDoc(docId, dataObj).then(() => {
      //render the data
      renderTasks();

      //Clear the form
      //Clear the editTaskId
      setText("");
      setNote("");
      setCategory("inbox");
      setTags("work");
      setProject("None");
      setSchedule("");
      setEditTaskId("");
      //hide modal
      setShowModal(false);
    });
  }

  useEffect(() => {
    // when it render first, editTaskid will be undefined.
    // When edit button clicked, it will be deined.
    //if it is defined, find the task
    //set all state variable equal to task variable
    //save button should reset the form
    console.log("useEffecting", editTaskId);
    if (editTaskId) {
      let filteredtask = tasks.find((item) => item.id === editTaskId);
      console.log("filteredtask =>", filteredtask);
      console.log(filteredtask.task);
      setText(filteredtask.task);
      setNote(filteredtask.note);
      setCategory(filteredtask.category);
      setTags(filteredtask.tags.join(","));
      setProject(filteredtask.project);
      setSchedule(filteredtask.date);
    }
  }, [editTaskId]);

  return (
    showModal && (
      <div className="modal">
        <form className="add-task-form" onSubmit={handleFormSubmit}>
          <h3 className="form-header">Add new task</h3>
          <div className="form-control">
            <label htmlFor="text">Name</label>
            <input
              id="text"
              className="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="notes">Notes</label>
            <input
              id="notes"
              className="notes"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              className="tags"
              type="text"
              value={tags}
              onChange={(e) => {
                //   let tagsArray = e.target.value.split(",")
                //   let newTagSArray = tagsArray.map(tag => tag.trim())
                setTags(e.target.value);
              }}
            />
          </div>

          <div className="form-control">
            <label htmlFor="schedule">Schedule</label>
            <input
              id="schedule"
              className="schedule"
              type="date"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>inbox</option>
              <option>next action</option>
              <option>waiting</option>
              <option>someday</option>
              <option>archive</option>
              <option>deleted</option>
              <option>completed</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="project">Project</label>
            <select
              id="project"
              className="form-category"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              {projects.map((item) => (
                <option>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="form-control form-buttons-group">
            <button className="task-button" type="submit">
              Save
            </button>
            <button
              className="task-button"
              type="button"
              onClick={(e) => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default AddTask;
