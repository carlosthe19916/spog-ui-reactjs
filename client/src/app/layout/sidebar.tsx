import React from "react";
import { NavLink } from "react-router-dom";

import {
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  PageSidebar,
} from "@patternfly/react-core";
import { css } from "@patternfly/react-styles";

import { LayoutTheme } from "./layout-constants";

export const SidebarApp: React.FC = () => {
  const renderPageNav = () => {
    return (
      <Nav id="nav-sidebar" aria-label="Nav" theme={LayoutTheme}>
        <NavList>
          <NavItem
            preventDefault
            itemId="ungrouped_item-1"
            // isActive={activeItem === "ungrouped_item-1"}
          >
            Trusted Content
          </NavItem>
          <NavExpandable
            title="Search"
            groupId="search"
            // isActive={activeGroup === "nav-mixed-group-2"}
          >
            <NavItem preventDefault>Packages</NavItem>
            <NavItem preventDefault>Advisores</NavItem>
            <NavItem preventDefault>
              <NavLink
                to="/vulnerability"
                className={({ isActive }) =>
                  css("pf-c-nav__link", isActive ? "pf-m-current" : "")
                }
              >
                Vulnerabilities
              </NavLink>
            </NavItem>
          </NavExpandable>
          <NavExpandable title="Extend">
            <NavItem preventDefault>API</NavItem>
          </NavExpandable>
        </NavList>
      </Nav>
    );
  };

  return <PageSidebar theme={LayoutTheme}>{renderPageNav()}</PageSidebar>;
};
