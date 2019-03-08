import React from "react";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default function withAsyncProp(loadData) {
  return function(WrappedComponent) {
    class WithAsyncProp extends React.Component {
      constructor(props) {
        super(props);
      }

      UNSAFE_componentWillReceiveProps(nextProps) {
        if (!this.props.isSSR) {
          if (nextProps.match !== this.props.match) {
            loadData(this.props.dispatch, nextProps.match);
          }
        }
      }

      componentDidMount() {
        if (!this.props.isSSR) {
          loadData(this.props.dispatch, this.props.match);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    WithAsyncProp.displayName = `WithAsyncProp(${getDisplayName(
      WrappedComponent
    )})`;

    return WithAsyncProp;
  };
}
