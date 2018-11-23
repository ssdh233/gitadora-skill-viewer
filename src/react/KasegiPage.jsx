import React from "react";
import Radium from "radium";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";

import KasegiTable from "./KasegiTable.jsx";

class KasegiPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.fetchKasegiData();
  }

  fetchKasegiData = () => {
    const sortByCount = (a, b) => b.count - a.count;
    const processData = (data, index) => {
      const { diff, part, diffValue, averageSkill, ...rest } = data;

      let displayedDiff = `${diffValue} ${diff}`;
      if (part !== "D") {
        displayedDiff = `${displayedDiff}-${part}`;
      }

      const averageAchieve =
        ((averageSkill / (diffValue * 20)) * 100).toFixed(2) + "%";

      let displayedAverageSkill = `${averageSkill} (${averageAchieve})`;
      return {
        index: index + 1,
        diff,
        displayedDiff,
        displayedAverageSkill,
        ...data
      };
    };

    const { ver, type, scope } = this.props.match.params;
    fetch(`/api/${ver}/kasegi/${type}/${scope}`)
      .then(res => res.json())
      .then(rawData => {
        const { hot, other, ...rest } = rawData;

        return {
          ...rest,
          hot: hot && hot.sort(sortByCount).map(processData),
          other: other && other.sort(sortByCount).map(processData)
        };
      })
      .then(data => {
        this.setState({ data });
      });
  };

  render() {
    const { data } = this.state;
    const {
      intl: { formatMessage },
      match: {
        params: { ver, type, scope }
      }
    } = this.props;

    const typeTitle = type === "d" ? "Drummania" : "Guitarfreaks";
    const typeTitleShort = type === "d" ? "DRUM" : "GUITAR";
    const scopeTitle = `${scope} ~ ${parseInt(scope) + 500}`;

    const title = `${typeTitle}${formatMessage({
      id: "kasegi.title"
    })} ${scopeTitle}`;
    return (
      <div style={styles.kasegiPage}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={`TODO`} />
          <title>{`${title} | Gitadora Skill Viewer`}</title>
        </Helmet>
        <h1 style={styles.title}>{title}</h1>
        {data && data.other && (
          <div style={styles.notLastDiv}>
            <div style={styles.caption}>{`${typeTitleShort} OTHER`}</div>
            <KasegiTable data={data.other} />
          </div>
        )}
        {data && data.hot && (
          <div>
            <div style={styles.caption}>{`${typeTitleShort} HOT`}</div>
            <KasegiTable data={data.hot} />
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  kasegiPage: {
    maxWidth: 800,
    fontFamily: "verdana" // TODO move this to global css? or app component
  },
  title: {
    fontSize: 24
  },
  notLastDiv: {
    marginBottom: 20
  },
  caption: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5
  }
};

export default injectIntl(Radium(KasegiPage));
