import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Tooltip,
  Avatar,
  Divider
} from "@mui/material";
import {
  Menu as MenuIcon,
  MusicNote as MusicNoteIcon,
  Logout
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        minWidth: "100vw"
      }}
    >
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MusicNoteIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none"
              }}
            >
              Music App
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                <MenuItem
                  component={RouterLink}
                  to="/"
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                {isAuthenticated && (
                  <MenuItem
                    component={RouterLink}
                    to="/favorites"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Favorites</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <MusicNoteIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none"
              }}
            >
              Music App
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                component={RouterLink}
                to="/"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              {isAuthenticated && (
                <Button
                  component={RouterLink}
                  to="/favorites"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Favorites
                </Button>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user?.username || "User"}>
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography>Logged in as {user?.username}</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <Logout fontSize="small" sx={{ mr: 1 }} />
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex" }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={{ color: "white" }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    sx={{ color: "white" }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MAIN */}
      <Container
        component="main"
        sx={{
          mt: 4,
          mb: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: { xs: "100%", sm: "800px", md: "1000px", lg: "1200px" }
        }}
      >
        {children}
      </Container>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) => theme.palette.grey[200]
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            Music App Test Assignment © {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
