import { useContext } from "react";
import { useDispatch } from "react-redux";
import { LeftMenuContext } from "@/providers/LeftMenuProvider";
import { Main } from "./styles";
import { Typography, Divider, Box } from "@mui/material";
import { useParams } from "react-router-dom";

const ProjectViewer = ({ project, tasks }) => {
  const { isOpen, setIsOpen } = useContext(LeftMenuContext);
  const dispatch = useDispatch();
  const { projectId: projectIdParam } = useParams();

  const normalizeProjectName = (projectName) => {
    return projectName == "Inbox" ? "Entrada" : projectName;
  };

  if (!project) return null;

  return (
    <Main open={isOpen}>
      <Typography paragraph variant="h6">
        {normalizeProjectName(project?.name)}
      </Typography>

      {tasks.map((task) => (
        <Box key={task.id}>
          <Typography paragraph>Título: {task.content}</Typography>
          <Typography paragraph>Descrição: {task.description}</Typography>
          <Divider />
        </Box>
      ))}

      <button onClick={() => localStorage.clear()}>Clear localStorage</button>
      {!project && <Typography>Nenhum projeto selecionado</Typography>}
    </Main>
  );
};

export default ProjectViewer;
