const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  console.log(req.body);

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    console.log("user", user);
    if (!user) {
      res.status(400).json({ message: `Имэйл эсвэл нууц үг буруу байна` });
    }

    const checkPass = bcrypt.compareSync(req.body.password, user.password);

    if (!checkPass) {
      res.status(400).json({ message: `Имэйл эсвэл нууц үг буруу байна` });
    }

    const { _id, name, email, role } = user;

    const token = jwt.sign(
      { _id, name, email, role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 36000,
      }
    );

    res.status(200).json({ message: `Амжилттай нэвтэрлээ`, user, token });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(200).json({ message: `Амжилттай бүртгэгдлээ`, user });
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
  register,
};
