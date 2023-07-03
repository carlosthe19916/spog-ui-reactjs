import React from "react";

import {
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";
import { useFetchVulnerabilities } from "@app/queries";

export const Vulnerabilities: React.FC = () => {
  const { isFetching } = useFetchVulnerabilities({ page: 1, size: 10 });

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Vulnerabilities</Text>
          <Text component="p">Search vulnerabilities</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.default}>content</PageSection>
    </>
  );
};
