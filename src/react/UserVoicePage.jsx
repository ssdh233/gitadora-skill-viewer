import React from "react";
import { FormattedMessage } from "react-intl";

class UserVoicePage extends React.Component {
  componentDidMount() {
    const {
      match: {
        url,
        params: { locale }
      }
    } = this.props;

    // eslint-disable-next-line no-unused-vars
    var disqus_config = function() {
      this.page.url = `http://gsv.fun/${locale}${url.substring(3)}`;
      this.page.identifier = "uservoice";
    };

    (function() {
      var d = document,
        s = d.createElement("script");
      s.src = "https://gsv-fun.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }

  render() {
    const {
      match: {
        params: { locale }
      }
    } = this.props;
    return (
      <div>
        <h1>User Voice</h1>
        <p>
          <FormattedMessage id="uservoice.message" />
        </p>
        {locale === "ja" && (
          <>
            <h2>既知の不具合</h2>
            <ul>
              <li>
                一部のAndroid Chromeではbookmarklet
                scriptが動かないため、スキルデータのアップロードができません。お手数ですがパソコンでのアップロードも試していただければと思います。
              </li>
            </ul>
          </>
        )}
        <div style={{ marginTop: 100 }} id="disqus_thread" />
      </div>
    );
  }
}

export default UserVoicePage;
