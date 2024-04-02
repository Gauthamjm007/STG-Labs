import UsersTable from "./UsersTable";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const Users = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom py={2}>
        Users
      </Typography>
      <UsersTable />
    </Container>
  );
};
