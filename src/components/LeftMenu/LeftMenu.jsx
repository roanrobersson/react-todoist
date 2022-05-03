import { useState, useContext, useEffect } from "react";
import { LeftMenuContext } from "@/providers/LeftMenuProvider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material/styles";
import { LEFT_MENU_WIDTH } from "../../configs/layout.js";
import { getColorHexByColorNumber } from "@/lib/util.js";
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
  BorderColorOutlined as BorderColorIcon,
  DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Drawer,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
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

const LeftMenu = ({
  projects,
  selectedProjectId,
  onProjectItemClick,
  onAddProjectClick,
  onEditProjectClick,
  onDeleteProjectClick,
}) => {
  const { projectId: projectIdParam } = useParams();
  //const [selectedIndex, setSelectedIndex] = useState(1);
  const [projectListIsOpen, setProjectListIsOpen] = useState(false);
  const [isMouseOverLeftMenu, setIsMouseOverLeftMenu] = useState(false);
  const { isOpen, setIsOpen } = useContext(LeftMenuContext);
  const inboxObject = projects.find((project) => project.name == "Inbox");
  const [projectMenuAnchorEl, setProjectMenuAnchorEl] = useState(null);
  const [projectMenuProjectId, setProjectMenuProjectId] = useState(0);
  const isProjectMenuOpen = Boolean(projectMenuAnchorEl);

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

  const handleAddProjectClick = (event) => {
    event.stopPropagation();
    onAddProjectClick();
  };

  const handleProjectItemOptionsClick = (event, projectId) => {
    event.stopPropagation();
    setProjectMenuAnchorEl(event.currentTarget);
    setProjectMenuProjectId(projectId);
  };

  const handleProjectMenuClose = () => {
    setProjectMenuAnchorEl(null);
  };

  const handleProjectEditClick = (projectId) => {
    handleProjectMenuClose();
    onEditProjectClick(projectId);
  };

  const handleProjectDeleteClick = (projectId) => {
    handleProjectMenuClose();
    onDeleteProjectClick(projectId);
  };

  useEffect(() => {
    let selectedProject = projects.find(
      (project) => project.id == selectedProjectId
    );
    if (selectedProject && selectedProject.name != "Inbox") {
      setProjectListIsOpen(true);
    }
  }, [selectedProjectId]);

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
            onClick={handleAddProjectClick}
            sx={{ ...(!isMouseOverLeftMenu && { visibility: "hidden" }) }}
            disabled={projects.length >= 8}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </StyledListItemButton>

        <Collapse in={projectListIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {projects
              .filter((project) => project.name != "Inbox")
              .sort((a, b) => a.order > b.order)
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
                      htmlColor={getColorHexByColorNumber(project.color)}
                    />
                  </ListItemIcon>

                  <ListItemText
                    primary={project.name}
                    primaryTypographyProps={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  />

                  <Tooltip title="Mais ações de projetos">
                    <IconButton
                      color="inherit"
                      onClick={(event) =>
                        handleProjectItemOptionsClick(event, project.id)
                      }
                      sx={{
                        ...(!isMouseOverLeftMenu && { visibility: "hidden" }),
                      }}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                </StyledListItemButton>
              ))}
          </List>
        </Collapse>
      </List>

      <Menu
        anchorEl={projectMenuAnchorEl}
        open={isProjectMenuOpen}
        onClose={handleProjectMenuClose}
        sx={{ color: "gray" }}
      >
        <MenuItem onClick={() => handleProjectEditClick(projectMenuProjectId)}>
          <ListItemIcon>
            <BorderColorIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar projeto</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleProjectDeleteClick(projectMenuProjectId)}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Excluir projeto</ListItemText>
        </MenuItem>
      </Menu>
    </StyledDrawer>
  );
};

export default LeftMenu;
