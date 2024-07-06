const express = require("express");
const { CompanyModel, validateCompany } = require("../models/companyModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await CompanyModel.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/q6", async (req, res) => {
  const validBody = validateCompany(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const company = new CompanyModel(req.body);
    await company.save();
    res.json(company);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put("/q7/:name", async (req, res) => {
  let validBody = validateCompany(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const name = req.params.name;
    const data = await CompanyModel.updateOne({ name: name }, req.body);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete("/q8/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CompanyModel.deleteOne({ id: id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
// export default
module.exports = router;
