import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";

const TaskEditor = ({
  initialData,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onSubmit,
}) => {
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content);
      setDescription(initialData.description);
    }
  }, []);

  const handleNameFieldChange = (event) => {
    setContent(event.target.value);
  };

  const handleDescriptionFieldChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ ...initialData, content: content, description: description });
  };

  return (
    <Box>
      <Box
        value={content}
        sx={{
          border: "1px solid LightGray",
          borderRadius: 3,
          p: "10px",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Nome da tarefa"
          fullWidth
          size="small"
          value={content}
          onChange={handleNameFieldChange}
          InputProps={{ disableUnderline: true }}
          sx={{ border: 0 }}
        />
        <TextField
          variant="standard"
          placeholder="Descrição"
          multiline
          fullWidth
          maxRows={9}
          value={description}
          onChange={(e) => handleDescriptionFieldChange(e)}
          InputProps={{ disableUnderline: true }}
          sx={{ mt: 1, mb: 3 }}
        />
      </Box>

      <Box sx={{ py: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mr: 2 }}
          disabled={content == ""}
        >
          {confirmButtonText}
        </Button>

        <Button variant="outlined" onClick={onCancel}>
          {cancelButtonText}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskEditor;
