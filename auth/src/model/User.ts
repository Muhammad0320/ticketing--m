import mongoose from "mongoose";
import { Password } from "../services/password";

export interface UserType {
  email: string;
  password: string;
}

export type UserDoc = mongoose.Document & UserType;

interface UserModel extends mongoose.Model<UserDoc> {
  buildUser(attrs: UserType): Promise<UserDoc>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__V;
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified()) this.password = await Password.toHash(this.password);

  next();
});

userSchema.statics.buildUser = async (attrs: UserType) => {
  const user = await User.create({
    email: attrs.email,
    password: attrs.password,
  });

  return user;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
