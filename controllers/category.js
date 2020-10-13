const { Category } = require("../models/category");

exports.GetAllCategories = async (req, res, next) => {
  try {
    let data = await Category.find();

    res.status(200).json({
      success: true,
      message: "Successfully retrieve categories!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Create = async (req, res, next) => {
  try {
    const { name } = req.body;
    let data = await Category.create({ name: name });

    res.status(201).json({
      success: true,
      message: "Successfully create a category!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID params" });

    const category = await Category.findById(id);

    if (!category)
      return next({ message: `There is no category with _id:${id}` });

    // update inputs
    const { name } = req.body;
    let obj = {};

    if (name) obj.name = name;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: obj },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: "Successfully update a category!",
      data: updatedCategory,
    });
  } catch (err) {
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID params" });

    const category = await Category.findById(id);

    if (!category) return next({ message: `There is no user with _id:${id}` });

    await Category.findByIdAndRemove(id, function (error, doc, result) {
      if (error) throw "Failed To delete ";
      if (!doc) {
        return res.status(400).json({ success: false, err: "Data not found" });
      }
      return res.status(200).json({ success: true, data: doc });
    });
  } catch (err) {
    next(err);
  }
};
