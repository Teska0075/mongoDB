const User = require("../Model/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ message: "Hereglegchdiin medeelel oldloo", users });
  } catch (error) {
    res.status(400).json({
      message: "Hereglegchdiin medeelliig avahd aldaa garlaa",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, profileImg } = req.body;

  if (!name || !email || !password || !profileImg) {
    res
      .status(400)
      .json({ message: "Нэр, и-мэйл эсвэл нууц үг байхгүй байна." });
  }

  try {
    const user = await User.create({
      name,
      profileImg,
      email,
      password,
    });
    res.status(201).json({ message: "Amjilttai burtgelee", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Burtgel amjiltgui bolloo", error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} id-tai hereglegch oldsongui`,
      error: error.message,
    });
  }

  try {
    const user = await User.findById(id);
    res
      .status(201)
      .json({ message: `${id} id-tai hereglegchiin medeelel`, user });
  } catch (error) {
    res.status(400).json({ message: "Алдаа гарлаа", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id-tai hereglegch oldsongui`,
      error: error.message,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({
      message: `${id} id-tai hereglegchiin medeelel amjilttai shinechlegdlee`,
      user,
    });
  } catch (error) {
    res.status(400).json({ message: "Алдаа гарлаа", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id-tai hereglegch oldsongui`,
      error: error.message,
    });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    res.status(201).json({
      message: `${id} id-tai hereglegchiin medeelel amjilttai USTLAA`,
      user,
    });
  } catch (error) {
    res.status(400).json({ message: "Алдаа гарлаа", error: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
