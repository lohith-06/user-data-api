const User = require('../models/userModel');

const fetchUsers = async () => {
  return await User.find().select('name email phone -_id').lean();
};

const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return { name: user.name, email: user.email, phone: user.phone };
};

module.exports = { fetchUsers, createUser };
