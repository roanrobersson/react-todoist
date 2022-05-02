import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const Loading = ({
  color,
  disableShrink,
  noPadding = false,
  thickness,
  size,
  sx,
  value,
  variant,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        ...(!noPadding && { pt: 10 }),
      }}
    >
      <CircularProgress
        color={color}
        disableShrink={disableShrink}
        thickness={thickness}
        size={size}
        sx={{ ...sx }}
        value={value}
        variant={variant}
      />
    </Box>
  );
};

export default Loading;
