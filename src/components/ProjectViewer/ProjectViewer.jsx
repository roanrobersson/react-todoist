import { useContext, useState } from "react";
import { LeftMenuContext } from "@/providers/LeftMenuProvider";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styles";
import { CLOSE_TASK } from "@/state/slices/tasksSlice";
import TaskList from "@/components/TaskList";
import TaskListItem from "@/components/TaskListItem";
import { Typography, Container } from "@mui/material";

const ProjectViewer = () => {
  const { isOpen, setIsOpen } = useContext(LeftMenuContext);
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

        <TaskList>
          {tasks
            .sort((a, b) => a.order > b.order)
            .map((task) => (
              <TaskListItem
                key={task.id}
                task={task}
                onTaskCheckToggle={handleTaskCheckToggle}
                onTaskClick={handleTaskClick}
                onTaskEditClick={handleTaskEditClick}
                onTaskOptionsClick={handleTaskOptionsClick}
              />
            ))}
        </TaskList>

        {!selectedProject && (
          <Typography>Nenhum projeto selecionado</Typography>
        )}
      </Main>
    </Container>
  );
};

export default ProjectViewer;
