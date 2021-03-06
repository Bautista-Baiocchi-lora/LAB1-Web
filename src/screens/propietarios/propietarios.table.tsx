import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { disablePropietario } from "../../requests/propietarios.requests";
import { usePropietarioSelector } from "../../storage/app.selectors";
import { Action } from "../../storage/dispatch.actions";
import { Propietario } from "../../storage/propietarios.reducer";

const PropietariosTable = (props) => {
  const [cookie] = useCookies();
  const propietarios: Propietario[] = usePropietarioSelector(
    (state) => state?.propietarios
  );
  const loading: boolean = usePropietarioSelector((state) => state?.loading);
  const dispatch = useDispatch();

  const edit_actions = {
    isEditable: (rowData) => false,
    isDeletable: (rowData) => true,
    onRowDelete: (oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          disablePropietario(
            oldData.id,
            oldData.dev_id,
            oldData.lote_id,
            cookie.session.token
          ).then((response) => {
            if (response) {
              dispatch({
                type: Action.REMOVE_PROPIETARIO,
                propietario_id: oldData.id,
              });
              resolve();
            }
            reject();
          });
        }, 3000);
      });
    },
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: "#CBD1D4",
            color: "#414B56",
            fontSize: "14px",
          },
        }}
        title="Lista de Propietarios"
        editable={edit_actions}
        isLoading={loading}
        columns={columns}
        data={propietarios}
        localization={{
          header: {
            actions: "  Acciones",
          },
        }}
      />
     </ThemeProvider>
    </React.Fragment>
  );
};

const columns = [
  { title: "Nombre", field: "first_name" },
  { title: "Apellido", field: "last_name" },
  { title: "DNI", field: "doc_id" },
];

const theme = createMuiTheme({
  typography: {
    fontSize: 18,
  },
});

export default withCookies(PropietariosTable);
