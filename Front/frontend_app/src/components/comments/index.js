import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText, Menu, MenuItem, Modal,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import React, { useContext, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { checkAvatarUrlData } from '../../services/avatarLinkChecker';
import authContext from '../../authContext';
import { commentsPropTypes } from '../../propTypes/commentsPT';
import { modalBoxStyle } from '../../styles/modalStyle';
import EditCommentFormContainer from '../../containers/comments/editForm';

const Comments = function ({
  comments, removeComment, reloadPosts,
}) {
  const { store } = useContext(authContext);

  let commentsCounter = 0;
  let isCurrentUser;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const deleteComment = (id) => {
    handleCloseMenu();
    removeComment(id).then(() => reloadPosts());
  };

  const openEditCommentModal = () => {
    handleCloseMenu();
    setOpenEditModal(true);
  };

  const closeEditCommentModal = () => {
    setOpenEditModal(false);
  };

  return (
    <>
      {comments.map((comment) => {
        if (comment === undefined) {
          return 0;
        }

        const commentLikesCounter = comment.Comment_likes.length
          ? comment.Comment_likes.length : null;
        const commentLikes = comment.Comment_likes;
        const commentDate = new Date(comment.created.toString()).toLocaleString('ru');
        let repliedCommentDate = 'Date error';

        const commentUserAvatar = checkAvatarUrlData(comment.User);
        const replCommentUserAvatar = checkAvatarUrlData(comment?.Repl_to_Comment?.User);

        const isLastComment = comments.length === commentsCounter + 1;
        const isReplied = !!comment.Repl_to_Comment_ID;
        const isLikedByCurrentUser = commentLikes
          .find((like) => like.Liked_by_User.User_ID === store.user.User_ID);

        commentsCounter += 1;

        if (store.user.role === 'admin') {
          isCurrentUser = true;
        } else {
          isCurrentUser = comment.User_ID === store.user.User_ID;
        }

        if (isReplied) {
          repliedCommentDate = new Date(comment.Repl_to_Comment.created.toString())
            .toLocaleString('ru');
        }

        return (
          <div key={comment.Comment_ID}>
            <Box>
              <ListItem dense alignItems="flex-start" key={comment.Comment_ID}>
                <ListItemAvatar>
                  <Avatar src={commentUserAvatar} />
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
                  {isCurrentUser && (
                  <>
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
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={openEditCommentModal}>Edit</MenuItem>
                      <MenuItem onClick={() => deleteComment(comment.Comment_ID)}>Delete</MenuItem>
                    </Menu>
                    <Modal open={openEditModal}>
                      <Box sx={modalBoxStyle}>
                        <Box sx={{
                          position: 'absolute',
                          left: '89%',
                          top: '2%',
                        }}
                        >
                          <IconButton onClick={closeEditCommentModal}>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                        <Box marginTop={-3}>
                          <EditCommentFormContainer
                            reloadPosts={reloadPosts}
                            comment={comment}
                            setModalOpen={setOpenEditModal}
                          />
                        </Box>
                      </Box>
                    </Modal>
                  </>
                  )}
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
                            src={replCommentUserAvatar}
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
      })}
    </>
  );
};

export default Comments;

Comments.propTypes = commentsPropTypes;
