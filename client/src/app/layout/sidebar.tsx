import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  PageSidebar,
} from "@patternfly/react-core";
import { css } from "@patternfly/react-styles";
import ExternalLinkSquareAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon";

import { LayoutTheme } from "./layout-constants";

const ACTIVE_CLASS = "pf-v5-c-nav__link";

export const SidebarApp: React.FC = () => {
  const [isSearchSectionExpanded, setIsSearchSectionExpanded] = useState(true);

  const renderPageNav = () => {
    return (
      <Nav id="nav-sidebar" aria-label="Nav" theme={LayoutTheme}>
        <NavList>
          <NavItem>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return css(ACTIVE_CLASS, isActive ? "pf-m-current" : "");
              }}
            >
              Trusted Content
            </NavLink>
          </NavItem>
          <NavExpandable
            title="Search"
            groupId="search"
            isExpanded={isSearchSectionExpanded}
            onExpand={(_, isOpen) => setIsSearchSectionExpanded(isOpen)}
          >
            <NavItem>
              <NavLink
                to="/package"
                className={({ isActive }) => {
                  return css(ACTIVE_CLASS, isActive ? "pf-m-current" : "");
                }}
              >
                Packages
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/advisory"
                className={({ isActive }) => {
                  return css(ACTIVE_CLASS, isActive ? "pf-m-current" : "");
                }}
              >
                Advisories
              </NavLink>
            </NavItem>
          </NavExpandable>
          <NavExpandable title="Extend">
            <NavItem>
              <a
                href="https://api.trustification.dev/swagger-ui/"
                target="_blank"
              >
                API&nbsp;
                <ExternalLinkSquareAltIcon />
              </a>
            </NavItem>
            <NavItem>
              <a
                href="https://sbom.trustification.dev/swagger-ui/"
                target="_blank"
              >
                SBOM API&nbsp;
                <ExternalLinkSquareAltIcon />
              </a>
            </NavItem>
            <NavItem>
              <a
                href="https://vex.trustification.dev/swagger-ui/"
                target="_blank"
              >
                VEX API&nbsp;
                <ExternalLinkSquareAltIcon />
              </a>
            </NavItem>
          </NavExpandable>
        </NavList>
      </Nav>
    );
  };

  return <PageSidebar theme={LayoutTheme}>{renderPageNav()}</PageSidebar>;
};
