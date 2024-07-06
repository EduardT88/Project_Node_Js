const indexR = require("./index");
const phonesR = require("./phones");
const companiesR = require("./companies");

exports.routesInit = (app) => {
  // הגדרת ראוטים לאיזה ראוטר הם שייכים
  app.use("/", indexR);
  app.use("/phones", phonesR);
  app.use("/companies", companiesR);
};
