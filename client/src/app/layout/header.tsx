import React, { useReducer } from "react";

import {
  Brand,
  Button,
  ButtonVariant,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/js/icons/bars-icon";
import QuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/question-circle-icon";

import { AboutApp } from "./about";
import logo from "../images/logo.png";

export const HeaderApp: React.FC = () => {
  const [isAboutOpen, toggleIsAboutOpen] = useReducer((state) => !state, false);

  return (
    <>
      <AboutApp isOpen={isAboutOpen} onClose={toggleIsAboutOpen} />

      <Masthead>
        <MastheadToggle>
          <PageToggleButton variant="plain" aria-label="Global navigation">
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadMain>
          <MastheadBrand>
            <Brand
              widths={{ default: "40px", md: "40px", "2xl": "50px" }}
              src={logo}
              alt="Logo"
            >
              <source media="(min-width: 768px)" srcSet={logo} />
              <source srcSet={logo} />
            </Brand>
          </MastheadBrand>
        </MastheadMain>
        <MastheadContent>
          <Toolbar isFullHeight isStatic>
            <ToolbarContent>
              <ToolbarGroup
                variant="icon-button-group"
                align={{ default: "alignRight" }}
                spacer={{ default: "spacerNone", md: "spacerMd" }}
              >
                <ToolbarGroup
                  variant="icon-button-group"
                  visibility={{ default: "hidden", lg: "visible" }}
                >
                  <ToolbarItem>
                    <Button
                      aria-label="Help"
                      variant={ButtonVariant.plain}
                      icon={<QuestionCircleIcon />}
                      onClick={toggleIsAboutOpen}
                    />
                  </ToolbarItem>
                </ToolbarGroup>
              </ToolbarGroup>
            </ToolbarContent>
          </Toolbar>
        </MastheadContent>
      </Masthead>
    </>
  );
};
