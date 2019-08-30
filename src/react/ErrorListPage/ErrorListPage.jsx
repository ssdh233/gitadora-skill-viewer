import React from "react";
import styled from "styled-components";

function ErrorListPage({ errors }) {
  if (!errors) return null;
  return errors.map((error, index) => {
    return (
      <ErrorSection key={index}>
        <div>{error.version}</div>
        <div>{error.error}</div>
        <div>{error.date}</div>
        <div>{error.userAgent}</div>
      </ErrorSection>
    );
  });
}

const ErrorSection = styled.div`
  margin-bottom: 20px;
`;

export default ErrorListPage;
