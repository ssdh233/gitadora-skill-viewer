import React from "react";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default function withMediaQuery(WrappedComponent) {
  class WithMediaQuery extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        mediaQuery: "sp"
      };
    }

    componentDidMount() {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => {
      this.setState({
        mediaQuery: window.matchMedia("(max-width: 742px)").matches
          ? "sp"
          : "pc"
      });
    };

    render() {
      return (
        <WrappedComponent mediaQuery={this.state.mediaQuery} {...this.props} />
      );
    }
  }
  WithMediaQuery.displayName = `WithMediaQuery(${getDisplayName(
    WrappedComponent
  )})`;

  return WithMediaQuery;
}
