const UnprocessableEntityException = require("../exceptions/UnprocessableEntityException");

module.exports = (rules, resources) => async (req, res, next) => {
  const errors = {};

  for await (const field of Object.keys(rules)) {
    const fieldErrors = [];
    const splitRules = rules[field].split("&");

    for await (const paramRule of splitRules) {
      const [rule, parameter] = paramRule.split("=");

      switch (rule) {
        case "required":
          {
            if (!req.body[field]) {
              fieldErrors.push("field is required");
            }
          }
          break;
        case "email":
          {
            if (
              !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                req.body[field]
              )
            ) {
              fieldErrors.push("not valid email");
            }
          }
          break;
        case "phone_UA":
          {
            if (!/^\+[0-9]{3}\d{9}$/g.test(req.body[field])) {
              fieldErrors.push("not valid phone number");
            }
          }
          break;
        case "minString":
          {
            if (
              req.body[field] &&
              req.body[field].length < parseInt(parameter)
            ) {
              fieldErrors.push(
                `field must be at least ${parameter} characters`
              );
            }
          }
          break;
        case "maxString":
          {
            if (
              req.body[field] &&
              req.body[field].length > parseInt(parameter)
            ) {
              fieldErrors.push(`field must not exceed ${parameter} characters`);
            }
          }
          break;
        case "minInt":
          {
            if (req.body[field] < parseInt(parameter)) {
              fieldErrors.push(`number must be greater than ${parameter}`);
            }
          }
          break;
        case "unique":
          {
            const { getResourceByField, getResource } = resources[field];
            const resource = await getResourceByField(req.body[field]);
            let existingResource;

            if (getResource) {
              existingResource = await getResource(req);
            }
            if (
              resource &&
              (!existingResource ||
                existingResource.User_ID !== resource.User_ID)
            ) {
              fieldErrors.push("field is not unique");
            }
          }
          break;
        case "regex":
          {
            if (!req.body[field].match(parameter)) {
              fieldErrors.push("field value does not match regular expression");
            }
          }
          break;
      }
      if (fieldErrors.length !== 0) {
        errors[field] = fieldErrors;
      }
    }
  }

  if (Object.keys(errors).length === 0) {
    return next();
  }
  next(new UnprocessableEntityException(errors));
};
