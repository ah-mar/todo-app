import { useState } from "react";

export default function Sidebar({ setFilterCat, projects, setProjects }) {
  const [newProject, setNewProject] = useState("");

  function handleAddProjectSubmit(e) {
    e.preventDefault();
    console.log(newProject);
  }

  return (
    <sidebar className="sidebar">
      <div className="categories">
        <h3 className="category-title">Categories</h3>
        <button className="category-btn" onClick={() => setFilterCat("inbox")}>
          Inbox
        </button>
        <button className="category-btn" onClick={() => setFilterCat("next")}>
          Next Actions
        </button>
        <button
          className="category-btn"
          onClick={() => setFilterCat("waiting")}
        >
          Waiting
        </button>
        <button
          className="category-btn"
          onClick={() => setFilterCat("someday")}
        >
          Someday
        </button>
        <button
          className="category-btn"
          onClick={() => setFilterCat("archive")}
        >
          Archive
        </button>
        <button
          className="category-btn"
          onClick={() => setFilterCat("completed")}
        >
          Completed
        </button>
        <button
          className="category-btn"
          onClick={() => setFilterCat("deleted")}
        >
          Deleted
        </button>
      </div>
      <br />
      <div className="projects">
        <h3 className="project-title">Projects</h3>
        <form className="add-project-form" onSubmit={handleAddProjectSubmit}>
          <input
            className="add-project-input"
            type="text"
            placeholder="Not functional yet"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <button type="submit" className="add-project-button">
            Add Project
          </button>
        </form>
        {projects.map((item) => (
          <button className="project-btn">{item.name}</button>
        ))}
      </div>
    </sidebar>
  );
}

// In project , give a add project button
// Add project add to a list state variable projects array
//this array should be mapped and rendered
//the same array will be used in add project form and this will be option
//How to store project array- make a new collection - have project names and have tasks inside them
// projects collection will have list file and it will have list of projects-just one doc.
// or store all project name inside each file- each time you add, you have to update all files.
//set functions up for add project, delete project, read project, edit project
// have another variable to setFilterProjects, convert all to buttons and let this filter based on project
// You can do similarly for tags
