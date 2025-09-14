import { Follow } from "../models/follow.model.js";
import { User } from "../models/user.model.js";

const followOrUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "can't have id while follow " });
    }
    if (id.toString() == req.user._id.toString()) {
      return res.status(400).json({ msg: "you cannot follow yourself" });
    }

    const user = await User.findById(id);
    const hasFollow = await Follow.findOne({ followedTo: id });

    if (hasFollow) {
      await Follow.findByIdAndDelete(hasFollow._id);
      return res.status(400).json({ msg: "unFollow successfully" });
    }
    await Follow.create({
      followedTo: user._id,
      followedBy: req.user._id,
    });

    return res.status(200).json({ msg: "follow successfully" });
  } catch (error) {
    console.log(`something went wrong following : ${error.message}`);
  }
};

export { followOrUnfollowUser };
