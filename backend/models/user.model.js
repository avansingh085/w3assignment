import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  score: {
    type: Number,
    default: 0,
    min: [0, 'Score cannot be negative'],
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const User = mongoose.model('W3User', userSchema);

export default User;
