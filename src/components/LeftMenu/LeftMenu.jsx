import { useState, useContext } from "react";
import { LeftMenuContext } from "@/providers/LeftMenuProvider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { StyledDrawer, Main } from "./styles";
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
  Box,
  Typography,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";

const LeftMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [projectListIsOpen, setProjectListIsOpen] = useState(true);
  const { isOpen, setIsOpen } = useContext(LeftMenuContext);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleProjectListClick = () => {
    setProjectListIsOpen(!projectListIsOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="persistent" anchor="left" open={isOpen}>
        <Divider />

        <List component="nav">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Entrada" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Hoje" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Em breve" />
          </ListItemButton>

          <Divider />

          <ListItemButton onClick={handleProjectListClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Projetos" />
            {projectListIsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </List>
        <Collapse in={projectListIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <CircleIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Projeto 1" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <CircleIcon fontSize={"small"} color="warning" />
              </ListItemIcon>
              <ListItemText primary="Projeto 2" />
            </ListItemButton>
          </List>
        </Collapse>
      </StyledDrawer>

      <Main open={isOpen}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </Box>
  );
};

export default LeftMenu;
