import React from "react";

import {
  Bullseye,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  LabelProps,
  Spinner,
  Tooltip,
  TreeView,
  TreeViewDataItem,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { useAdvisoryById } from "@app/queries/advisories";
import { Advisory, BaseSeverity, Branch } from "@app/api/models";

type BaseSeverityListType = {
  [key in BaseSeverity]: {
    labelProps: LabelProps;
  };
};
const baseSeverityList: BaseSeverityListType = {
  NONE: {
    labelProps: { color: "grey" },
  },
  LOW: {
    labelProps: { color: "orange" },
  },
  MEDIUM: {
    labelProps: { color: "orange" },
  },
  HIGH: {
    labelProps: { color: "red" },
  },
  CRITICAL: {
    labelProps: { color: "purple" },
  },
};

interface AdvisoryDetailsProps {
  advisory: Advisory;
}

export const AdvisoryDetails: React.FC<AdvisoryDetailsProps> = ({
  advisory,
}) => {
  const { result, isFetching } = useAdvisoryById(advisory.id || "");

  const branchToTreeViewDataItem = (branches: Branch[]) => {
    return branches.map((branch) => {
      let result: TreeViewDataItem = {
        name: (
          <Flex>
            <FlexItem spacer={{ default: "spacerSm" }}>{branch.name}</FlexItem>
            <FlexItem>
              <Label variant="outline" color="blue" isCompact>
                {branch.category}
              </Label>
            </FlexItem>
          </Flex>
        ),
        children: branch.branches
          ? branchToTreeViewDataItem(branch.branches)
          : undefined,
        defaultExpanded: true,
      };
      return result;
    });
  };

  if (isFetching) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  return (
    <>
      <Grid hasGutter>
        <GridItem md={6}>
          <Table aria-label="CVEs table" variant="compact">
            <Thead>
              <Tr>
                <Th>CVE ID</Th>
                <Th>Title</Th>
                <Th>Score</Th>
                <Th>CWE</Th>
              </Tr>
            </Thead>
            <Tbody>
              {result?.vulnerabilities.map((vulnerability) => (
                <Tr key={vulnerability.cve}>
                  <Td>{vulnerability.cve}</Td>
                  <Td>{vulnerability.title}</Td>
                  <Td>
                    {vulnerability.scores
                      .flatMap((item) => item.cvss_v3)
                      .map((item) => (
                        <Label
                          {...baseSeverityList[item.baseSeverity].labelProps}
                        >
                          {item.baseScore}
                        </Label>
                      ))}
                  </Td>
                  <Td>
                    {vulnerability.cwe ? (
                      <Tooltip content={vulnerability.cwe.name}>
                        <span>{vulnerability.cwe.id}</span>
                      </Tooltip>
                    ) : (
                      "N/A"
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </GridItem>
        <GridItem md={6}>
          <Table aria-label="Products table" variant="compact">
            <Thead>
              <Tr>
                <Th>Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(result?.product_tree.branches.length ?? 0) > 0 && (
                <TreeView
                  data={branchToTreeViewDataItem(
                    result?.product_tree.branches || []
                  )}
                  hasGuides
                  useMemo
                />
              )}
            </Tbody>
          </Table>
        </GridItem>
      </Grid>
    </>
  );
};
