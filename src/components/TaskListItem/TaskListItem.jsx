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
  Tooltip,
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

  const handleCheckToggle = () => {
    const currentIndex = checked.indexOf(task.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(task.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    onCheckToggle(task.id);
  };

  const handleClick = () => {
    onClick(task.id);
  };

  const handleEditClick = () => {
    onEditClick(task.id);
  };

  const handleOptionsClick = (event) => {
    event.stopPropagation();
    onOptionsClick(event, task.id);
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
            <Tooltip title="Editar tarefa">
              <IconButton edge="end" sx={{ mr: 1 }} onClick={handleEditClick}>
                <BorderColorIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mais opções da tarefa">
              <IconButton edge="end" onClick={handleOptionsClick}>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          </Box>
        }
      >
        <Checkbox
          edge="start"
          checked={checked.indexOf(task.id) !== -1}
          onClick={handleCheckToggle}
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
          <ListItemText
            primary={task.content}
            secondary={task.description}
            sx={{ pr: 7 }}
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </Box>
  );
};

export default TaskListItem;
