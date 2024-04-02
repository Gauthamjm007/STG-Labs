import AddIcon from "@mui/icons-material/Add";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { randomInt } from "@mui/x-data-grid-generator";

import Button from "@mui/material/Button";

import { createEmptyUserField } from "../../utils";

interface EditToolbarProps {
  updateUser: () => void;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

const [MIN_NUM, MAX_NUM] = [0, 1000];

export default function EditToolbar({
  setRows,
  setRowModesModel,
}: EditToolbarProps) {
  const handleClick = () => {
    const id = randomInt(MIN_NUM, MAX_NUM);
    setRows((oldRows) => [createEmptyUserField(id), ...oldRows]);
    setRowModesModel((oldModel) => ({
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      ...oldModel,
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
}
