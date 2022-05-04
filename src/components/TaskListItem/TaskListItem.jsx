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
  onCheckToggle,
  onClick,
  onEditClick,
  onOptionsClick,
}) => {
  const [checked, setChecked] = useState([0]);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

  const handleCheckToggle = (taskId) => {
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    onCheckToggle(taskId);
  };

  const handleClick = (taskId) => {
    onClick(taskId);
  };

  const handleEditClick = (taskId) => {
    onEditClick(taskId);
  };

  const handleOptionsClick = (taskId) => {
    onOptionsClick(taskId);
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
            <IconButton edge="end" sx={{ mr: 1 }} onClick={handleEditClick}>
              <BorderColorIcon />
            </IconButton>
            <IconButton edge="end" onClick={handleOptionsClick}>
              <MoreHorizIcon />
            </IconButton>
          </Box>
        }
      >
        <Checkbox
          edge="start"
          checked={checked.indexOf(task.id) !== -1}
          onClick={() => handleCheckToggle(task.id)}
          disableRipple
        />
        <ListItemButton
          dense
          onClick={handleClick}
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
