const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const addRootUser = async () => {
  const rootEmail = process.env.ROOT_EMAIL; // Access root email from .env file
  const rootPassword = process.env.ROOT_PASSWORD; // Access root password from .env file

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingUser = await User.findOne({ email: rootEmail });
    if (existingUser) {
      console.log('Root user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(rootPassword, 10);
    const rootUser = new User({
      name: 'Root User',
      email: rootEmail,
      password: hashedPassword,
      pending: false,
      role: 'root',
      rollNumber: '0000',
      passoutBatch: '0000',
      contactNumber: '0000000000',
    });

    await rootUser.save();
    console.log('Root user added successfully');
  } catch (error) {
    console.error('Error adding root user:', error);
  } finally {
    mongoose.connection.close();
  }
};

addRootUser();