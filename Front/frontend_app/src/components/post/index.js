import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box, Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, CardMedia, Collapse,
  IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText,
  Menu, MenuItem, Modal, Snackbar,
  Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';

import { handleImageError } from '../../config/componentHandlers';
import { ExpandMore } from '../../styles/expandMoreAnimation';
import { postPropTypes } from '../../propTypes/postPT';
import EditPostFormContainer from '../../containers/post/editPostForm';
import { modalBoxStyle } from '../../styles/modalStyle';

export const Post = function ({ post, mutate }) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPostDeleted, setPostDeleted] = useState(false);

  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const postData = { ...post };
  const userData = post.User;

  const commentsCount = post.Comments.length;
  let commentsCounter = 0;
  const likesCount = post.Post_likes.length;
  const isComments = commentsCount > 0;

  const postImage = `http://localhost:3003/posts/${postData.Post_ID}/image`;

  const commentsData = post.Comments.map((comment) => {
    if (comment === undefined) {
      return 0;
    }
    const commentLikes = comment.Comment_likes.length;
    const isLastComment = commentsCount === commentsCounter + 1;
    const isReplied = !!comment.Repl_to_Comment_ID;

    commentsCounter += 1;

    return (
      <div key={comment.Comment_ID}>
        <Box>
          <ListItem dense alignItems="flex-start" key={comment.Comment_ID}>
            <ListItemAvatar>
              <Avatar src={`http://localhost:3003/users/${comment.User.User_ID}/avatar`} />
            </ListItemAvatar>
            <ListItemText
              sx={{ width: '60%' }}
              primary={(
                <Typography
                  sx={{ display: 'block' }}
                  variant="subtitle1"
                  color="text.primary"
                >
                  {comment.User.Username}
                </Typography>
              )}
              secondary={(
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {comment.Text}
                </Typography>
                )}
            />
            <Box>
              <IconButton aria-label="like comment">
                <FavoriteBorderIcon />
              </IconButton>
              {commentLikes}
            </Box>
          </ListItem>
          <Box margin={2}>
            {isReplied && (
            <Box marginLeft={7}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
              >
                Replied to:
              </Typography>
              <Box
                sx={{
                  overflow: 'hidden',
                }}
                maxHeight={54}
                border={1}
                borderColor="silver"
                borderRadius={2}
              >
                <ListItemButton disableGutters dense alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      src={`http://localhost:3003/users/${comment.Repl_to_Comment.User.User_ID}/avatar`}
                      sx={{ transform: 'scale(0.7)' }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ width: '60%' }}
                    primary={(
                      <Typography
                        sx={{ display: 'block' }}
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {comment.Repl_to_Comment.User.Username}
                      </Typography>
                          )}
                    secondary={(
                      <Typography
                        sx={{ display: 'inline' }}
                        variant="caption"
                        color="text.primary"
                      >
                        {comment.Repl_to_Comment.Text}
                      </Typography>
                  )}
                  />
                </ListItemButton>
              </Box>
            </Box>
            )}
          </Box>
          {!isLastComment && (<hr style={{ width: '94%' }} />)}
        </Box>
      </div>
    );
  });

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleAvatarClick = () => {
    navigate(`/users/${postData.User_ID}`);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuDelete = () => {
    handleCloseMenu();
    handleClickSnackbar();
    setPostDeleted(true);
    mutate(postData.Post_ID);
  };

  const actionSnackbar = (
    <>
      <Button size="small" onClick={handleReloadPage}>
        RELOAD PAGE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Box
        margin={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ width: '80vh', maxWidth: 620 }}>
          <CardHeader
            avatar={(
              <Avatar
                src={`http://localhost:3003/users/${postData.User_ID}/avatar`}
                sx={{ bgcolor: red[500] }}
                aria-label="username"
                onClick={handleAvatarClick}
              >
                U
              </Avatar>
                    )}
            action={(
              <div>
                {!isPostDeleted
                && (
                <div>
                  <IconButton aria-label="share">
                    <SendIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={handleEditClick}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="settings"
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClickMenu}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
                  </Menu>
                </div>
                )}
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={6000}
                  onClose={handleCloseSnackbar}
                  message="Post deleted"
                  action={actionSnackbar}
                />
              </div>
                    )}
            title={(
              <Typography>
                {userData.Username}
              </Typography>
        )}
            subheader={`${postData.Timestamp} • ${postData.Visibility}`}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom component="div" color="text.primary">
              {postData.Title}
            </Typography>
            <Typography textAlign="justify" variant="body2" color="text.secondary">
              {postData.Text}
            </Typography>
            {postData.Image && (
              <Box
                paddingTop={3}
              >
                <CardMedia
                  component="img"
                  image={postImage}
                  onError={handleImageError}
                />
              </Box>
            )}
          </CardContent>
          {!isPostDeleted
              && (
              <div>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                  </IconButton>
                  {likesCount}
                  {isComments
                      && (
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <Typography>
                            Comments (
                            {commentsCount}
                            ):
                          </Typography>
                          <ExpandMoreIcon />
                        </ExpandMore>
                      )}
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Box marginTop="-5%"><h3>Comments:</h3></Box>
                    <Box
                      border={1}
                      borderColor="silver"
                      borderRadius={2}
                      maxHeight={300}
                      alignItems="center"
                      sx={{
                        overflow: 'auto',
                      }}
                    >
                      <List>
                        {commentsData}
                      </List>
                    </Box>
                  </CardContent>
                </Collapse>
              </div>
              )}
        </Card>
      </Box>
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
          <EditPostFormContainer id={postData.Post_ID} />
        </Box>
      </Modal>
    </>
  );
};

export default Post;

Post.propTypes = postPropTypes;
