import { Modal, Box } from "@mui/material";
import CircularLoading from "../CircularLoading";
import logoImg from "@/assets/images/logo_75x75.png";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
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
      <Box sx={modalBoxStyle}>
        <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
          <img src={logoImg}/>
        </Box>
        <CircularLoading noPadding="true" />
      </Box>
    </Modal>
  );
};

export default LoadingModal;
