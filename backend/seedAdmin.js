// backend/seedAdmin.js
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB().then(async () => {
  const adminEmail = 'admin@thefolio.com';
  const defaultPassword = 'Admin@1234';
  const exists = await User.findOne({ email: adminEmail });

  if (exists) {
    const passwordMatches = await exists.matchPassword(defaultPassword);
    if (!passwordMatches) {
      exists.password = defaultPassword;
      await exists.save();
      console.log('Admin account exists. Password has been reset to the default value.');
    } else {
      console.log('Admin account already exists and password is correct.');
    }
    process.exit();
  }
  
  await User.create({
    name: 'TheFolio Admin',
    email: adminEmail,
    password: defaultPassword,
    role: 'admin'
  });
  
  console.log('Admin account created successfully!');
  console.log('Email: admin@thefolio.com');
  console.log('Password: Admin@1234');
  process.exit();
});