const passwordHasher = require("../services/passwordHasher");
const config = require("./config");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getUserByEmail,
} = require("../services/store/users.service");

module.exports = {
  createUser: async (user) => {
    if (user.password) {
      user.password = passwordHasher(user.password, config.salt);
    }
    const [newUserId] = await createUser(user);
    // some additional logic
    // send an email for example
    return newUserId;
  },
  getAllUsers: async () => {
    const users = await getAllUsers();
    // some additional logic
    return users;
  },
  getUserById: async (User_ID) => {
    const user = await getUserById(User_ID);
    // some additional logic
    return user;
  },
  updateUserById: async (User_ID, data) => {
    await updateUserById(User_ID, data);
    const user = getUserById(User_ID);
    // some additional logic
    return user;
  },
  deleteUserById: async (User_ID) => {
    await deleteUserById(User_ID);
    // some additional logic
  },
  getUserByEmail: async (email) => {
    return getUserByEmail(email);
  },
  checkPassword: (plainPassword, hash) =>
    hash === passwordHasher(plainPassword, config.salt),
};
