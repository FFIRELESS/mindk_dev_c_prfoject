const Action = {
  READ: "read",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};

const Possession = {
  ANY: "any",
  OWN: "own",
  NONE: "none",
};

const Resources = {
  POST: "post",
  USER: "user",
};

const Roles = {
  ADMIN: "admin",
  USER: "user",
};

const allowAny = [
  {
    action: Action.CREATE,
    possession: Possession.ANY,
  },
  {
    action: Action.READ,
    possession: Possession.ANY,
  },
  {
    action: Action.UPDATE,
    possession: Possession.ANY,
  },
  {
    action: Action.DELETE,
    possession: Possession.ANY,
  },
];

const allowOwn = [
  {
    action: Action.CREATE,
    possession: Possession.ANY,
  },
  {
    action: Action.READ,
    possession: Possession.ANY,
  },
  {
    action: Action.UPDATE,
    possession: Possession.OWN,
  },
  {
    action: Action.DELETE,
    possession: Possession.OWN,
  },
];

const aclRules = {
  [Roles.ADMIN]: {
    [Resources.USER]: allowAny,
    [Resources.POST]: allowAny,
  },
  [Roles.USER]: {
    [Resources.USER]: allowOwn,
    [Resources.POST]: allowOwn,
  },
};

module.exports = { aclRules, Possession };
