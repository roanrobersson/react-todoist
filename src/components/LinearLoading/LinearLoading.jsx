import { Box, LinearProgress } from "@mui/material";

const LinearLoading = () => {
  return (
    <Box sx={{ position: "fixed", bottom: "0", width: "100%" }}>
      <LinearProgress sx={{ height: "15px" }} />
    </Box>
  );
};

export default LinearLoading;
