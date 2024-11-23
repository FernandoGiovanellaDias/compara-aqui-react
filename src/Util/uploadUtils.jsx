/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import axios from "axios";
import { TipoRetorno, reduce } from "./ReduceUtils";
import Estabelecimento from "../models/Estabelecimento";

const URL = "http://localhost:3000/api";

axios.defaults.headers.common = {
  'Authorization': 'Bearer ' + (localStorage.getItem("jwt") ?? ""),
};

export function realizarUpload(base64, callback) {
  try {
    const apiUrlUpload = URL + "/v1/Upload";

    let listaReq = [];

    listaReq.push(axios.post(apiUrlUpload, { image: base64 }));

    axios.all(listaReq).then(axios.spread((rUpload) => {

      if (Object.prototype.hasOwnProperty.call(rUpload.data, 'error')) {
        callback({ type: TipoRetorno.FAIL, data: rUpload.data });
      } else {
        callback({ type: TipoRetorno.SUCCESS, data: rUpload.data });
      }
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}