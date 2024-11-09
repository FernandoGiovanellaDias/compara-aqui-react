import { Box, CircularProgress, Typography } from "@mui/material";
import { SearchTextField } from "../Login/styles";
import SearchIcon from '@mui/icons-material/Search';
import { buscarEstabelecimentos } from "../../Util/estabelecimentoUtils";
import { useState } from "react";



const RenderizarLista = (filtro = null) => {

    const { state } = buscarEstabelecimentos();
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
                    lista.map((item, index) => (
                        <>
                            <Box key={index} sx={{ background: "#BDC0DD", paddingX: 2, paddingY: 2 }}>
                                <Typography fontFamily={"Poppins"} fontWeight={300} variant="p" fontSize={'18px'} >
                                    {index.name}
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

    const [filtro, setFiltro] = useState("");



    return (
        <>
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                Estabelecimentos
            </Typography>
            <Box paddingTop={2} paddingBottom={2} >
                <SearchTextField
                    placeholder="Buscar Estabelecimento"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }
                    }}
                />
            </Box>

            <RenderizarLista filtro={filtro} />

        </>
    );
}
