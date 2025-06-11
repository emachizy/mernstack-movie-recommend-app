import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favorites: [
    {
      movieId: String,
      title: String,
      posterPath: String,
    },
  ],
});

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// export default mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
