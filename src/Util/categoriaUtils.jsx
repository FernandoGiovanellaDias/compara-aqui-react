/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { TipoRetorno, reduce } from "./ReduceUtils";
import Categoria from "../models/Categoria";
import ErrorReturn from "../models/ErrorReturn";

const URL = "http://localhost:3000/api";

axios.defaults.headers.common = {
  'Authorization': 'Bearer ' + (localStorage.getItem("jwt") ?? ""),
};

const estadoInicial = {
  loading: true,
  data: [],
  error: null,
};

export function buscarCategorias(filtroBusca) {
  const [state, dispatch] = useReducer(reduce, estadoInicial);
  const [reload, setReload] = useState(0);
  const actionReload = ()=>{setReload(reload+1);};
  useEffect(() => {
    async function buscarCategorias(filtroBusca) {
      try {
        const apiUrlCategorias = URL + "/v1/buscarCategorias";

        await axios.all([
          axios.post(apiUrlCategorias, filtroBusca),
        ]).then(axios.spread((categorias) => {
          let listaCompleta = categorias.data;
          dispatch({ type: TipoRetorno.SUCCESS, payload: listaCompleta });
        })).catch(error => {
          dispatch({ type: TipoRetorno.FAIL });
        });
      } catch (err) {
        dispatch({ type: TipoRetorno.FAIL });
      }
    }

    dispatch({ type: TipoRetorno.FETCH });

    buscarCategorias(filtroBusca);
  }, [filtroBusca, reload]);
  return { state, dispatch, actionReload };
}

export function carregarCategoria(id, defaultCategoria = new Categoria()) {
  const [state, dispatch] = useReducer(reduce, estadoInicial);
  useEffect(() => {
    async function carregarCategoria(id) {
      try {
        const apiUrlCategorias = URL + "/v1/Categorias/" + id;

        await axios.all([
          axios.get(apiUrlCategorias)
        ]).then(axios.spread((rCategoria) => {
          let dados = rCategoria.data;
          dados.categoria = new Categoria(rCategoria.data.categoria ?? {});
          dispatch({ type: TipoRetorno.SUCCESS, payload: dados });
        })).catch(error => {
          dispatch({ type: TipoRetorno.FAIL });
        });
      } catch (err) {
        dispatch({ type: TipoRetorno.FAIL });
      }
    }

    if (id != null) {
      dispatch({ type: TipoRetorno.FETCH, payload: defaultCategoria });
      carregarCategoria(id);
    } else {
      dispatch({ type: TipoRetorno.SUCCESS, payload: defaultCategoria });
    }
  }, []);
  return state;
}


export function salvarCategoria(categoria, callback) {
  try {
    let eCategoria = new Categoria(categoria);
    const apiUrlCategorias = URL + "/v1/Categorias";

    let listaReq = [];

    if (categoria.id != null && categoria.id != "" && categoria.id !== 0) {
      listaReq.push(axios.put(apiUrlCategorias + "/" + categoria.id, { categoria: eCategoria }));
    } else {
      listaReq.push(axios.post(apiUrlCategorias, { categoria: eCategoria }));
    }


    axios.all(listaReq).then(axios.spread((rCategoria) => {

      if (Object.prototype.hasOwnProperty.call(rCategoria.data, 'error')) {
        callback({ type: TipoRetorno.FAIL, data: rCategoria.data });
      } else {
        let categoria = new Categoria();
        categoria.load(rCategoria.data);
        callback({ type: TipoRetorno.SUCCESS, data: categoria });
      }
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}

export function excluirCategoria(categoria, callback) {
  try {
    const apiUrlCategorias = URL + "/v1/Categorias";

    let listaReq = [];
    listaReq.push(axios.delete(apiUrlCategorias + "/" + categoria.id));


    axios.all(listaReq).then(axios.spread((rCategoria) => {
      if (rCategoria.status != 200) {
        callback({ type: TipoRetorno.FAIL, error: "Falha ao deletar Categoria" });
      }
      callback({ type: TipoRetorno.SUCCESS, data: [] });
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}
