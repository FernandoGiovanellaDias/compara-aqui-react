/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { TipoRetorno, reduce } from "./ReduceUtils";
import Produto from "../models/Produto";
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

export function buscarProdutos(filtroBusca) {
  const [state, dispatch] = useReducer(reduce, estadoInicial);
  const [reload, setReload] = useState(0);
  const actionReload = ()=>{setReload(reload+1);};
  useEffect(() => {
    async function buscarProdutos(filtroBusca) {
      try {
        const apiUrlProdutos = URL + "/v1/buscarProdutos";

        await axios.all([
          axios.post(apiUrlProdutos, filtroBusca),
        ]).then(axios.spread((produtos) => {
          let listaCompleta = produtos.data;
          dispatch({ type: TipoRetorno.SUCCESS, payload: listaCompleta });
        })).catch(error => {
          dispatch({ type: TipoRetorno.FAIL });
        });
      } catch (err) {
        dispatch({ type: TipoRetorno.FAIL });
      }
    }

    dispatch({ type: TipoRetorno.FETCH });

    buscarProdutos(filtroBusca);
  }, [filtroBusca, reload]);
  return { state, dispatch, actionReload };
}

export function carregarProduto(id, defaultProduto = new Produto()) {
  const [state, dispatch] = useReducer(reduce, estadoInicial);
  useEffect(() => {
    async function carregarProduto(id) {
      try {
        const apiUrlProdutos = URL + "/v1/Produtos/" + id;

        await axios.all([
          axios.get(apiUrlProdutos)
        ]).then(axios.spread((rProduto) => {
          let dados = rProduto.data;
          dados.produto = new Produto(rProduto.data.produto ?? {});
          dispatch({ type: TipoRetorno.SUCCESS, payload: dados });
        })).catch(error => {
          dispatch({ type: TipoRetorno.FAIL });
        });
      } catch (err) {
        dispatch({ type: TipoRetorno.FAIL });
      }
    }

    if (id != null) {
      dispatch({ type: TipoRetorno.FETCH, payload: defaultProduto });
      carregarProduto(id);
    } else {
      dispatch({ type: TipoRetorno.SUCCESS, payload: defaultProduto });
    }
  }, []);
  return state;
}


export function salvarProduto(produto, callback) {
  try {
    let eProduto = new Produto(produto);
    const apiUrlProdutos = URL + "/v1/Produtos";

    let listaReq = [];

    if (produto.id != null && produto.id != "" && produto.id !== 0) {
      listaReq.push(axios.put(apiUrlProdutos + "/" + produto.id, { produto: eProduto }));
    } else {
      listaReq.push(axios.post(apiUrlProdutos, { produto: eProduto }));
    }


    axios.all(listaReq).then(axios.spread((rProduto) => {

      if (Object.prototype.hasOwnProperty.call(rProduto.data, 'error')) {
        callback({ type: TipoRetorno.FAIL, data: rProduto.data });
      } else {
        let produto = new Produto();
        produto.load(rProduto.data);
        callback({ type: TipoRetorno.SUCCESS, data: produto });
      }
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}

export function excluirProduto(produto, callback) {
  try {
    const apiUrlProdutos = URL + "/v1/Produtos";

    let listaReq = [];
    listaReq.push(axios.delete(apiUrlProdutos + "/" + produto.id));


    axios.all(listaReq).then(axios.spread((rProduto) => {
      if (rProduto.status != 200) {
        callback({ type: TipoRetorno.FAIL, error: "Falha ao deletar Produto" });
      }
      callback({ type: TipoRetorno.SUCCESS, data: [] });
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}
