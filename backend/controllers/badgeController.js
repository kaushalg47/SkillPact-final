import Badge from "../models/badgeModel.js";
import User from "../models/userModel.js";

export const addBadge = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;

        // Validate the title against the allowed enum values
        const validTitles = ["Team Player", "Innovative", "Leadership"];
        if (!validTitles.includes(title)) {
            return res.status(400).json({ message: "Invalid badge title" });
        }

        // Check if the badge already exists
        const existingBadge = await Badge.findOne({ title });
        if (existingBadge) {
            return res.status(400).json({ message: "Badge already exists" });
        }

        const newBadge = new Badge({
            title,
            imageUrl: imageUrl || "", // Default value if not provided
        });

        await newBadge.save();
        res.status(201).json({ message: "Badge added successfully", badge: newBadge });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const addBadgeToUser = async (req, res) => {
  try {
    const { badgeId } = req.body;
    const userId = req.user._id;

    // Find the badge by ID
    const badge = await Badge.findById(badgeId);
    if (!badge) {
      return res.status(404).json({ message: "Badge not found" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has the badge
    if (user.badges.includes(badge._id)) {
      return res.status(400).json({ message: "User already has this badge" });
    }

    // Add the badge to the user's badges array
    user.badges.push(badge._id);
    await user.save();

    res.status(200).json({ message: "Badge added to user successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
