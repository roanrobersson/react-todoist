import { useState } from "react";
import {
  MoreHoriz as MoreHorizIcon,
  BorderColorOutlined as BorderColorIcon,
} from "@mui/icons-material";
import {
  Divider,
  Box,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";

const TaskListItem = ({
  task,
  onTaskCheckToggle,
  onTaskClick,
  onTaskEditClick,
  onTaskOptionsClick,
}) => {
  const [checked, setChecked] = useState([0]);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

  const handleTaskCheckToggle = (taskId) => {
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    onTaskCheckToggle(taskId);
  };

  const handleTaskClick = (taskId) => {
    onTaskClick(taskId);
  };

  const handleTaskEditClick = (taskId) => {
    onTaskEditClick(taskId);
  };

  const handleTaskOptionsClick = (taskId) => {
    onTaskOptionsClick(taskId);
  };

  return (
    <Box
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
            <IconButton edge="end" sx={{ mr: 1 }} onClick={handleTaskEditClick}>
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
          <ListItemText primary={task.content} secondary={task.description} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </Box>
  );
};

export default TaskListItem;
