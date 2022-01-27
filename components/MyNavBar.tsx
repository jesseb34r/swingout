import * as React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Tooltip,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { NextLinkComposed } from "@swingout/components/utils/Link";

interface StyledButtonProps {
  buttonContent: string | JSX.Element;
  buttonPath?: string;
  iconButton?: { tooltip: string };
  menuItems?: string[];
}

const StyledButton = ({
  buttonContent,
  buttonPath,
  iconButton,
  menuItems,
}: StyledButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<
    HTMLButtonElement | undefined
  >();
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <>
      {iconButton ? (
        <Tooltip title={iconButton.tooltip} enterDelay={300} arrow>
          <IconButton color="inherit" onClick={handleClick}>
            {buttonContent}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          component={NextLinkComposed}
          to={{
            pathname: buttonPath,
          }}
          color="inherit"
          // onClick={handleClick} //TODO
        >
          {buttonContent}
        </Button>
      )}
      {menuItems && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleClose}
        >
          {menuItems.map((itemText) => (
            <MenuItem key={itemText} onClick={handleClose}>
              {itemText}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

const MyNavBar = () => {
  return (
    <AppBar color="primary">
      <Toolbar>
        <Container maxWidth="xl" sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexGrow: "1",
              alignItems: "center",
            }}
          >
            <StyledButton buttonContent="SwingOut" buttonPath="/" />
            <StyledButton buttonContent="Help" buttonPath="/help" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <StyledButton buttonContent="Join Game" />
            <StyledButton buttonContent="New Game" />
            <StyledButton
              buttonContent={
                <Avatar alt="jesseb34r" src="https://tinyurl.com/ybjsbdmu" />
              }
              menuItems={["Profile", "Settings", "Logout"]}
              iconButton={{ tooltip: "Profile" }}
            />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default MyNavBar;
