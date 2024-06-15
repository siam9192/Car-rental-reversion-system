import { Schema, model } from 'mongoose';
import { TUser, TUserStaticMethods } from './user.interface';
import { UserRoles } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';
const userModelSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: 0,
      required: true,
    },
    role: {
      type: String,
      enum: UserRoles,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userModelSchema.statics.isUserExists = async (userId) => {
  return await User.findById(userId);
};

userModelSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
});
userModelSchema.post('save', function () {
  this.password == ""
});

export const User = model<TUser, TUserStaticMethods>('User', userModelSchema);
