import { useState, useEffect } from "react";
import { getColorsAsObjects } from "@/lib/util.js";
import { Circle as CircleIcon } from "@mui/icons-material";
import { getRandomIntInclusive } from "@/lib/util.js";
import {
  Modal,
  Box,
  Button,
  Divider,
  Typography,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  overflow: "hidden",
};

const ProjectEditorModal = ({
  isOpen,
  title,
  initialData,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [colorNumber, setColorNumber] = useState(getRandomIntInclusive(30, 49));

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setColorNumber(initialData.color);
    }
  }, []);

  const handleColorSelectChange = (event) => {
    setColorNumber(event.target.value);
  };

  const handleNameFieldChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ ...initialData, name: name, color: colorNumber });
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <Box sx={{ backgroundColor: "#fafafa" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ px: 3, py: 2 }}
          >
            {title}
          </Typography>
        </Box>

        <Divider variant="fullWidth" />

        <Box sx={{ px: 3, py: 2 }}>
          <FormControl fullWidth>
            <Box sx={{ mb: 6 }}>
              <Typography sx={{ fontWeight: "bold" }}>Nome</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={name}
                onChange={handleNameFieldChange}
                inputProps={{ maxLength: 120 }}
              />
            </Box>

            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Cor</Typography>
              <Select
                value={colorNumber}
                onChange={handleColorSelectChange}
                fullWidth
                sx={{ "& .MuiSelect-select": { display: "flex" } }}
              >
                {getColorsAsObjects().map((color) => (
                  <MenuItem value={color.number} key={color.number}>
                    <CircleIcon fontSize="small" htmlColor={color.code} />
                    <Typography sx={{ ml: 1 }}>{color.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
        </Box>

        <Divider variant="fullWidth" />

        <Box sx={{ px: 3, py: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onCancel}>
            {cancelButtonText}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ ml: 2 }}
            disabled={name == ""}
          >
            {confirmButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectEditorModal;
