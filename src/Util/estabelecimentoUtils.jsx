/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { TipoRetorno, reduce } from "./ReduceUtils";
import Estabelecimento from "../models/Estabelecimento";
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

export function buscarEstabelecimentos(filtroBusca) {
  const [state, dispatch] = useReducer(reduce, estadoInicial);
  const [reload, setReload] = useState(0);
  const actionReload = ()=>{setReload(reload+1);};
  useEffect(() => {
    async function buscarEstabelecimentos(filtroBusca) {
      try {
        const apiUrlEstabelecimentos = URL + "/v1/recuperarMercados";

        await axios.all([
          axios.post(apiUrlEstabelecimentos, filtroBusca),
        ]).then(axios.spread((estabelecimentos) => {
          let listaCompleta = estabelecimentos.data;
          dispatch({ type: TipoRetorno.SUCCESS, payload: listaCompleta });
        })).catch(error => {
          dispatch({ type: TipoRetorno.FAIL });
        });
      } catch (err) {
        dispatch({ type: TipoRetorno.FAIL });
      }
    }

    dispatch({ type: TipoRetorno.FETCH });

    buscarEstabelecimentos(filtroBusca);
  }, [filtroBusca, reload]);
  return { state, dispatch, actionReload };
}

export function carregarEstabelecimento(id, defaultEstabelecimento = new Estabelecimento()) {
  const [state, dispatch] = useReducer(reduce, estadoInicial);
  useEffect(() => {
    async function carregarEstabelecimento(id) {
      try {
        const apiUrlEstabelecimentos = URL + "/v1/Mercados/" + id;

        await axios.all([
          axios.get(apiUrlEstabelecimentos)
        ]).then(axios.spread((rEstabelecimento) => {
          let dados = rEstabelecimento.data;
          dados.estabelecimento = new Estabelecimento(rEstabelecimento.data.estabelecimento ?? {});
          dispatch({ type: TipoRetorno.SUCCESS, payload: dados });
        })).catch(error => {
          dispatch({ type: TipoRetorno.FAIL });
        });
      } catch (err) {
        dispatch({ type: TipoRetorno.FAIL });
      }
    }

    if (id != null) {
      dispatch({ type: TipoRetorno.FETCH, payload: defaultEstabelecimento });
      carregarEstabelecimento(id);
    } else {
      dispatch({ type: TipoRetorno.SUCCESS, payload: defaultEstabelecimento });
    }
  }, []);
  return state;
}


export function salvarEstabelecimento(estabelecimento, callback) {
  try {
    let eEstabelecimento = new Estabelecimento(estabelecimento);
    const apiUrlEstabelecimentos = URL + "/v1/Mercados";

    let listaReq = [];

    if (estabelecimento.id != null && estabelecimento.id != "" && estabelecimento.id !== 0) {
      listaReq.push(axios.put(apiUrlEstabelecimentos + "/" + estabelecimento.id, { mercado: eEstabelecimento }));
    } else {
      listaReq.push(axios.post(apiUrlEstabelecimentos, { mercado: eEstabelecimento }));
    }


    axios.all(listaReq).then(axios.spread((rEstabelecimento) => {

      if (Object.prototype.hasOwnProperty.call(rEstabelecimento.data, 'error')) {
        callback({ type: TipoRetorno.FAIL, data: rEstabelecimento.data });
      } else {
        let estabelecimento = new Estabelecimento();
        estabelecimento.load(rEstabelecimento.data);
        callback({ type: TipoRetorno.SUCCESS, data: estabelecimento });
      }
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}

export function excluirEstabelecimento(estabelecimento, callback) {
  try {
    const apiUrlEstabelecimentos = URL + "/v1/Mercados";

    let listaReq = [];
    listaReq.push(axios.delete(apiUrlEstabelecimentos + "/" + estabelecimento.id));


    axios.all(listaReq).then(axios.spread((rEstabelecimento) => {
      if (rEstabelecimento.status != 200) {
        callback({ type: TipoRetorno.FAIL, error: "Falha ao deletar Estabelecimento" });
      }
      callback({ type: TipoRetorno.SUCCESS, data: [] });
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}
