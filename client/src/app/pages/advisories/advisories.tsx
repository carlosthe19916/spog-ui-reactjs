import React from "react";

import {
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { useFetchAdvisories } from "@app/queries/advisories";
import {
  getApiRequestParams,
  useTableControlProps,
} from "@app/shared/hooks/table-controls";
import { useTableControlUrlParams } from "@app/shared/hooks/table-controls";
import {
  FilterToolbar,
  FilterType,
} from "@app/shared/components/FilterToolbar";
import { useSelectionState } from "@app/shared/hooks/useSelectionState";
import { SimplePagination } from "@app/shared/components/SimplePagination";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/shared/components/TableControls";

export const Advisories: React.FC = () => {
  const tableControlState = useTableControlUrlParams({
    columnNames: {
      id: "Id",
      title: "Title",
      revision: "Revision",
      download: "Download",
      vulnerabilities: "Vulnerabilities",
    },
    sortableColumns: ["revision", "vulnerabilities"],
    initialSort: null,
    filterCategories: [
      {
        key: "q",
        title: "Name",
        type: FilterType.search,
        placeholderText: "Search",
      },
    ],
    initialItemsPerPage: 10,
    hasClickableRows: true,
  });

  const {
    result: { data: currentPageItems, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchAdvisories(
    getApiRequestParams({
      ...tableControlState, // Includes filterState, sortState and paginationState
      apiSortFieldKeys: {
        revision: "revision",
        vulnerabilities: "vulnerabilities",
      },
    })
  );

  const tableControls = useTableControlProps({
    ...tableControlState, // Includes filterState, sortState and paginationState
    idProperty: "id",
    currentPageItems,
    totalItemCount,
    isLoading: isFetching,
    selectionState: useSelectionState({
      items: currentPageItems,
      isEqual: (a, b) => a.id === b.id,
    }),
  });

  const {
    numRenderedColumns,
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
      tableProps,
      getThProps,
      getTdProps,
      getClickableTrProps,
    },
    activeRowDerivedState: { activeRowItem, clearActiveRow },
  } = tableControls;

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Advisories</Text>
          <Text component="p">Search security advisories</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <div
          style={{
            backgroundColor: "var(--pf-v5-global--BackgroundColor--100)",
          }}
        >
          <Toolbar {...toolbarProps}>
            <ToolbarContent>
              <FilterToolbar {...filterToolbarProps} />
              <ToolbarItem {...paginationToolbarItemProps}>
                <SimplePagination
                  idPrefix="dependencies-table"
                  isTop
                  paginationProps={paginationProps}
                />
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>

          <Table {...tableProps} aria-label="Advisories table">
            <Thead>
              <Tr>
                <TableHeaderContentWithControls {...tableControls}>
                  <Th {...getThProps({ columnKey: "id" })} />
                  <Th {...getThProps({ columnKey: "title" })} />
                  <Th {...getThProps({ columnKey: "revision" })} />
                  <Th {...getThProps({ columnKey: "download" })} />
                  <Th {...getThProps({ columnKey: "vulnerabilities" })} />
                </TableHeaderContentWithControls>
              </Tr>
            </Thead>
            <ConditionalTableBody
              isLoading={isFetching}
              isError={!!fetchError}
              isNoData={totalItemCount === 0}
              numRenderedColumns={numRenderedColumns}
            >
              {currentPageItems?.map((item, rowIndex) => {
                return (
                  <Tbody key={item.id}>
                    <Tr {...getClickableTrProps({ item: item })}>
                      <TableRowContentWithControls
                        {...tableControls}
                        item={item}
                        rowIndex={rowIndex}
                      >
                        <Td width={25} {...getTdProps({ columnKey: "id" })}>
                          {item.id}
                        </Td>
                        <Td width={10} {...getTdProps({ columnKey: "title" })}>
                          {item.title}
                        </Td>
                        <Td
                          width={10}
                          {...getTdProps({ columnKey: "revision" })}
                        >
                          {item.date}
                        </Td>
                        <Td
                          width={10}
                          {...getTdProps({ columnKey: "download" })}
                        >
                          down
                        </Td>
                        <Td
                          width={10}
                          {...getTdProps({ columnKey: "download" })}
                        >
                          {item.cves}
                        </Td>
                      </TableRowContentWithControls>
                    </Tr>
                  </Tbody>
                );
              })}
            </ConditionalTableBody>
          </Table>

          <SimplePagination
            idPrefix="dependencies-table"
            isTop={false}
            paginationProps={paginationProps}
          />
        </div>
      </PageSection>
    </>
  );
};
