const moogoose = require("mongoose");
const Joi = require("joi");

let schema = new moogoose.Schema(
  {
    name: String,
    cpu: String,
    company_id: String,
    gpu: String,
    battery_score: String,
    total_score: String,
    price: Number,
  },
  { timestamps: true }
);

exports.PhoneModel = moogoose.model("phones", schema);
exports.validatePhone = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    cpu: Joi.string().min(2).max(500).required(),
    company_id: Joi.string().min(2).max(100).required(),
    gpu: Joi.string().min(2).max(1000).required(),
    battery_score: Joi.string().min(2).max(100).required(),
    total_score: Joi.string().min(2).max(1000).required(),
    price: Joi.number().min(2).max(10000).required(),
  });
  return joiSchema.validate(_reqBody);
};
