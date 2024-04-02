import UsersTable from "./UsersTable";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const Users = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h6" py={2}>
        Users
      </Typography>
      <UsersTable />
    </Container>
  );
};
