import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_PROJECTS, SET_PROJECTS } from "@/state/slices/projectsSlice.js";

const Home = () => {
  const projects = useSelector((state) => state.projects.data);
  const dispatch = useDispatch();

  const handleFetchProjects = () => {
    dispatch(FETCH_PROJECTS());
  };

  return (
    <>
      {projects.map((project) => (
        <p key={project.id}>{project.name}</p>
      ))}
      HOME
      <button onClick={handleFetchProjects}>Fetch projects</button>
    </>
  );
};

export default Home;
