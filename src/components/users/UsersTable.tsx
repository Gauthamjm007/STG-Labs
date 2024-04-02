import Box from "@mui/material/Box";
import { useEffect, useMemo, useState } from "react";
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
  GridSlots,
  GridRowParams,
} from "@mui/x-data-grid";

import {
  UsersApiResponse,
  useAddUsersMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
  useUpdateUsersMutation,
} from "../../store/users/usersApiSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { USER_LOCATIONS } from "../../constants";
import { ICONS } from "../../components/icons";
import { TableErrorState, TableLoadingState, EditToolbar } from ".";
import { getDatefromIsoString } from "../../utils";
import { Avatar } from "../common/Avatar";
import { groupBy, map } from "lodash";
import { Heading5 } from "../typography";
import Tooltip from "../common/Tooltip";

export default function UsersTable() {
  const { data, isLoading, isSuccess, isError } = useGetUsersQuery(100);
  const [deleteUser] = useDeleteUsersMutation();
  const [updateUser] = useUpdateUsersMutation();
  const [addNewUser] = useAddUsersMutation();

  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const _row = data?.map(
      ({ id, name, hobby, location, avatar, createdAt }) => {
        return {
          id,
          name,
          hobby,
          location,
          avatar,
          createdAt,
        };
      }
    ) as GridRowsProp;
    setRows(_row);
  }, [data]);

  const groupByLocation = useMemo(() => {
    return map(groupBy(data, "location"), (value, key) => ({ key, value }));
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

  const handleSaveClick = (data: GridRowParams<GridRowsProp>) => () => {
    setRowModesModel({
      ...rowModesModel,
      [data.id]: { mode: GridRowModes.View },
    });
  };

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
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (updatedRow: GridRowModel) => {
    if (updatedRow.isNew) {
      addNewUser(updatedRow as UsersApiResponse);
    } else {
      updateUser(updatedRow as UsersApiResponse);
    }

    updatedRow = { ...updatedRow, isNew: false };
    setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
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
      renderCell: (params) => <Avatar src={params.value} />,
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
      valueFormatter: (value) => getDatefromIsoString(value),
    },
    {
      field: "hobby",
      headerName: "Hobby",
      type: "string",
      width: 100,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: USER_LOCATIONS,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (data) => {
        const isInEditMode = rowModesModel[data.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<ICONS.SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(data)}
            />,
            <GridActionsCellItem
              icon={<ICONS.CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(data.id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<ICONS.EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(data.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ICONS.DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(data.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const heading = useMemo(() => {
    return (
      <Tooltip
        content={
          <>
            <List>
              {groupByLocation.map((item) => (
                <ListItem key={item.key}>
                  {item.key} : {item.value.length}
                </ListItem>
              ))}
            </List>
          </>
        }
      >
        <Heading5 py={2}>Users</Heading5>
      </Tooltip>
    );
  }, [groupByLocation]);
  if (isError) {
    return (
      <>
        {heading}
        <TableErrorState />
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        {heading}
        <TableLoadingState />
      </>
    );
  }
  if (isSuccess && rows?.length > 0) {
    return (
      <>
        {heading}
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
            loading={isLoading || rows?.length == 0}
            slots={{
              toolbar: EditToolbar as GridSlots["toolbar"],
            }}
            slotProps={{
              toolbar: { updateUser, setRows, setRowModesModel },
            }}
          />
        </Box>
      </>
    );
  }
  return null;
}
