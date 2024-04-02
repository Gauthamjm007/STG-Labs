import { FC } from "react";
import Container from "@mui/material/Container";
export const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Container maxWidth="md">{children}</Container>;
};
