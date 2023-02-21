import React from "react";
import NextLink from "next/link";
import Link, { type LinkProps } from "@mui/material/Link";

export const MuiNextLink = (props: LinkProps): JSX.Element => {
  return <Link component={NextLink} {...props} />;
};
