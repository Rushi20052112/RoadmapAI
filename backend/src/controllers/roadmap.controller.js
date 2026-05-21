import { generateRoadmap } from "../services/gemini.service.js";
import RoadmapModel from "../models/roadmap.model.js";
import UserModel from "../models/user.model.js";


export async function createRoadmap(req, res) {
  const { targetRole, currentLevel, dailyHours } = req.body;
  const userId = req.userId; // from your auth middleware

  try {
    const user = await UserModel.findById(userId) // get user to check credits

    if (user?.credits < 1) {
      return res.status(403).json({ message: "Not enough credits. Please purchase more to generate a roadmap." });
    }
    // 1. Call Gemini
    const aiData = await generateRoadmap({ targetRole, currentLevel, dailyHours });

    // 2. Save to MongoDB
    const roadmap = await RoadmapModel.create({
      userId,
      targetRole,
      currentLevel,
      dailyHours,
      ...aiData,               // spread all Gemini fields
      progress: 0,
      currentWeek: 1,
    });

    if (user.plan!== "PRO") { // only deduct credits for non-PRO users
      user.credits -= 1; // deduct 1 credit per roadmap generation
      await user.save();
    }

    res.status(201).json(roadmap); // send full doc back to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate roadmap" });
  }
}

export async function getUserRoadmaps(req, res) {
  try {
    const roadmaps = await RoadmapModel.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(roadmaps);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch roadmaps"
    });
  }
}


export async function markWeekCompleted(req, res) {
  try {
    const { roadmapId, weekId } = req.params;

    const roadmap = await RoadmapModel.findOneAndUpdate(
      { _id: roadmapId, userId: req.userId, "weeks._id": weekId },
      { $set: { "weeks.$.completed": true } },
      { new: true }
    );

    res.status(200).json(roadmap);
  } catch (err) {
    res.status(500).json({ message: "Failed to update week" });
  }
}