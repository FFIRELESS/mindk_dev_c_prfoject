import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader, CardMedia, Collapse,
  IconButton, Modal,
  Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';

import { handleImageError } from '../../config/componentHandlers';
import { ExpandMore } from '../../styles/expandMoreAnimation';
import { postPropTypes } from '../../propTypes/postPT';
import EditPostFormContainer from '../../containers/post/editPostForm';
import { modalBoxStyle } from '../../styles/modalStyle';

export const Post = function ({ post }) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const postData = post.post;
  const userData = post.post.user;

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

  const postImage = `http://localhost:3003/posts/${postData.Post_ID}/image`;

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
                <IconButton aria-label="edit" onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="settings" disabled>
                  <MoreVertIcon />
                </IconButton>
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
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton aria-label="share">
              <IosShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Comments
              </Typography>
            </CardContent>
          </Collapse>
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
