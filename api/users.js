import mongoose from 'mongoose';
import User from '../models/userModel';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  return mongoose.connect(process.env.MONGO_URI);
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const users = await User.find().select('name email phone -_id').lean();
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
      return res.status(400).json({ error: 'Missing fields' });

    try {
      const newUser = new User({ name, email, phone });
      await newUser.save();
      return res.status(201).json({ name, email, phone });
    } catch {
      return res.status(500).json({ error: 'Failed to add user' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
