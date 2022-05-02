import { useState, useContext, useEffect } from "react";
import { LeftMenuContext } from "@/providers/LeftMenuProvider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material/styles";
import { LEFT_MENU_WIDTH } from "../../configs/layout.js";
import { normalizeColor } from "@/lib/util.js";
import { useParams } from "react-router-dom";
import {
  Inbox as InboxIcon,
  Event as EventIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Circle as CircleIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Drawer,
} from "@mui/material";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: LEFT_MENU_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    position: "static",
    width: LEFT_MENU_WIDTH,
    boxSizing: "border-box",
  },
}));

const LeftMenu = ({ projects, onProjectItemClick }) => {
  const { projectId: projectIdParam } = useParams();
  //const [selectedIndex, setSelectedIndex] = useState(1);
  const [projectListIsOpen, setProjectListIsOpen] = useState(false);
  const { isOpen, setIsOpen } = useContext(LeftMenuContext);
  const inboxObject = projects.find((project) => project.name == "Inbox");

  const handleListItemClick = (event, index) => {
    //setSelectedIndex(index);
  };

  const handleProjectItemClick = (event, project) => {
    handleListItemClick(event, project.id);
    onProjectItemClick(project);
  };

  const handleProjectListClick = () => {
    setProjectListIsOpen(!projectListIsOpen);
  };

  useEffect(() => {
    let selectedProject = projects.find(
      (project) => project.id == projectIdParam
    );
    if (selectedProject && selectedProject.name != "Inbox") {
      setProjectListIsOpen(true);
    }
  }, [projects]);

  return (
    <StyledDrawer variant="persistent" anchor="left" open={isOpen}>
      <Divider />

      <List component="nav">
        <ListItemButton
          selected={projectIdParam == inboxObject?.id}
          onClick={(event) => handleProjectItemClick(event, inboxObject)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Entrada" />
        </ListItemButton>

        <ListItemButton
          selected={projectIdParam == 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Hoje" />
        </ListItemButton>

        <ListItemButton
          selected={projectIdParam == 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Em breve" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={handleProjectListClick}>
          <ListItemText primary="Projetos" />
          {projectListIsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </List>

      <Collapse in={projectListIsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {projects
            .filter((project) => project.name != "Inbox")
            .map((project) => (
              <ListItemButton
                sx={{ pl: 4 }}
                selected={projectIdParam == project.id}
                onClick={(event) => handleProjectItemClick(event, project)}
                key={project.id}
              >
                <ListItemIcon>
                  <CircleIcon
                    fontSize="small"
                    htmlColor={normalizeColor(project.color)}
                  />
                </ListItemIcon>
                <ListItemText primary={project.name} />
              </ListItemButton>
            ))}
        </List>
      </Collapse>
    </StyledDrawer>
  );
};

export default LeftMenu;
