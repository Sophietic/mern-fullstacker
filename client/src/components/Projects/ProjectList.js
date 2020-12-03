import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ProjectService from "../../services/project-service";

import AddProjectForm from "./Forms/AddProjectForm";

const ProjectList = () => {
  const [listOfProjects, setListOfProjects] = useState([]);

  // Function to help get all projects from the backend
  const getAllProjects = () => {
    const service = new ProjectService();

    service
      .getProjects()
      .then((responseFromApi) => {
        setListOfProjects(responseFromApi.data);
      })
      .catch((error) => console.error(error));
  };

  // useEffect to mimic the side effects of componentDidMount().
  // Because we are using functional components, useEffects are the way to go for us.
  useEffect(getAllProjects, []);

  return (
    <div>
      <div style={{ width: "60%", float: "left" }}>
        <h2>Projects from the Backend</h2>
        {listOfProjects
          ? listOfProjects.map((project) => {
              return (
                <div key={project._id} className="projects-list">
                  <Link to={`/projects/${project._id}`}>
                    <h3>{project.title}</h3>
                  </Link>
                  <p>{project.description} </p>
                </div>
              );
            })
          : `Loading...`}
      </div>
      <div style={{ width: "40%", float: "right" }}>
        <AddProjectForm getData={getAllProjects} />
      </div>
    </div>
  );
};

export default ProjectList;
