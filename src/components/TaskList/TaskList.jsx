import { List } from "@mui/material";

const TaskList = ({ children }) => {
  return <List sx={{ width: "100%" }}>{children}</List>;
};

export default TaskList;
