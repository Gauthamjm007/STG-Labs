import { Heading5 } from "../typography";
import BoxLayout from "./BoxLayout";

export default function TableErrorState() {
  return (
    <BoxLayout>
      <Heading5 gutterBottom py={2} color={"red"}>
        Error Loading API , Please refresh the page
      </Heading5>
    </BoxLayout>
  );
}
