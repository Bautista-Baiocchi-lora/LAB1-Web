import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { getAll } from "../../requests/propietarios.requests";
import { usePropietarioSelector } from "../../storage/app.selectors";
import { Action } from "../../storage/dispatch.actions";
import "../guardias/guardias.screen.css";
import PropietariosTable from "./propietarios.table";
import Popup from "reactjs-popup";
import { getAssociationQR } from "../../requests/propietarios.requests";
var QRCode = require("qrcode.react");

const PropietarioScreen = () => {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);
  const loading: boolean = usePropietarioSelector((state) => state?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      getAll(cookie.session.token)
        .then((response) => {
          dispatch({
            type: Action.SAVE_PROPIETARIOS,
            propietarios: response.data || [],
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({ type: Action.LOADING_PROPIETARIOS, loading: false });
        });
    }
  }, [loading]);

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <PropietariosTable />
    </React.Fragment>
  );
};

export default withCookies(PropietarioScreen);
