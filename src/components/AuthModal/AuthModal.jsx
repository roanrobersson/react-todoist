import { Modal, Box, Typography, Button } from "@mui/material";
import Loading from "../Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ isOpen, title, showRetryButton, onRetryClick }) => {
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          {title}
        </Typography>
        {showRetryButton ? (
          <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" onClick={onRetryClick}>
              Tentar novamente
            </Button>
          </Box>
        ) : (
          <Loading />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
