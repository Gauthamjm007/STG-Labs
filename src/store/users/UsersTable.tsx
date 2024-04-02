import Box from "@mui/material/Box";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useDeleteUsersMutation, useGetUsersQuery } from "./usersApiSlice";
import { capitalize } from "lodash";
import Avatar from "@mui/material/Avatar";

export default function UsersTable() {
  const { data, isLoading, isSuccess } = useGetUsersQuery(100);
  const [deleteUser] = useDeleteUsersMutation();

  const rows = useMemo(() => {
    return data?.map(({ id, name, hobby, location, avatar, createdAt }) => {
      return {
        id,
        name,
        hobby,
        location,
        avatar,
        createdAt,
      };
    }) as GridRowsProp;
  }, [data]);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  //   const handleDeleteClick = (id: GridRowId) => () => {
  const handleDeleteClick = (id: GridRowId) => () => {
    id = String(id);
    deleteUser(id);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      //   setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Picture",
      width: 100,
      editable: false,
      type: "custom",
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          width={"100%"}
          height={"100%"}
          justifyContent={"center"}
        >
          <Avatar src={params.value} sx={{ width: 36, height: 36 }} />
        </Box>
      ),
      valueGetter: (value) => value,
      align: "center",
      headerAlign: "center",
    },
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "string",
      width: 140,
      align: "left",
      headerAlign: "left",
      editable: false,
      valueFormatter: (value) => new Date(value).toJSON().slice(0, 10),
    },
    {
      field: "hobby",
      headerName: "Hobby",
      type: "string",
      width: 100,
      editable: true,
      valueFormatter: (value) => capitalize(value),
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "ABU DHABI",
        "AMSTERDAM",
        "AUSTIN",
        "BARCELONA",
        "BENGALURU",
        "BRASÍLIA",
        "BRUSSELS",
        "BUENOS AIRES",
      ],
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  if (isSuccess) {
    return (
      <Box
        sx={{
          height: 600,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          loading={isLoading}
        />
      </Box>
    );
  }
  return null;
}
