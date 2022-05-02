import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_SELECTED_PROJECT } from "@/state/slices/projectsSlice.js";
import TopBar from "@/components/TopBar";
import LeftMenu from "@/components/LeftMenu";
import ProjectViewer from "@/components/ProjectViewer";
import LeftMenuProvider from "@/providers/LeftMenuProvider";
import { Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.data);
  const tasks = useSelector((state) => state.tasks.data);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const dispatch = useDispatch();
  const { projectId: projectIdParam } = useParams();

  const handleProjectItemClick = (project) => {
    navigate("/app/projects/" + project.id); // arrumar isso aqui!!!!!!!!!!!!!
    dispatch(TOGGLE_SELECTED_PROJECT(project));
  };

  const getProjectById = (id) => {
    return projects.find((project) => project.id == id);
  };

  useEffect(() => {
    if (projectIdParam == undefined) return;
    const project = getProjectById(projectIdParam);
    if (projectIdParam && project) TOGGLE_SELECTED_PROJECT(project);
  }, [projectIdParam]);

  const tasksOfSelectedProject = () => {
    return tasks.filter((task) => task.projectId == projectIdParam);
  };

  return (
    <>
      <LeftMenuProvider>
        <TopBar />
        <Box sx={{ display: "flex" }}>
          <LeftMenu
            projects={projects}
            onProjectItemClick={handleProjectItemClick}
          />
          <ProjectViewer
            project={selectedProject}
            tasks={tasksOfSelectedProject()}
          />
        </Box>
      </LeftMenuProvider>
    </>
  );
};

export default Home;
