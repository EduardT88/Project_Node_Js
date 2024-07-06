const moogoose = require("mongoose");
const Joi = require("joi");

let schema = new moogoose.Schema(
  {
    id: String,
    name: String,
    country: String,
  },
  { timestamps: true }
);

exports.CompanyModel = moogoose.model("companies", schema);
exports.validateCompany = (_reqBody) => {
  let joiSchema = Joi.object({
    id: Joi.string().min(1).max(10).required(),
    name: Joi.string().min(2).max(100).required(),
    country: Joi.string().min(2).max(100).required(),
  });
  return joiSchema.validate(_reqBody);
};
