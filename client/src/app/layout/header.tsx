import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/js/icons/bars-icon";

import { AboutApp } from "./about";

export const HeaderApp: React.FC = () => {
  const navigate = useNavigate();

  const [isAboutOpen, toggleIsAboutOpen] = useReducer((state) => !state, false);
  const [isMobileDropdownOpen, toggleIsMobileDropdownOpen] = useReducer(
    (state) => !state,
    false
  );

  return (
    <>
      <AboutApp isOpen={isAboutOpen} onClose={toggleIsAboutOpen} />
      <Masthead id="basic-example">
        <MastheadToggle>
          <Button
            variant="plain"
            onClick={() => {}}
            aria-label="Global navigation"
          >
            <BarsIcon />
          </Button>
        </MastheadToggle>
        <MastheadMain>
          <MastheadBrand>Logo</MastheadBrand>
        </MastheadMain>
        <MastheadContent>
          <span>Content</span>
        </MastheadContent>
      </Masthead>
    </>
  );
};
