const db = require("../db");

module.exports = {
  getUserFriends: async (id) =>
    db
      .select("User.*")
      .from("Friends_n_requests")
      .join("User", { "User.User_ID": "Friends_n_requests.In_User_ID" })
      .where({ Out_User_ID: id, Status: "friend" })
      .union(
        db
          .select("User.*")
          .from("Friends_n_requests")
          .join("User", { "User.User_ID": "Friends_n_requests.Out_User_ID" })
          .where({ In_User_ID: id, Status: "friend" })
      ),
  getIncomingRequests: async (id) =>
    db
      .select()
      .from("Friends_n_requests")
      .where({ Out_User_ID: id, Status: "request" }),
  getOutgoingRequests: async (id) =>
    db
      .select()
      .from("Friends_n_requests")
      .where({ In_User_ID: id, Status: "request" }),
  getUsersInRequests: async (id) =>
    db
      .select("User.User_ID", "User.Username")
      .from("Friends_n_requests")
      .join("User", { "User.User_ID": "Friends_n_requests.In_User_ID" })
      .where({ Out_User_ID: id, Status: "request" }),
  getUsersOutRequests: async (id) =>
    db
      .select("User.User_ID", "User.Username")
      .from("Friends_n_requests")
      .join("User", { "User.User_ID": "Friends_n_requests.Out_User_ID" })
      .where({ In_User_ID: id, Status: "request" }),
};
