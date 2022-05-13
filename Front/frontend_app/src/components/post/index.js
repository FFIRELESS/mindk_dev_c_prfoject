import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box, Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, CardMedia, Collapse, Grid,
  IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText,
  Menu, MenuItem, Modal, Popover, Snackbar,
  Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { pink, red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';

import { handleImageError } from '../../config/componentHandlers';
import { ExpandMore } from '../../styles/expandMoreAnimation';
import { postPropTypes } from '../../propTypes/postPT';
import EditPostFormContainer from '../../containers/post/editPostForm';
import { modalBoxStyle } from '../../styles/modalStyle';
import authContext from '../../authContext';

export const Post = function ({ post, mutate }) {
  const userContext = useContext(authContext);

  const [expanded, setExpanded] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSendModal, setOpenSendModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPopover, setAnchorElPopover] = useState(null);
  const [isPostDeleted, setPostDeleted] = useState(false);

  const openPopover = Boolean(anchorElPopover);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const postData = { ...post };
  const postLikes = post.Post_likes;
  const userData = post.User;

  const postImage = `http://localhost:3003/posts/${postData.Post_ID}/image`;
  const postDate = new Date(postData.Timestamp.toString()).toLocaleString('ru');

  const commentsCount = post.Comments.length;
  const likesCount = post.Post_likes.length ? post.Post_likes.length : null;
  let commentsCounter = 0;

  const isComments = commentsCount > 0;
  const isCurrentUserLike = postLikes.find((like) => like.Like_User.User_ID === userContext.id);
  const isCurrentUser = userData.User_ID === userContext.id;

  const handlePopoverOpen = (event) => {
    setAnchorElPopover(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElPopover(null);
  };

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
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  const handleAvatarClick = () => {
    navigate(`/users/${postData.User_ID}`);
  };

  const handleSendClick = () => {
    setOpenSendModal(true);
  };

  const handleSendModalClose = () => {
    setOpenSendModal(false);
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

  const commentsData = post.Comments.map((comment) => {
    if (comment === undefined) {
      return 0;
    }

    const commentLikesCounter = comment.Comment_likes.length ? comment.Comment_likes.length : null;
    const commentLikes = comment.Comment_likes;
    const commentDate = new Date(comment.created.toString()).toLocaleString('ru');
    let repliedCommentDate = 'Date error';

    const isLastComment = commentsCount === commentsCounter + 1;
    const isReplied = !!comment.Repl_to_Comment_ID;
    const isLikedByCurrentUser = commentLikes
      .find((like) => like.Liked_by_User.User_ID === userContext.id);

    commentsCounter += 1;

    if (isReplied) {
      repliedCommentDate = new Date(comment.Repl_to_Comment.created.toString())
        .toLocaleString('ru');
    }

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
                <div>
                  <Typography
                    sx={{ display: 'inline' }}
                    variant="subtitle1"
                    color="text.primary"
                  >
                    {comment.User.Username}
                  </Typography>
                  <Typography
                    sx={{ display: 'inline' }}
                    variant="caption"
                    color="text.secondary"
                  >
                    {' • '}
                    {commentDate}
                  </Typography>
                </div>
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
                {!isLikedByCurrentUser && (
                <FavoriteBorderIcon />
                )}
                {isLikedByCurrentUser && (
                <FavoriteIcon sx={{ color: pink.A400 }} />
                )}
              </IconButton>
              {commentLikesCounter}
            </Box>
          </ListItem>
          <Box margin={2}>
            {isReplied && (
              <Box marginLeft={7} marginTop={-2}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Replied to:
                </Typography>
                <Box
                  sx={{
                    overflow: 'hidden',
                  }}
                  maxHeight={60}
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
                        <div>
                          <Typography
                            sx={{ display: 'inline' }}
                            variant="subtitle2"
                            color="text.primary"
                          >
                            {comment.Repl_to_Comment.User.Username}
                          </Typography>
                          <Typography
                            sx={{ display: 'inline' }}
                            variant="caption"
                            color="text.secondary"
                          >
                            {' • '}
                            {repliedCommentDate}
                          </Typography>
                        </div>
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
                  <IconButton aria-label="share" onClick={handleSendClick}>
                    <SendIcon />
                  </IconButton>
                  {isCurrentUser && (
                    <>
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
                    </>
                  )}
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
            subheader={`${postDate} • ${postData.Visibility}`}
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
                  <IconButton
                    aria-label="add to favorites"
                  >
                    {!isCurrentUserLike && (
                    <FavoriteBorderIcon />
                    )}
                    {isCurrentUserLike && (
                    <FavoriteIcon sx={{ color: pink.A400 }} />
                    )}
                  </IconButton>

                  <Typography
                    aria-owns={openPopover ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    variant="subtitle2"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    {likesCount}
                  </Typography>

                  {likesCount && (
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: 'none',
                    }}
                    open={openPopover}
                    anchorEl={anchorElPopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Box
                      sx={{
                        overflow: 'hidden',
                      }}
                      maxWidth={303}
                    >
                      <Grid
                        container
                      >
                        {postLikes.map((like) => (
                          <Box key={like.id} margin={0.5}>
                            <Avatar
                              sx={{ width: 35, height: 35 }}
                              src={`http://localhost:3003/users/${like.Like_User.User_ID}/avatar`}
                            />
                          </Box>
                        ))}
                      </Grid>
                    </Box>
                  </Popover>
                  )}

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
      <Modal open={openEditModal}>
        <Box sx={modalBoxStyle}>
          <Box sx={{
            position: 'absolute',
            left: '89%',
            top: '2%',
          }}
          >
            <IconButton onClick={handleEditModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <EditPostFormContainer id={postData.Post_ID} />
        </Box>
      </Modal>
      <Modal open={openSendModal}>
        <Box sx={modalBoxStyle}>
          <Box sx={{
            position: 'absolute',
            left: '89%',
            top: '2%',
          }}
          >
            <IconButton onClick={handleSendModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box marginTop={-3}>
            <h2>Share link:</h2>
            <TextField
              name="link"
              label="Copy this link:"
              value={`http://localhost:3000/posts/${postData.Post_ID}`}
              readOnly
              fullWidth
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Post;

Post.propTypes = postPropTypes;
