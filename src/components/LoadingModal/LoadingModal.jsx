import { Modal, Box } from "@mui/material";
import Loading from "../Loading";
import logoImg from "@/assets/images/logo.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 9,
};

const LoadingModal = ({ isOpen }) => {
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
          <img src={logoImg} />
        </Box>
        <Loading noPadding="true" />
      </Box>
    </Modal>
  );
};

export default LoadingModal;
