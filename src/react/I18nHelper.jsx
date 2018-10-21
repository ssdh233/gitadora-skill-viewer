import React from "react";
import { Redirect } from "react-router";

class I18nHelper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: undefined
    };
  }

  componentDidMount() {
    // i18n.on("languageChanged", lng => {
    //   this.setState({
    //     language: lng
    //   });
    // });
  }

  componentWillUnmount() {
    // i18n.off("languageChanged");
  }

  render() {
    if (!this.state.language) {
      return <div />;
    }

    return <Redirect to={`/${this.state.language}`} />;
  }
}

export default I18nHelper;
