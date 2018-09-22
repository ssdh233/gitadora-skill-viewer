module.exports.controller = function(app) {
  app.get("", function(req, res) {
    res.render("react");
  });
  app.get("/old/", function(req, res) {
    res.render("index");
  });
};
