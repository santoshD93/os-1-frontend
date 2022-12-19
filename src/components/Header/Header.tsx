import { AppBar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks";
import { LocalRoutes } from "../../consts";

interface HeaderProps {}

export const Header = ({  }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, logOut } = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Omnisafe
        </Typography>
        {!!user && (
          <div>
            <Tooltip title={user ? `${user.name} ${user.surname}` : ''}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate(LocalRoutes.Profile)}>Profile</MenuItem>
              <MenuItem onClick={logOut}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}