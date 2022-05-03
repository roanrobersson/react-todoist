import { useContext, useState } from "react";
import { LeftMenuContext } from "@/providers/LeftMenuProvider";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styles";
import { CLOSE_TASK } from "@/state/slices/tasksSlice";
import {
  MoreHoriz as MoreHorizIcon,
  BorderColorOutlined as BorderColorIcon,
} from "@mui/icons-material";
import {
  Typography,
  Divider,
  Box,
  Checkbox,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";

const ProjectViewer = () => {
  const { isOpen, setIsOpen } = useContext(LeftMenuContext);
  const [checked, setChecked] = useState([0]);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const dispatch = useDispatch();
  const selectedProjectId = useSelector(
    (state) => state.projects.selectedProjectId
  );
  const selectedProject = useSelector((state) => state.projects.data).find(
    (project) => project.id == selectedProjectId
  );
  const tasks = useSelector((state) => state.tasks.data).filter(
    (task) => task.projectId == selectedProjectId
  );

  const normalizeProjectName = (projectName) => {
    return projectName == "Inbox" ? "Entrada" : projectName;
  };

  const handleTaskCheckToggle = (taskId) => {
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    dispatch(CLOSE_TASK(taskId));
  };

  const handleTaskClick = (taskId) => {};

  const handleTaskEditClick = (taskId) => {};

  const handleTaskOptionsClick = (taskId) => {};

  if (!selectedProject) return null;

  return (
    <Container>
      <Main open={isOpen} sx={{ pt: 4, px: 7 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {normalizeProjectName(selectedProject?.name)}
        </Typography>

        <List sx={{ width: "100%" }}>
          {tasks
            .sort((a, b) => a.order > b.order)
            .map((task) => (
              <Box
                key={task.id}
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
              >
                <ListItem
                  disablePadding
                  secondaryAction={
                    <Box
                      sx={{
                        color: "gray",
                        ...(hoveredTaskId != task.id && {
                          visibility: "hidden",
                        }),
                      }}
                    >
                      <IconButton
                        edge="end"
                        sx={{ mr: 1 }}
                        onClick={handleTaskEditClick}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={handleTaskOptionsClick}>
                        <MoreHorizIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(task.id) !== -1}
                    onClick={() => handleTaskCheckToggle(task.id)}
                    disableRipple
                  />
                  <ListItemButton
                    dense
                    onClick={handleTaskClick}
                    sx={{
                      "&.MuiListItemButton-root:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <ListItemText
                      primary={task.content}
                      secondary={task.description}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            ))}
        </List>

        {!selectedProject && (
          <Typography>Nenhum projeto selecionado</Typography>
        )}
      </Main>
    </Container>
  );
};

export default ProjectViewer;
