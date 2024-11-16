import { Box, CircularProgress, Typography } from "@mui/material";
import { buscarEstabelecimentos, excluirEstabelecimento } from "../../Util/estabelecimentoUtils";
import { useReducer, useState } from "react";
import PropTypes from 'prop-types';
import reducer from "../../Util";
import FiltroBusca from "../../models/FiltroBusca";
import CInput from "../../components/CInput";
import { ActionButton, NormalButton } from "../../assets/MeusComponentes";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from "../../components/ConfirmDialog";

export const RenderizarLista = ({ lista, navigate, loading, error, handleApagarRegistro, handleCancelar, handleAbrirConfirmDialog, abrirConfirmDialog }) => {

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
            <ConfirmDialog
                title="Deseja realmente apagar o estabelecimento?"
                message="Ao apagar será removido todos os produtos relacionados"
                onConfirm={handleApagarRegistro}
                onCancel={handleCancelar}
                open={abrirConfirmDialog} />
            <Box sx={{ gap: '10px', display: 'inline-flex', flexDirection: 'column', overflow: 'auto' }} >
                {
                    lista.map((item) => (
                        <>
                            <Box key={item.id} sx={{ background: "#BDC0DD", paddingX: 2, paddingY: 2, display: 'inline-flex' }}>
                                <Typography sx={{ flex: 1, overflow: "auto" }} fontFamily={"Poppins"} fontWeight={300} variant="p" fontSize={'18px'} >
                                    {item.name}
                                </Typography>

                                <div style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
                                    <ActionButton onClick={() => { navigate("../CadastroEstabelecimento/" + item.id) }}>
                                        <EditIcon sx={{ fontSize: 14 }} />
                                    </ActionButton>
                                    <ActionButton onClick={() => { handleAbrirConfirmDialog(item); }}>
                                        <DeleteIcon sx={{ fontSize: 14 }} />
                                    </ActionButton>
                                </div>
                            </Box>
                        </>
                    ))
                }
            </Box>
        </>
    );
}

export default function ListaEstabelecimentos() {

    const navigate = useNavigate();

    const [filtroBusca, dispatch] = useReducer(reducer, new FiltroBusca());
    const [abrirConfirmDialog, setAbrirConfirmDialog] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);


    const { state, actionReload } = buscarEstabelecimentos(filtroBusca);
    const { data, loading, error } = state;
    const lista = Array.isArray(data) ? data : [];


    const handleAbrirConfirmDialog = (item) => {
        setItemSelecionado(item);
        setAbrirConfirmDialog(true);
    };

    const handleApagarRegistro = () => {
        excluirEstabelecimento(itemSelecionado, () => {
            setAbrirConfirmDialog(false);
            actionReload();
        });
    };

    const handleCancelar = () => {
        setAbrirConfirmDialog(false);
    };


    return (
        <>
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                Estabelecimentos
            </Typography>
            <Box paddingTop={2} paddingBottom={2} gapC >
                <CInput
                    id="filtro"
                    value={filtroBusca.filtro}
                    placeholder="Buscar estabelecimentos"
                    dispatch={dispatch}
                    type="busca"
                />
                <NormalButton sx={{ marginLeft: 2 }} onClick={() => { navigate('/CadastroEstabelecimento') }}>
                    <AddIcon sx={{ fontSize: 14, marginRight: 1 }} />
                    <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'12px'} >
                        Novo Estabelecimento
                    </Typography>
                </NormalButton>
            </Box>

            <RenderizarLista
                lista={lista}
                navigate={navigate}
                loading={loading}
                error={error}
                handleAbrirConfirmDialog={handleAbrirConfirmDialog}
                handleApagarRegistro={handleApagarRegistro}
                handleCancelar={handleCancelar}
                abrirConfirmDialog={abrirConfirmDialog}
            />

        </>
    );
}



RenderizarLista.propTypes = {
    lista: PropTypes.array.isRequired,
    navigate: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    handleApagarRegistro: PropTypes.func,
    handleCancelar: PropTypes.func,
    handleAbrirConfirmDialog: PropTypes.func,
    abrirConfirmDialog: PropTypes.bool
};
RenderizarLista.defaultProps = {
    lista: [],
    navigate: () => { },
    loading: false,
    error: null,
    handleApagarRegistro: () => { },
    handleCancelar: () => { },
    handleAbrirConfirmDialog: () => { },
    abrirConfirmDialog: false
};

