/* eslint-disable no-useless-escape */

export const TipoRetorno = {
  FETCH: "OnFetching",
  MANUAL: "Manual",
  SUCCESS: "OnSuccess",
  FAIL: "OnFailure",
};

export function formatarData(data){
  let dataArray = data.split(/\T|\.|\+/);
  return dataArray[0]+" "+dataArray[1].substring(0, 5);
}

export const reduce = (state, action, msgError = "Lamento, ocorreu um erro!") => {
  switch (action.type) {
    case TipoRetorno.FETCH:
      return {
        loading: true,
        data: [],
        error: null,
      };
      case TipoRetorno.MANUAL:
        return {
          loading: false,
          data: action.payload,
          error: null,
        };
    case TipoRetorno.SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case TipoRetorno.FAIL:
      return {
        loading: false,
        data: [],
        error: msgError,
      };
    default:
      return state;
  }
};