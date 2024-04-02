import CircularProgress from "@mui/material/CircularProgress";
import BoxLayout from "./BoxLayout";

export default function TableLoadingState() {
  return (
    <BoxLayout>
      <CircularProgress />
    </BoxLayout>
  );
}
