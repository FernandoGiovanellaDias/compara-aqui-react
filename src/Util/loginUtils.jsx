/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { TipoRetorno } from "./ReduceUtils";
import Login from "../models/Login";
import Authentication from "../models/Authentication";
import Usuario from "../models/Usuario";

const URL = "http://localhost:3000/api";

axios.defaults.headers.common = {
  'Authorization': 'Bearer ' + (localStorage.getItem("jwt") ?? ""),
};



export function validarLogin(login, camposValidados = ["email", "senha"]) {
  let erros = {};


  if (camposValidados == null || camposValidados.includes('email')) {
    if (login.email !== undefined && login.email !== null && login.email.length > 0) {
      if (login.email.replace(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "").length != 0) {
        erros["email"] = "O email inserido está incorreto";
      }
    } else {
      erros["email"] = "O campo email é obrigatório";
    }
  }


  if (camposValidados == null || camposValidados.includes('senha')) {
    if (login.senha !== undefined && login.senha !== null && login.senha.length > 0) {
      if (login.senha.length <= 3) {
        erros["senha"] = "O campo senha deve ter ao menos 4 caracteres";
      }
    } else {
      erros["senha"] = "O campo senha é obrigatório";
    }
  }


  return erros;
}


export function validarUsuario(usuario, camposValidados = ["email", "senha", "nome"]) {
  let erros = {};


  if (camposValidados == null || camposValidados.includes('email')) {
    if (usuario.email !== undefined && usuario.email !== null && usuario.email.length > 0) {
      if (usuario.email.replace(/[^\d]/g, "").length != 11 && usuario.email.replace(/[^\d]/g, "").length != 14) {
        erros["email"] = "O email inserido está incorreto";
      }
    } else {
      erros["email"] = "O campo email é obrigatório";
    }
  }


  if (camposValidados == null || camposValidados.includes('senha')) {
    if (usuario.senha !== undefined && usuario.senha !== null && usuario.senha.length > 0) {
      if (usuario.senha.length <= 3) {
        erros["senha"] = "O campo senha deve ter ao menos 4 caracteres";
      }
    } else {
      erros["senha"] = "O campo senha é obrigatório";
    }
  }



  if (camposValidados == null || camposValidados.includes('nome')) {
    if (usuario.nome === undefined || usuario.nome !== null || usuario.nome.length > 0) {
      erros["nome"] = "O campo nome é obrigatório";
    }
  }


  return erros;
}


export function realizarLogin(login, callback) {
  try {
    let eLogin = new Login(login);
    const apiUrlLogins = URL + "/v1/login";

    let listaReq = [];

    let err = validarLogin(eLogin);
    if (Object.keys(err).length > 0) {
      callback({ type: TipoRetorno.FAIL, error: err });
      return;
    }

    listaReq.push(axios.post(apiUrlLogins, eLogin));

    axios.all(listaReq).then(axios.spread((rLogin) => {

      if (Object.prototype.hasOwnProperty.call(rLogin.data, 'error')) {
        callback({ type: TipoRetorno.FAIL, data: rLogin.data });
      } else {
        let authentication = new Authentication();
        let usuario = new Usuario();

        authentication.load(rLogin.data);
        usuario.load(rLogin.data.usuario);
        callback({ type: TipoRetorno.SUCCESS, data: { authentication: authentication, usuario: usuario } });
      }
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}

export function realizarCadastro(usuario, authentication, callback) {
  try {
    let eUsuario = new Usuario(usuario);



    let listaReq = [];

    let err = validarLogin(eUsuario);
    if (Object.keys(err).length > 0) {
      callback({ type: TipoRetorno.FAIL, error: err });
      return;
    }

    if (authentication.tokenAccount === undefined || authentication.tokenAccount === null || authentication.tokenAccount === '') {
      const apiUrlLogins = URL + "/v1/Usuarios";
      listaReq.push(axios.post(apiUrlLogins, eUsuario));
    } else {
      const apiUrlLogins = URL + "/v1/Usuarios/"+authentication.tokenAccount;
      listaReq.push(axios.put(apiUrlLogins, eUsuario));
    }

    axios.all(listaReq).then(axios.spread((rUsuario) => {

      if (Object.prototype.hasOwnProperty.call(rUsuario.data, 'error')) {
        callback({ type: TipoRetorno.FAIL, data: rUsuario.data });
      } else {
        let authentication = new Authentication();
        let usuario = new Usuario();

        authentication.load(rUsuario.data);
        usuario.load(rUsuario.data.usuario);
        callback({ type: TipoRetorno.SUCCESS, data: { authentication: authentication, usuario: usuario } });
      }
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}



export function criarSecao(callback) {
  try {
    const apiUrl = URL + "/v1/criarSecao";

    let listaReq = [];

    listaReq.push(axios.get(apiUrl));

    axios.all(listaReq).then(axios.spread((secao) => {

      if (Object.prototype.hasOwnProperty.call(secao.data, 'error')) {
        callback({ type: TipoRetorno.FAIL, data: secao.data });
      } else {
        callback({ type: TipoRetorno.SUCCESS, data: secao.data });
      }
    })).catch(error => {
      callback({ type: TipoRetorno.FAIL, error: error });
    });
  } catch (err) {
    callback({ type: TipoRetorno.FAIL, error: err });
  }
}