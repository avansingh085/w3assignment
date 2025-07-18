import User from "../models/user.model.js";

// Create a new user if not already existing
export const createNewUser = async (username) => {
  const isExist = await User.findOne({ username });
  if (isExist) {
    return { success: false, message: "User already exists!" };
  }

  const newUser = await User.create({ username });
  return { success: true, message: "Successfully created", user: newUser };
};

// Get all users
export const getAllUsers = async () => {
  return await User.find().sort({ score: -1 }); // highest score first
};


// Add a random score (1 to 10) to a user
export const addRandomScore = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return { success: false, message: "Invalid user ID" };
  }

  // Generate a random integer from 1 to 10
  const randomScore = Math.floor(Math.random() * 10) + 1;

  user.score += randomScore;
  await user.save();

  return { success: true, message: "Added score successfully", newScore: user.score };
};
