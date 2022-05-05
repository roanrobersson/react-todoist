import { useContext, useEffect, useState } from "react";
import { LeftMenuContext } from "@/providers/LeftMenuProvider";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styles";
import TaskList from "@/components/TaskList";
import TaskListItem from "@/components/TaskListItem";
import TaskSnackBar from "@/components/TaskSnackBar";
import TaskOptionsMenu from "@/components/TaskOptionsMenu";
import TaskEditor from "@/components/TaskEditor";
import { Typography, Container, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  CLOSE_TASK,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  REOPEN_TASK,
} from "@/state/slices/tasksSlice";

const ProjectViewer = () => {
  const { isOpen, setIsOpen } = useContext(LeftMenuContext);
  const dispatch = useDispatch();
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [taskOptionsMenuAnchorEl, setTaskOptionsMenuAnchorEl] = useState(null);
  const [taskOptionsMenuTaskId, setTaskOptionsMenuTaskId] = useState(0);
  const isTaskOptionsMenuOpen = Boolean(taskOptionsMenuAnchorEl);
  const [taskEditorType, setTaskEditorType] = useState(null);
  const [taskEditorInitialData, setTaskEditorInitialData] = useState(null);
  const selectedProjectId = useSelector(
    (state) => state.projects.selectedProjectId
  );
  const selectedProject = useSelector((state) => state.projects.data).find(
    (project) => project.id == selectedProjectId
  );
  const tasks = useSelector((state) => state.tasks.data).filter(
    (task) => task.projectId == selectedProjectId
  );
  const lastClosedTaskId = useSelector((state) => state.tasks.lastClosedTaskId);

  const findTaskById = (taskId) => {
    return tasks.find((task) => task.id == taskId);
  };

  useEffect(() => {
    if (lastClosedTaskId != null) {
      setIsSnackBarOpen(true);
    }
  }, [lastClosedTaskId]);

  const normalizeProjectName = (projectName) => {
    return projectName == "Inbox" ? "Entrada" : projectName;
  };

  const handleTaskCheckToggle = (taskId) => {
    dispatch(CLOSE_TASK(taskId));
  };

  const handleTaskClick = (taskId) => {
    //
  };

  const handleTaskEditClick = (taskId) => {
    setTaskEditorType("edit");
    setTaskEditorInitialData(findTaskById(taskId));
  };

  const handleTaskOptionsClick = (event, taskId) => {
    setTaskOptionsMenuAnchorEl(event.currentTarget);
    setTaskOptionsMenuTaskId(taskId);
  };

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleSnackBarUndo = () => {
    dispatch(REOPEN_TASK(lastClosedTaskId));
  };

  const handleTaskMenuClose = () => {
    setTaskOptionsMenuAnchorEl(null);
  };

  const handleTaskMenuClipboardClick = (taskId) => {
    //
  };

  const handleTaskMenuDeleteClick = (taskId) => {
    dispatch(DELETE_TASK(taskId));
  };

  const handleAddTaskClick = () => {
    setTaskEditorType("add");
  };

  const handleTaskEditorCancel = () => {
    setTaskEditorType(null);
  };

  const handleTaskEditorSubmit = (task) => {
    if (taskEditorType == "add") {
      task.project_id = selectedProjectId;
      dispatch(ADD_TASK(task));
    }
    else dispatch(UPDATE_TASK(task));
    setTaskEditorType(null);
    setTaskEditorInitialData(findTaskById(null));
  };

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
            .map((task) => {
              return taskEditorType === "edit" &&
                task.id === taskEditorInitialData?.id ? (
                <TaskEditor
                  key={task.id}
                  initialData={taskEditorInitialData}
                  cancelButtonText="Cancelar"
                  confirmButtonText="Salvar"
                  onCancel={handleTaskEditorCancel}
                  onSubmit={handleTaskEditorSubmit}
                />
              ) : (
                <TaskListItem
                  key={task.id}
                  task={task}
                  onCheckToggle={handleTaskCheckToggle}
                  onClick={handleTaskClick}
                  onEditClick={handleTaskEditClick}
                  onOptionsClick={handleTaskOptionsClick}
                />
              );
            })}
        </TaskList>

        {taskEditorType === "add" ? (
          <TaskEditor
            initialData={taskEditorInitialData}
            cancelButtonText="Cancelar"
            confirmButtonText="Salvar"
            onCancel={handleTaskEditorCancel}
            onSubmit={handleTaskEditorSubmit}
          />
        ) : (
          <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={handleAddTaskClick}
          >
            Adicionar tarefa
          </Button>
        )}

        <TaskOptionsMenu
          isOpen={isTaskOptionsMenuOpen}
          anchorEl={taskOptionsMenuAnchorEl}
          taskId={taskOptionsMenuTaskId}
          onClose={handleTaskMenuClose}
          onDeleteClick={handleTaskMenuDeleteClick}
          onCopyToClipboardClick={handleTaskMenuClipboardClick}
        />

        {!selectedProject && (
          <Typography>Nenhum projeto selecionado</Typography>
        )}
      </Main>

      <TaskSnackBar
        isOpen={isSnackBarOpen}
        onClose={handleSnackBarClose}
        onUndo={handleSnackBarUndo}
      />
    </Container>
  );
};

export default ProjectViewer;
