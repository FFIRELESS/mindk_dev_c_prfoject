const passwordHasher = require("../utils/passwordHasher");
const config = require("../services/config");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getUserByEmail,
  getAllUsersWithUniv,
  getUsersValue,
  getUserWithUnivById,
  getUserFriends,
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
    let userData = [];
    const userValue = await getUsersValue();
    const user = await getAllUsers();
    const university = await getAllUsersWithUniv();

    for (let i = 0; i < userValue.count; i++) {
      userData[i] = {
        user: {
          ...user[i],
        },
        university: university[i],
      };
    }
    return userData;
  },
  getUserById: async (User_ID) => {
    const user = await getUserById(User_ID);
    const university = await getUserWithUnivById(user.User_ID);
    return {
      user,
      university,
    };
  },
  getUserFriends: async (User_ID) => {
    return await getUserFriends(User_ID);
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
