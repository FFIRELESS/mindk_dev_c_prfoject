const userRules = {
  Email: "email&required&unique",
  Username: "required&minString=4&maxString=50&unique",
  Fullname: "minString=4&maxString=125",
  Phone: "regex=^\\+[0-9]{3}\\d{9}$",
};

const postRules = {
  Title: "required&maxString=255",
  Visibility: "required&regex=^(all|none|friends)$",
};

const commentRules = {
  Text: "required&maxString=255",
};

const friendsRules = {
  Status: "required&regex=^(friend|request)$",
};

const validationRules = {
  userRules,
  postRules,
  commentRules,
  friendsRules,
};

module.exports = validationRules;
