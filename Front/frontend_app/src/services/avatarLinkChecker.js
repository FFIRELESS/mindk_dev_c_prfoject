export const checkAvatarUrlData = (userData) => {
  if (!userData.Image.match(/^(https:\/\/)/)) {
    return `http://localhost:3003/users/${userData.User_ID}/avatar`;
  }
  return userData.Image;
};

export default checkAvatarUrlData;
