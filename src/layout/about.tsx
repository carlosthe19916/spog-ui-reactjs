import React from "react";

import { AboutModal, TextContent } from "@patternfly/react-core";

import logo from "../images/logo.svg";

interface IButtonAboutAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutApp: React.FC<IButtonAboutAppProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AboutModal
      isOpen={isOpen}
      onClose={onClose}
      brandImageAlt="Brand Image"
      brandImageSrc={logo}
      productName={"Name"}
      className="about-app__component"
    >
      <TextContent>
        <h4>About</h4>

      </TextContent>
    </AboutModal>
  );
};
