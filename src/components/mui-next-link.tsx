import NextLink from "next/link";
import Link, { LinkProps } from "@mui/material/Link";

export const MuiNextLink = (props: LinkProps) => {
  return <Link component={NextLink} {...props} />;
};
