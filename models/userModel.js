import mongoose from "mongoose";
import bcyrpt from "bcrypt";

export const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  likedPostId: {
    type: Array,
  },
  name: {
    type: String,
    required: true,
  },
  surName: {
    type: String,
    required: true,
  },

  birthDate: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  atName: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Email address is required"],
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
});

userSchema.statics.login = async function (userName, password) {
  console.log("login kısmına giriyor");
  const user = this;
  const isExist = await user.findOne({ userName });
  if (isExist) {
    console.log("isEXist", isExist);

    const auth = await bcyrpt.compare(password, isExist.password);
    if (auth) {
      console.log("auth", auth);
      return isExist;
    } else {
      console.log("sifre yok");
    }
  } else {
    console.log("kullnaıcı yok");
  }
};

userSchema.pre("save", function (next) {
  const user = this;
  console.log("şifre gizlidir", this.password);

  if (this.isModified("password") || this.isNew) {
    bcyrpt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcyrpt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

const User = mongoose.model("Users", userSchema);
export default User;
