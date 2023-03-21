const Travel = require("../Model/Travel");

const getAllTravel = async (req, res, next) => {
  try {
    const travels = await Travel.find({});
    res.status(201).json({ message: "Traveluudiin medeelel", travels });
  } catch (error) {
    res.status(400).json({
      message: "Traveluudiin medeelliig avahd aldaa garlaa",
      error: error.message,
    });
  }
};

const createTravel = async (req, res, next) => {
  const {
    title,
    travelDetail,
    travelImg,
    travelPrice,
    travelLocation,
    travelDay,
  } = req.body;

  if (
    !title ||
    !travelDetail ||
    !travelImg ||
    !travelPrice ||
    !travelLocation ||
    !travelDay
  ) {
    res.status(400).json({ message: "Ymar negen medeelel buruu bna" });
  }

  try {
    const travel = await Travel.create({
      title,
      travelDetail,
      travelImg,
      travelPrice,
      travelLocation,
      travelDay,
    });
    res.status(201).json({ message: "Amjilttai burtgelee", travel });
  } catch (error) {
    // res
    //   .status(400)
    //   .json({ message: "Burtgel amjiltgui bolloo", error: error.message });
    next(error);
  }
};

const getTravel = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} id-tai travel oldsongui`,
      error: error.message,
    });
  }

  try {
    const travel = await Travel.findById(id);
    res
      .status(201)
      .json({ message: `${id} id-tai traveliin medeelel`, travel });
  } catch (error) {
    res.status(400).json({ message: "Алдаа гарлаа", error: error.message });
  }
};

const updateTravel = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id-tai travel oldsongui`,
      error: error.message,
    });
  }

  try {
    const travel = await Travel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: `${id} id-tai traveliin medeelel amjilttai shinechlegdlee`,
      travel,
    });
  } catch (error) {
    res.status(400).json({ message: "Алдаа гарлаа", error: error.message });
  }
};

const deleteTravel = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id-tai travel oldsongui`,
      error: error.message,
    });
  }

  try {
    const travel = await Travel.findByIdAndDelete(id);
    res.status(201).json({
      message: `${id} id-tai traveliin medeelel amjilttai USTLAA`,
      travel,
    });
  } catch (error) {
    res.status(400).json({ message: "Алдаа гарлаа", error: error.message });
  }
};

module.exports = {
  getAllTravel,
  createTravel,
  getTravel,
  updateTravel,
  deleteTravel,
};
