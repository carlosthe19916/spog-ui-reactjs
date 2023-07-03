import React from "react";

import {
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";

export const Home: React.FC = () => {
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Home</Text>
          <Text component="p">Search vulnerabilities</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.default}></PageSection>
    </>
  );
};
