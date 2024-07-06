const express = require("express");
const { PhoneModel, validatePhone } = require("../models/phoneModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await PhoneModel.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q1", async (req, res) => {
  const limit = Math.min(req.query.limit, 20) || 10;
  const sort = req.query.sort || "_id";
  const reverse = req.query.reverse == "yes" ? -1 : 1;
  try {
    const data = await PhoneModel.find({})
      .limit(limit)
      .sort({ [sort]: reverse });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q2", async (req, res) => {
  const limit = Math.min(req.query.limit, 20) || 5;
  try {
    const data = await PhoneModel.find({}).limit(limit).sort({ price: -1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q3", async (req, res) => {
  try {
    const data = await PhoneModel.find({})
      .limit(3)
      .skip(3)
      .sort({ total_score: -1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q4", async (req, res) => {
  try {
    const data = await PhoneModel.findOne({ name: "Mi 10" });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q5", async (req, res) => {
  try {
    const data = await PhoneModel.find({ gpu: { $regex: /Adreno/i } });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q9", async (req, res) => {
  try {
    const count = await PhoneModel.countDocuments();
    res.json({ count });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q10", async (req, res) => {
  try {
    const count = await PhoneModel.countDocuments({
      cpu: { $regex: /Qualcomm/i },
    });
    res.json({ count });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q11", async (req, res) => {
  try {
    const data = await PhoneModel.find({ price: { $gte: 1300, $lte: 2000 } })
      .limit(4)
      .sort({ price: 1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q12", async (req, res) => {
  try {
    const total_score = [79, 90, 86];
    const data = await PhoneModel.find({ total_score: { $in: total_score } });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q13", async (req, res) => {
  try {
    const data = await PhoneModel.find({}, { name: 1, total_score: 1, _id: 1 })
      .limit(10)
      .sort({ company_id: 1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q14", async (req, res) => {
  try {
    const data = await PhoneModel.find({
      $or: [
        {
          battery_score: "76",
          company_id: "2",
        },
      ],
    }).sort({ price: -1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q15", async (req, res) => {
  try {
    const data = await PhoneModel.find({
      $and: [
        {
          battery_score: "76",
          company_id: "4",
        },
      ],
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q16", async (req, res) => {
  try {
    const data = await PhoneModel.aggregate([
      {
        $group: {
          _id: "$company_id",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q17", async (req, res) => {
  try {
    const data = await PhoneModel.aggregate([
      {
        $group: {
          _id: "$company_id",
          avg_price: { $avg: "$price" },
        },
      },
    ]);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q18", async (req, res) => {
  try {
    const data = await PhoneModel.aggregate([
      {
        $group: {
          _id: "$company_id",
          min_price: { $min: "$price" },
        },
      },
    ]);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q19", async (req, res) => {
  try {
    const data = await PhoneModel.find().populate({
      path: "company_id",
      select: "name country",
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/q20", async (req, res) => {
  try {
    const data = await PhoneModel.find().sort({ price: -1 }).limit(5).populate({
      path: "company_id",
      select: "country",
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
// export default
module.exports = router;
