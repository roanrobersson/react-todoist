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
  const { projectId } = useParams();

  const handleProjectItemClick = (project) => {
    navigate("/app/projects/" + project.id); // arrumar isso aqui!!!!!!!!!!!!!
    dispatch(TOGGLE_SELECTED_PROJECT(project));
  };

  const tasksOfSelectedProject = () => {
    return tasks.filter((task) => task.projectId == projectId);
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
