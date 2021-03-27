import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enums: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//   } catch (err) {
//     next(err);
//   }
// });

// userSchema.pre("save", function (next) {
//   try {
//     if (!this.isModified("name")) {
//       return next();
//     }
//     const formattedName = this.name
//       .split(" ")
//       .map((name) => name[0].toUpperCase() + name.slice(1))
//       .join(" ");
//     this.name = formattedName;
//   } catch (err) {
//     next(err);
//   }
// });

userSchema.methods.isValidPassword = async function (
  enteredPassword,
  userPassword
) {
  try {
    return await bcrypt.compare(enteredPassword, userPassword);
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userSchema);

export default User;