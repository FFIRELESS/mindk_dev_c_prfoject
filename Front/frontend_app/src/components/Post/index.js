import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader, Collapse,
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

export const Post = function ({ posts }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      margin={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ width: '80vh', maxWidth: 800 }}>
        <CardHeader
          avatar={(
            <Avatar sx={{ bgcolor: red[500] }} aria-label="username">
              U
            </Avatar>
                        )}
          action={(
            <div>
              <IconButton aria-label="edit" href={`posts/${posts.Post_ID}/edit`}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="settings" disabled>
                <MoreVertIcon />
              </IconButton>
            </div>
                        )}
          title={`User #${posts.User_ID}`}
          subheader={`${posts.Timestamp} • ${posts.Visibility}`}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom component="div" color="text.primary">
            {posts.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {posts.Text}
          </Typography>
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
  posts: PropTypes.shape({
    Post_ID: PropTypes.number.isRequired,
    User_ID: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
    Timestamp: PropTypes.string.isRequired,
    Visibility: PropTypes.string.isRequired,
  }).isRequired,
};
