import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader, CardMedia, Collapse,
  IconButton,
  Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { handleImageError } from '../../config/componentHandlers';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Post = function ({ post }) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const postData = post.post;
  const userData = post.post.user;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAvatarClick = () => {
    navigate(`/users/${postData.User_ID}`);
  };

  const postImage = `http://localhost:3003/posts/${postData.Post_ID}/image`;

  return (
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
              <IconButton aria-label="edit" href={`posts/${postData.Post_ID}/edit`}>
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
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.shape({
    post: PropTypes.shape({
      Post_ID: PropTypes.number.isRequired,
      User_ID: PropTypes.number.isRequired,
      Title: PropTypes.string.isRequired,
      Text: PropTypes.string.isRequired,
      Timestamp: PropTypes.string.isRequired,
      Visibility: PropTypes.string.isRequired,
      Image: PropTypes.string,
      user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Fullname: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
