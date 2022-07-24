const config = require('../config/app.config');

export const checkAvatarUrlData = (userData) => {
  if (userData === undefined || userData === null) {
    return '';
  }
  if (!userData.Image.match(/^(https:\/\/)/)) {
    return `${config.apiURL}/users/${userData.User_ID}/avatar`;
  }
  return userData.Image;
};

export const checkAvatarUrlById = (id) => {
  if (id === undefined || id === null || id === 0) {
    return '';
  }
  return `${config.apiURL}/users/${id}/avatar`;
};

export const checkPostImageUrlData = (postData) => {
  if (postData.Image === null) {
    return '';
  }
  if (!postData.Image.match(/^(https:\/\/)/)) {
    return `${config.apiURL}/posts/${postData.Post_ID}/image`;
  }
  return postData.Image;
};

export default { checkAvatarUrlData, checkAvatarUrlById, checkPostImageUrlData };
