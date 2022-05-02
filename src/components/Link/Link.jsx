import { Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

const Link = ({ children, external = false, href, color = "inherit" }) => (
  <>
    {external ? (
      <MuiLink href={href} color={color}>
        {children}
      </MuiLink>
    ) : (
      <ReactRouterLink to={href} color={color}>
        {children}
      </ReactRouterLink>
    )}
  </>
);

export default Link;
