const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "email veya kullanıcı adı zaten kayıtlı!";
    return errors;
  }

  if (err.message === "emailfalse") {
    errors.email = "Bu email adresine kayıtlı hesap bulunamadı!";
  }

  if (err.message === "passwordfalse") {
    errors.password = "Girdiğiniz şifre hesapla eşleşmemektedir!";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 2 * 24 * 60 * 60; //2 gün

const createToken = (id) => {
  return jwt.sign({ id }, "alfateksecret", {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { email, password, fullname, username } = req.body;

  try {
    const user = await User.create({
      email,
      password,
      fullname,
      username,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });

    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
