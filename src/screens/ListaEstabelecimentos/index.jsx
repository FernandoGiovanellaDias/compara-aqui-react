import { Box, CircularProgress, Typography } from "@mui/material";
import { buscarEstabelecimentos } from "../../Util/estabelecimentoUtils";
import { useReducer } from "react";
import PropTypes from 'prop-types';
import reducer from "../../Util";
import FiltroBusca from "../../models/FiltroBusca";
import CInput from "../../components/CInput";




const RenderizarLista = ({ filtro = ""}) => {

    const { state } = buscarEstabelecimentos(filtro);
    const { data, loading, error } = state;

    const lista = Array.isArray(data) ? data : [];

    if (loading) {
        return (
            <>
                <Box sx={{ flex: 1, display: "inline-flex", alignItems: "flex-start", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            </>
        );
    }
    if (error) {
        return (
            <>
                <Box sx={{ flex: 1, display: "inline-flex", alignItems: "flex-start", justifyContent: "center" }}>
                    <Typography fontFamily={"Poppins"} fontWeight={800} variant="p" fontSize={'24px'} >
                        Ops, houve um erro ao carregar
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Box sx={{ gap: '10px', display: 'inline-flex', flexDirection: 'column', overflow: 'auto' }} >
                {
                    lista.map((item) => (
                        <>
                            <Box key={item.id} sx={{ background: "#BDC0DD", paddingX: 2, paddingY: 2 }}>
                                <Typography fontFamily={"Poppins"} fontWeight={300} variant="p" fontSize={'18px'} >
                                    {item.name}
                                </Typography>
                            </Box>
                        </>
                    ))
                }
            </Box>
        </>
    );
}

export default function ListaEstabelecimentos() {


    const [filtroBusca, dispatch] = useReducer(reducer, new FiltroBusca());

    
    return (
        <>
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                Estabelecimentos
            </Typography>
            <Box paddingTop={2} paddingBottom={2} >
                <CInput
                    id="filtro"
                    value={filtroBusca.filtro}
                    placeholder="Buscar estabelecimentos"
                    dispatch={dispatch}
                    type="busca"
                />
            </Box>

            <RenderizarLista filtro={filtroBusca} />

        </>
    );
}



RenderizarLista.propTypes = {
    filtro: PropTypes.object,
};
RenderizarLista.defaultProps = {
    filtro: "",
};

