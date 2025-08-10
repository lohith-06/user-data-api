const userService = require('../services/userService');
const { userSchema } = require('../validation/userValidation');

const getUsers = async (req, res) => {
  try {
    const users = await userService.fetchUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const addUser = async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newUser = await userService.createUser(value);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
};

module.exports = { getUsers, addUser };
