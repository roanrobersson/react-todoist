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
  Add as AddIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Drawer,
  IconButton,
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

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 5,
  paddingTop: 1,
  paddingBottom: 1,
}));

const LeftMenu = ({ projects, onProjectItemClick }) => {
  const { projectId: projectIdParam } = useParams();
  //const [selectedIndex, setSelectedIndex] = useState(1);
  const [projectListIsOpen, setProjectListIsOpen] = useState(false);
  const [isMouseOverLeftMenu, setIsMouseOverLeftMenu] = useState(false);
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
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      onMouseEnter={() => setIsMouseOverLeftMenu(true)}
      onMouseLeave={() => setIsMouseOverLeftMenu(false)}
    >
      <List component="nav" sx={{ pl: 5, pt: 5 }}>
        <StyledListItemButton
          selected={projectIdParam == inboxObject?.id}
          onClick={(event) => handleProjectItemClick(event, inboxObject)}
        >
          <ListItemIcon>
            <InboxIcon htmlColor="#246fe0" />
          </ListItemIcon>
          <ListItemText primary="Entrada" />
        </StyledListItemButton>

        <StyledListItemButton
          selected={projectIdParam == 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <EventIcon htmlColor="#058527" />
          </ListItemIcon>
          <ListItemText primary="Hoje" />
        </StyledListItemButton>

        <StyledListItemButton
          selected={projectIdParam == 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <CalendarMonthIcon htmlColor="#692fc2" />
          </ListItemIcon>
          <ListItemText primary="Em breve" />
        </StyledListItemButton>

        <StyledListItemButton
          onClick={handleProjectListClick}
          sx={{ mt: 3 }}
          style={{ backgroundColor: "transparent" }}
        >
          {projectListIsOpen ? (
            <ExpandLessIcon sx={{ mr: 4 }} />
          ) : (
            <ExpandMoreIcon sx={{ mr: 4 }} />
          )}
          <ListItemText primary="Projetos" />

          <IconButton
            color="inherit"
            onClick={(event) => event.stopPropagation()}
            sx={{ ...(!isMouseOverLeftMenu && { visibility: "hidden" }) }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </StyledListItemButton>

        <Collapse in={projectListIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {projects
              .filter((project) => project.name != "Inbox")
              .map((project) => (
                <StyledListItemButton
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
                  <IconButton
                    color="inherit"
                    onClick={(event) => event.stopPropagation()}
                    sx={{
                      ...(!isMouseOverLeftMenu && { visibility: "hidden" }),
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </StyledListItemButton>
              ))}
          </List>
        </Collapse>
      </List>
    </StyledDrawer>
  );
};

export default LeftMenu;
