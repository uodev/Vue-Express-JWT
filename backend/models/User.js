const mongoose = require("mongoose");
const { isEmail } = require("validator"); // email ve şifrenin gereksinimleri
const bcrypt = require("bcrypt"); //şifreyi hashleme

const userSchema = new mongoose.Schema({
  fullname: {
    required: [true, "Ad kısmı boş kalamaz"],
    type: String,
  },
  username: {
    required: [true, "Kullanıcı adı kısmı boş kalamaz"],
    type: String,
    unique: true,
    minlength: [6, "6'dan kısa şifre giremezsiniz!"],
  },
  email: {
    required: [true, "E-mail adresi boş kalamaz"],
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, "geçerli bir e-mail giriniz"],
  },
  password: {
    required: [true, "Şifre boş kalamaz"],
    type: String,
    minlength: [6, "6'dan kısa şifre giremezsiniz!"],
  },
});

//! password hashed before user save database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("passwordfalse");
  }
  throw Error("emailfalse");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
