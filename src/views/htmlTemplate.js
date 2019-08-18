const htmlTemplate = ({
  helmet,
  content,
  appString,
  bundleFileName,
  googleSiteVerfication,
  cssForMui,
  client
}) => {
  return `
<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${helmet.style.toString()}
    <link rel="preload" href="/bundle/${bundleFileName}" as="script" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="google-site-verification" content="${googleSiteVerfication}" />
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Andada" />
    <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css" />
    <script type='text/javascript' src="http://cdn.jsdelivr.net/jquery/3.1.1/jquery.min.js" defer></script>
    <script type='text/javascript' src="/js/google_analytics.js" defer></script>
  </head>
  <body>
    <div id="app">${content}</div>
    <style id="jss-server-side">${cssForMui}</style>
    <script>
      window.App=\`${appString}\`;
      window.__APOLLO_STATE__ = ${JSON.stringify(client.extract())};
    </script>
    <script src="/bundle/${bundleFileName}" type="text/javascript"></script>
  </body>
</html>
`;
};

export default htmlTemplate;
