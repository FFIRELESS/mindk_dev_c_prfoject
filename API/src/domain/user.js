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
} = require("../services/store/users.service");
const {
  getUserFriends,
  getUsersInRequests,
  getUsersOutRequests,
} = require("../services/store/friends.service");
const NotFoundException = require("../exceptions/NotFoundException");

module.exports = {
  createUser: async (user) => {
    if (user.password) {
      user.password = passwordHasher(user.password, config.salt);
    }
    const [newUserId] = await createUser(user);
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

    if (!user) {
      throw new NotFoundException("User was not found");
    }

    const university = await getUserWithUnivById(user.User_ID);
    return {
      user,
      university,
    };
  },
  getUserFriends: async (User_ID) => {
    const friends = await getUserFriends(User_ID);

    if (!friends[0]) {
      throw new NotFoundException("User/friends was not found");
    }
    return friends;
  },
  getRequests: async (User_ID) => {
    const in_reqs = await getUsersInRequests(User_ID);
    const out_reqs = await getUsersOutRequests(User_ID);

    if (!in_reqs[0] && !out_reqs[0]) {
      throw new NotFoundException("User/friend requests was not found");
    }
    return {
      incoming: in_reqs,
      outgoing: out_reqs,
    };
  },
  updateUserById: async (User_ID, data) => {
    await updateUserById(User_ID, data);
    const user = getUserById(User_ID);
    return user;
  },
  deleteUserById: async (User_ID) => {
    await deleteUserById(User_ID);
  },
  getUserByEmail: async (email) => {
    return getUserByEmail(email);
  },
  checkPassword: (plainPassword, hash) =>
    hash === passwordHasher(plainPassword, config.salt),
};
