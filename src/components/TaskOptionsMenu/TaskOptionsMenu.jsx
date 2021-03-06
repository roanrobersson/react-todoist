import ListItemIcon from "@mui/material/ListItemIcon";
import { Divider, ListItemText, Menu, MenuItem } from "@mui/material";
import {
  Link as LinkIcon,
  DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";

const TaskOptionsMenu = ({
  isOpen,
  anchorEl,
  taskId,
  onClose,
  onDeleteClick,
  onCopyToClipboardClick,
}) => {
  const handleCopyToClipboardClick = (taskId) => {
    onClose();
    onCopyToClipboardClick(taskId);
  };

  const handleDeleteClick = (taskId) => {
    onClose();
    onDeleteClick(taskId);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      sx={{ color: "gray" }}
    >
      <MenuItem onClick={() => handleCopyToClipboardClick(taskId)}>
        <ListItemIcon>
          <LinkIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Copiar link para a tarefa</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => handleDeleteClick(taskId)}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Excluir tarefa</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default TaskOptionsMenu;
