const User = require("../Model/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ message: "Hereglegchdiin medeelel oldloo", users });
  } catch (error) {
    // res.status(400).json({
    //   message: "Hereglegchdiin medeelliig avahd aldaa garlaa",
    //   error: error.name,
    // });
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, profileImg } = req.body;

  if (!name || !email || !password || !profileImg) {
    res
      .status(400)
      .json({ message: "Нэр, и-мэйл эсвэл нууц үг байхгүй байна." });
    // throw new Error("Нэр, и-мэйл эсвэл нууц үг байхгүй байна.");
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
    // res
    //   .status(400)
    //   .json({ message: "Burtgel amjiltgui bolloo", error: error.message });
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  // if (!id) {
  //   res.status(400).json({
  //     message: `${id} id-tai hereglegch oldsongui`,
  //     error: error.message,
  //   });
  // }

  try {
    const user = await User.findById(id);

    if (user === null) {
      res.status(404).json({ message: "No data." });
    } else {
      res
        .status(201)
        .json({ message: `${id} id-tai hereglegchiin medeelel`, user });
    }
  } catch (error) {
    // res.status(400).json({ message: "Алдаа гарлаа", error: error.message });
    next(error);
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
    next(error);
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
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });
    if (!user.length) {
      res.status(400).json({ message: `E-mail esvel password buruu bna` });
    }
    res.status(201).json({
      message: `${email} emailtei hereglegch amjilttai nevterlee`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
};
