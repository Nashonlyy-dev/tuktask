// scripts/migrateTasksUserId.js
const mongoose = require("mongoose");
const Task = require("../app/models/Task.model");

async function migrateUserId() {
  await mongoose.connect(process.env.MONGO_URI);

  const tasks = await Task.find({});

  for (const task of tasks) {
    if (typeof task.userId === "string") {
      task.userId = new mongoose.Types.ObjectId(task.userId);
      await task.save();
      console.log(`Migrated task ${task._id}`);
    }
  }

  console.log("Migration done");
  process.exit(0);
}

migrateUserId();
