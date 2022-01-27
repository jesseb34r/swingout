import * as React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";

interface FooterBreadcrumbsProps {
  breadcrumbs: string[];
}

const FooterBreadcrumbs = ({ breadcrumbs }: FooterBreadcrumbsProps) => {
  return (
    <Breadcrumbs
      color="grey.600"
      separator="|"
      sx={{ alignSelf: "center", mb: "5px" }}
    >
      {breadcrumbs.map((breadcrumbsText) => (
        <Link
          key={breadcrumbsText}
          color="primary.contrastText"
          sx={{ textAlign: "center" }}
          href="#"
          variant="body2"
          underline="hover"
        >
          {breadcrumbsText}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

interface FooterCopyrightProps {
  content: string;
}

const FooterCopyright = ({ content }: FooterCopyrightProps) => {
  return (
    <Typography
      variant="body2"
      color="primary.contrastText"
      sx={{ textAlign: "center" }}
    >
      {content}
    </Typography>
  );
};

const MyFooter = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.main",
        padding: "30px 50px 30px 50px",
      }}
    >
      <FooterBreadcrumbs
        breadcrumbs={["Privacy Policy", "Terms & Conditions", "Cookies"]}
      />
      <FooterCopyright content="SwingOut is unofficial Fan Content permitted under the Fan Content Policy." />
      <FooterCopyright content="Not approved/endorsed by Wizards." />
      <FooterCopyright content="Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC." />
    </Box>
  );
};

export default MyFooter;
