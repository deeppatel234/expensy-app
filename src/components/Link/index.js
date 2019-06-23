import React from "react";
import { Link } from "react-router-native";

import Button from "Components/Button";

const ButtonLink = ({ component, ...props }) => (
  <Link {...props} component={component || Button} />
);

ButtonLink.defaultProps = {
  appearance: "white",
  component: false
};

export default ButtonLink;
