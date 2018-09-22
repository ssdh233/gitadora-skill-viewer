module.exports.controller = function(app) {
  app.get("/:id/d", function(req, res) {
    res.redirect(`/tb/${req.params.id}/d`);
  });

  app.get("/:id/g", function(req, res) {
    res.redirect(`/tb/${req.params.id}/g`);
  });
};
