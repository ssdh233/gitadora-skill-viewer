const convert = require("xml-js");
const fs = require("fs");

const sitemapSource = [
  {
    path: ""
  },
  {
    path: "/uservoice"
  }
]
  .concat(
    ["exchain", "matixx", "tbre", "tb"].map(version => ({
      path: `/${version}/list`
    }))
  )
  .concat(
    Array(13)
      .fill(1)
      .map((x, i) => i * 500 + 3000)
      .map(scope => [
        {
          path: `/exchain/kasegi/g/${scope}`,
          changefreq: "monthly"
        },
        {
          path: `/exchain/kasegi/d/${scope}`,
          changefreq: "monthly"
        }
      ])
      .reduce((acc, cur) => acc.concat(cur), [])
  );

const siteMapJs = {
  _declaration: {
    _attributes: {
      version: "1.0",
      encoding: "utf-8"
    }
  },
  urlset: {
    _attributes: {
      xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
      "xmlns:xhtml": "http://www.w3.org/1999/xhtml"
    },
    url: sitemapSource.map(source => {
      let result = {
        loc: `http://gsv.fun/ja${source.path}`,
        "xhtml:link": ["ja", "en", "zh"].map(lang => ({
          _attributes: {
            rel: "alternate",
            hreflang: lang,
            href: `http://gsv.fun/${lang}${source.path}`
          }
        }))
      };

      if (source.changefreq) {
        result = {
          ...result,
          changefreq: source.changefreq
        };
      }

      return result;
    })
  }
};

const sitemapXML = convert.js2xml(siteMapJs, { spaces: 2, compact: true });

fs.writeFileSync("sitemap.xml", sitemapXML);
