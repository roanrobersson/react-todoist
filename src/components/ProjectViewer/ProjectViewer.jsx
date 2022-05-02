import { useContext } from "react";
import { useDispatch } from "react-redux";
import { LeftMenuContext } from "@/providers/LeftMenuProvider";
import { Main } from "./styles";
import { Typography, Divider, Box, Checkbox, Container } from "@mui/material";
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
    <Container>
      <Main open={isOpen} sx={{ pt: 4, px: 7 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {normalizeProjectName(project?.name)}
        </Typography>

        {tasks.map((task) => (
          <Box key={task.id}>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Checkbox />
              </Box>
              <Box sx={{ py: 1 }}>
                <Typography variant="body2" sx={{ mb: 0 }}>
                  Título: {task.content}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "500px",
                  }}
                >
                  Descrição: {task.description}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}

        {!project && <Typography>Nenhum projeto selecionado</Typography>}
      </Main>
    </Container>
  );
};

export default ProjectViewer;
