import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Modal, Slide, useScrollTrigger } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { modalBoxStyle } from '../../styles/modalStyle';
import AddPostContainer from '../../containers/post/addPostForm';
import Context from '../../authContext';
import { checkAvatarUrlData } from '../../services/avatarLinkChecker';

const HideOnScroll = function (props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const ResponsiveAppBar = function ({ refetch }) {
  const [open, setOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const { store } = useContext(Context);

  const { isLogged } = store;
  const currentUser = store.user;

  let currentUserAvatar = '';

  if (store.isLogged) {
    if (store.user?.Image) {
      currentUserAvatar = checkAvatarUrlData(currentUser);
    }
  }

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleNewPostClick = () => {
    setAnchorElNav(null);
    setOpen(true);
  };

  const handleLogoutClick = () => {
    store.logout().then(() => navigate('/'));
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed">
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                <b>LINE.network</b>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="small"
                  aria-label="account of current user"
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
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem onClick={() => navigate('/users')}>
                    Users
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/posts')}>
                    Posts
                  </MenuItem>
                  <MenuItem onClick={handleNewPostClick}>
                    New post
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                <b>LINE.network</b>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={() => navigate('/users')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Users
                </Button>
                <Button
                  onClick={() => navigate('/posts')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Posts
                </Button>
                {isLogged && (
                <Button
                  onClick={handleNewPostClick}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  New post
                </Button>
                )}
              </Box>

              {isLogged && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={currentUserAvatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate(`/users/${currentUser.User_ID}`)}>
                    Profile
                  </MenuItem>
                  <MenuItem key="logout" onClick={handleLogoutClick}>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
              )}
              {!isLogged && (
                <Button
                  onClick={() => navigate('/')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Log in
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Modal open={open}>
        <Box sx={modalBoxStyle}>
          <Box sx={{
            position: 'absolute',
            left: '89%',
            top: '2%',
          }}
          >
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <AddPostContainer refetch={refetch} setOpen={setOpen} />
        </Box>
      </Modal>
    </>
  );
};

export default observer(ResponsiveAppBar);

ResponsiveAppBar.propTypes = {
  refetch: PropTypes.func,
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
