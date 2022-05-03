import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "@/components/TopBar";
import LeftMenu from "@/components/LeftMenu";
import ProjectViewer from "@/components/ProjectViewer";
import LeftMenuProvider from "@/providers/LeftMenuProvider";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ProjectModal from "@/components/ProjectModal";
import {
  TOGGLE_SELECTED_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "@/state/slices/projectsSlice.js";

const Home = () => {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.data);
  const inboxProject = useSelector((state) => state.projects.inboxProject);
  const tasks = useSelector((state) => state.tasks.data);
  const dispatch = useDispatch();
  const { projectId: projectIdParam } = useParams();
  const [projectModalType, setProjectModalType] = useState(null);
  const [projectModalInitialData, setProjectModalInitialData] = useState(null);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  const findProjectById = (projectId) => {
    return projects.find((project) => project.id == projectId);
  };

  const handleMenuProjectItemClick = (project) => {
    navigate("/app/projects/" + project.id);
    dispatch(TOGGLE_SELECTED_PROJECT(project.id));
  };

  const handleMenuAddProjectClick = () => {
    setProjectModalInitialData(null);
    setProjectModalType("add");
  };

  const handleProjectModalCancel = () => {
    setProjectModalType(null);
  };

  const handleProjectModalSubmit = (project) => {
    if (projectModalType == "add") dispatch(ADD_PROJECT(project));
    else dispatch(UPDATE_PROJECT(project));
    setProjectModalType(null);
  };

  const handleEditProjectClick = (projectId) => {
    setProjectModalInitialData(findProjectById(projectId));
    setProjectModalType("edit");
  };

  const handleDeleteProjectClick = (projectId) => {
    dispatch(DELETE_PROJECT(projectId));
  };

  const getProjectById = (id) => {
    return projects.find((project) => project.id == id);
  };

  const tasksOfSelectedProject = () => {
    return tasks.filter((task) => task.projectId == projectIdParam);
  };

  useEffect(() => {
    if (inboxProject != null && projectIdParam == undefined) {
      dispatch(TOGGLE_SELECTED_PROJECT(inboxProject.id));
      return;
    }
    if (projectIdParam != undefined && getProjectById(projectIdParam) != null) {
      dispatch(TOGGLE_SELECTED_PROJECT(projectIdParam));
    }
  }, [projectIdParam, inboxProject]);

  useEffect(() => {
    selectedProject && navigate("/app/projects/" + selectedProject.id);
  }, [selectedProject]);

  return (
    <>
      <LeftMenuProvider>
        <TopBar />
        <Box sx={{ display: "flex" }}>
          <LeftMenu
            projects={projects}
            onProjectItemClick={handleMenuProjectItemClick}
            onAddProjectClick={handleMenuAddProjectClick}
            onEditProjectClick={handleEditProjectClick}
            onDeleteProjectClick={handleDeleteProjectClick}
          />
          <ProjectViewer
            project={selectedProject}
            tasks={tasksOfSelectedProject()}
          />
        </Box>
      </LeftMenuProvider>
      {projectModalType && (
        <ProjectModal
          isOpen={projectModalType != null}
          title={
            projectModalType == "add" ? "Adicionar projeto" : "Editar projeto"
          }
          onCancel={handleProjectModalCancel}
          onSubmit={handleProjectModalSubmit}
          initialData={projectModalInitialData}
          cancelButtonText="Cancelar"
          confirmButtonText={projectModalType == "add" ? "Adicionar" : "Editar"}
        />
      )}
    </>
  );
};

export default Home;
