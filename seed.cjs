const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Hackathon = require('./api/models/Hackathon');
const User = require('./api/models/User');

const hackathons = [
  {
    "name": "Hackathon 1",
    "startDate": "2024-01-15T09:00:00.000Z",
    "endDate": "2024-01-17T18:00:00.000Z",
    "techStack": ["React", "Node.js", "MongoDB"]
  },
  {
    "name": "Hackathon 2",
    "startDate": "2024-02-10T10:00:00.000Z",
    "endDate": "2024-02-12T19:00:00.000Z",
    "techStack": ["Angular", "Express", "PostgreSQL"]
  },
  {
    "name": "Hackathon 3",
    "startDate": "2024-03-.05T08:30:00.000Z",
    "endDate": "2024-03-07T17:30:00.000Z",
    "techStack": ["Vue.js", "Django", "MySQL"]
  }
];

const users = [
  {
    name: 'rahul',
    email: 'rahul@example.com',
    password: 'password123'
  },
  {
    name: 'jane',
    email: 'jane@example.com',
    password: 'password123'
  }
];

async function seedData() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    console.log('MongoDB connected successfully');
    await Hackathon.insertMany(hackathons);
    console.log('Hackathon data seeded successfully');
    await User.insertMany(users);
    console.log('User data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.connection.close();
    await mongod.stop();
  }
}

seedData();
