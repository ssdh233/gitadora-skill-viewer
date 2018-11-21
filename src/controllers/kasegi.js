var pg = require("../modules/pg");

const sortByCount = (a, b) => b.count - a.count;
module.exports.controller = app => {
  app.get("/api/:ver/kasegi/:type/:scope", (req, res) => {
    const { ver, scope } = req.params;

    const type = {
      d: "drum",
      g: "guitar"
    }[req.params.type];

    pg.connect(
      process.env.DATABASE_URL,
      (err, client, done) => {
        const sql = `select * from kasegi where version=$$${ver}$$ and type=$$${type}$$ and scope=${scope};`;
        client.query(sql, (err, result) => {
          done();

          const kasegiResult = result.rows[0];

          if (kasegiResult) {
            const kasegiListHot = JSON.parse(kasegiResult.list_hot);
            const kasegiListOther = JSON.parse(kasegiResult.list_other);

            res.json({
              version: ver,
              type,
              scope,
              hot: kasegiListHot.sort(sortByCount),
              other: kasegiListOther.sort(sortByCount)
            });
          } else {
            res.json({
              version: ver,
              type,
              scope,
              sql,
              error: "NO DATA"
            });
          }
        });
      }
    );
  });
};
