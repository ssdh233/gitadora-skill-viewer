module.exports.controller = function(app) {
  app.get("/:id/p", function(req, res) {
    res.redirect(`/tb/${req.params.id}/p`);
  });
};
