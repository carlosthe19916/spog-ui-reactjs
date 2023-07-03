import React from "react";

import {
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";

export const Packages: React.FC = () => {
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Packages</Text>
          <Text component="p">Search vulnerabilities</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.default}>content</PageSection>
    </>
  );
};
