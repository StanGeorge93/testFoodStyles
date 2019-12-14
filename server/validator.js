const Validator = require("validator")

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  )
}

const validateLoginInput = (data) => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required"
  }

  return {
    errors,
    valid: isEmpty(errors)
  }
};

const validateRegisterInput = (data) => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required"
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must have 6 chars"
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required"
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password is required"
  }

  return {
    errors,
    valid: isEmpty(errors)
  }
};


module.exports = {
  validateLoginInput,
  validateRegisterInput
}