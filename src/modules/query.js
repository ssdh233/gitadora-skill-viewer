const URLSearchParams = require("url-search-params");

function queryParser(url) {
  const queryString = url.split("?")[1];
  const query = {};

  if (queryString) {
    let searchParams = new URLSearchParams(queryString);
    for (let param of searchParams) {
      query[param[0]] = param[1];
    }
  }

  return query;
}

module.exports = queryParser;
