import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "@/components/TopBar";
import LeftMenu from "@/components/LeftMenu";
import ProjectViewer from "@/components/ProjectViewer";
import LeftMenuProvider from "@/providers/LeftMenuProvider";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ProjectEditorModal from "@/components/ProjectEditorModal";
import {
  TOGGLE_SELECTED_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "@/state/slices/projectsSlice.js";

const Home = () => {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.data);
  const inboxProjectId = useSelector((state) => state.projects.inboxProjectId);
  const dispatch = useDispatch();
  const { projectId: projectIdParam } = useParams();
  const [projectModalType, setProjectModalType] = useState(null);
  const [projectModalInitialData, setProjectModalInitialData] = useState(null);
  const selectedProjectId = useSelector(
    (state) => state.projects.selectedProjectId
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
    setProjectModalInitialData(null);
  };

  const handleEditProjectClick = (projectId) => {
    setProjectModalInitialData(findProjectById(projectId));
    setProjectModalType("edit");
  };

  const handleDeleteProjectClick = (projectId) => {
    dispatch(DELETE_PROJECT(projectId));
  };

  useEffect(() => {
    if (inboxProjectId != null && projectIdParam == undefined) {
      dispatch(TOGGLE_SELECTED_PROJECT(inboxProjectId));
      return;
    }
    if (projectIdParam != undefined && findProjectById(projectIdParam) != null) {
      dispatch(TOGGLE_SELECTED_PROJECT(projectIdParam));
    }
  }, [projectIdParam, inboxProjectId]);

  useEffect(() => {
    selectedProjectId && navigate("/app/projects/" + selectedProjectId);
  }, [selectedProjectId]);

  return (
    <>
      <LeftMenuProvider>
        <TopBar />
        <Box sx={{ display: "flex" }}>
          <LeftMenu
            projects={projects}
            selectedProjectId={selectedProjectId}
            onProjectItemClick={handleMenuProjectItemClick}
            onAddProjectClick={handleMenuAddProjectClick}
            onEditProjectClick={handleEditProjectClick}
            onDeleteProjectClick={handleDeleteProjectClick}
          />

          <ProjectViewer />
        </Box>
      </LeftMenuProvider>
      {projectModalType && (
        <ProjectEditorModal
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
