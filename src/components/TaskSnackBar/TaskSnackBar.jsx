import { Button, IconButton, Snackbar, Fade } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const TaskSnackBar = ({ isOpen, onClose, onUndo }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  const handleUndoClick = () => {
    onUndo();
    handleClose();
  };

  const action = (
    <>
      <Button color="error" size="small" onClick={handleUndoClick}>
        Desfazer
      </Button>
      <IconButton size="small" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message="1 tarefa concluída!"
      action={action}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Fade}
      key={Fade.name}
      sx={{ "& .MuiPaper-root": { color: "black", backgroundColor: "white" } }}
    />
  );
};

export default TaskSnackBar;
