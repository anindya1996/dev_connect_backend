const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error(`name is not valid!!`);
  } else if (!validator.isEmail(email)) {
    throw new Error(`Email is not valid`);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      `Password must contain 1 capital letter,1 small letter,1 special case & 1 number and between 8 to 16 letters`
    );
  }
};

const validateEditProfileData = (req) => {
  const { lastName, skills, about } = req.body;

  const allowedEditFields = [
    "lastName",
    "about",
    "skills",
    "photoUrl",
    "firstName",
    "gender",
    "age",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  console.log(isEditAllowed);

  if (lastName && lastName.length > 20) {
    throw new Error(`Last Name should be less than equal to 20 letters!!`);
  }

  if (Array.isArray(skills) && skills.length > 10) {
    throw new Error(`Skills cannot be more than 10`);
  }

  if (about && about.length > 100) {
    throw new Error(`About should be less than or equal to 100 characters`);
  }

  return isEditAllowed;
};

module.exports = { validateSignupData, validateEditProfileData };
