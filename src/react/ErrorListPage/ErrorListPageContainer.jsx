import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ErrorListPage from "./ErrorListPage.jsx";

const FETCH_ERRORS = gql`
  {
    errors {
      error
      userAgent
      version
      date
    }
  }
`;

function ErrorListPageContainer() {
  const { data } = useQuery(FETCH_ERRORS);
  return <ErrorListPage errors={data && data.errors} />;
}

export default ErrorListPageContainer;
