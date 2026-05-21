import mongoose from "mongoose";

const weekSchema = new mongoose.Schema({
  weekNumber: Number,
  title:      String,
  topics:     [String],
  project:    String,
  resources:  [String],
  completed:  { type: Boolean, default: false },
});

const roadmapSchema = new mongoose.Schema({
  userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:          String,
  targetRole:     String,
  currentLevel:   String,
  dailyHours:     Number,
  preferredStack: String,
  totalWeeks:     Number,
  weeks:          [weekSchema],
  technologies:   [String],
  interviewTopics:[String],
  projectIdeas:   [String],
  currentWeek:    { type: Number, default: 1 },
  progress:       { type: Number, default: 0 }, // percentage
}, { timestamps: true });

const RoadmapModel = mongoose.model("Roadmap", roadmapSchema);
export default RoadmapModel;