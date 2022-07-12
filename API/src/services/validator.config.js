const userRules = {
  Email: { email: true, required: true, unique: true },
  Username: { required: true, minString: 4, maxString: 50, unique: true },
  Fullname: { minString: 4, maxString: 125 },
  Phone: { phone_UA: true },
};

const postRules = {
  Title: { required: true, maxString: 255 },
  Visibility: { required: true, regex: "^(all|none|friends)$" },
};

const commentRules = {
  Text: { required: true, maxString: 255 },
};

const friendsRules = {
  Status: { required: true, regex: "^(friend|request)$" },
};

const validationRules = {
  userRules,
  postRules,
  commentRules,
  friendsRules,
};

module.exports = validationRules;
