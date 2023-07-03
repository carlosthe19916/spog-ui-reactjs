import React from "react";

import { AboutModal, TextContent } from "@patternfly/react-core";

import logo from "../images/logo.png";

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
      productName={"Chicken Cop"}
      brandImageAlt="Brand Image"
      brandImageSrc={logo}
      className="about-app__component"
    >
      <TextContent>
        <h4>About</h4>
      </TextContent>
    </AboutModal>
  );
};
