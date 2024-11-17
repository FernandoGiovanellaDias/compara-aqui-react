import { useEffect, useReducer, useState } from 'react';
import { Typography, Container } from '@mui/material';
import CInput from '../../components/CInput';
import { FormBox, ButtonContainer } from './styles';
import { ConfirmButton, ToDanyButton } from '../../assets/MeusComponentes';
import { useNavigate, useParams } from 'react-router-dom';
import Produto from '../../models/Produto';
import reducer from '../../Util';
import { carregarProduto, salvarProduto } from '../../Util/produtoUtils';
import { TipoRetorno } from '../../Util/ReduceUtils';
import Loading from '../../components/Loading';
import { MsgError } from '../../components/MsgError';
import { buscarCategorias } from '../../Util/categoriaUtils';
import { buscarEstabelecimentos } from '../../Util/estabelecimentoUtils';

const CadastroProduto = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [erros, setErros] = useState({});
    const [error, setError] = useState("");
    const [erroAoCarregar, setErroAoCarregar] = useState("");
    const [loading, setLoading] = useState(false);




    const { state: stateCategoria } = buscarCategorias(null);
    const { state: stateEstabelecimento } = buscarEstabelecimentos(null);
    const { data: dataCategorias, loading: loadingCategorias } = stateCategoria;
    const { data: dataEstabelecimentos, loading: loadingEstabelecimentos } = stateEstabelecimento;

    const { loading: loadingDados, data: dataDados, error: errorDados } = carregarProduto(id);


    const [produto, dispatch] = useReducer(reducer, new Produto());


    useEffect(() => {
        if (id) {
            if (!loadingDados && !errorDados && !dataDados.error) {
                setErroAoCarregar("");
                dispatch({ type: "MANY_VALUES", values: dataDados.produto });
            } else {
                setErroAoCarregar(dataDados.message ?? "Falha ao recuperar os dados do produto");
            }
        }
    }, [loadingDados]);

    if (!loadingDados && erroAoCarregar) {
        return (<>
            <Loading data={{ loading: loading }} />
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                {!id ? "Cadastro" : "Edição"} de Produto
            </Typography>
            <FormBox>
                <Container sx={{ margin: '10px 0' }}>
                    <MsgError error={erroAoCarregar} />
                </Container>
            </FormBox>
        </>);
    }





    const handlerSalvarProduto = (produto, callbackFunc) => {
        setLoading(true);
        console.log(JSON.stringify(produto));

        let callback = ({ type, error, data }) => {
            if (type == TipoRetorno.FAIL) {
                setLoading(false);
                if (data != undefined && data != null) {
                    if (data.erros != undefined && data.erros != null && Object.keys(data.erros).length > 0) {
                        setErros(data.erros);
                        setError(null);
                    } else if (data.error) {
                        setError(data.message);
                    }
                } else if (error != undefined && error != null && Object.keys(error).length > 0) {
                    setErros(error);
                    setError(null);
                }
            } else {
                setLoading(false);

                if (callbackFunc != null) {
                    callbackFunc(data.id);
                }
            }
        };

        salvarProduto(produto, callback);
    }




    const submitHandler = () => {
        handlerSalvarProduto(produto, () => {
            if (produto.id === null || produto.id === undefined || produto.id <= 0) {
                navigate(-1);
            }
        });
    };


    const listaCategorias = Array.isArray(dataCategorias) ? dataCategorias : [];
    const listaEstabelecimentos = Array.isArray(dataEstabelecimentos) ? dataEstabelecimentos : [];

    return (
        <>
            <Loading data={{ loading: (loading || loadingCategorias || loadingEstabelecimentos) }} />
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                {!id ? "Cadastro" : "Edição"} de Produto
            </Typography>

            <FormBox>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="switch"
                        id="status"
                        label="Status"
                        value={produto.status}
                        dispatch={dispatch}
                    />
                </Container>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="select"
                        id="id_mercado"
                        label="Mercado"
                        sx={{ width: '80%' }}
                        value={produto.id_mercado}
                        error={erros}
                        dispatch={dispatch}
                        lista={listaEstabelecimentos}
                        onRenderTextItem={(item)=>item.name}
                    />
                </Container>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="select"
                        id="id_categoria"
                        label="Categoria"
                        sx={{ width: '80%' }}
                        value={produto.id_categoria}
                        error={erros}
                        dispatch={dispatch}
                        lista={listaCategorias}
                        onRenderTextItem={(item)=>item.title}
                    />
                </Container>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="text"
                        id="name"
                        label="Nome do produto"
                        placeholder="Escreva o nome do produto"
                        value={produto.name}
                        sx={{ width: '80%' }}
                        dispatch={dispatch}
                        error={erros}
                    />
                </Container>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="text"
                        id="description"
                        label="Descrição do produto"
                        placeholder="Escreva o nome do produto"
                        value={produto.description}
                        sx={{ width: '80%' }}
                        dispatch={dispatch}
                        error={erros}
                    />
                </Container>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="price"
                        id="price"
                        label="Preço do produto"
                        placeholder="Escreva o preço do produto"
                        value={produto.price}
                        sx={{ width: '80%' }}
                        dispatch={dispatch}
                        error={erros}
                    />
                </Container>
                <Container sx={{ margin: '10px 0' }}>
                    <MsgError error={error} />
                </Container>

                <Container sx={{ margin: '10px 0' }}>
                    <ButtonContainer>
                        <ConfirmButton onClick={() => { submitHandler() }}>
                            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'12px'} >
                                Confirmar
                            </Typography>
                        </ConfirmButton>
                        <ToDanyButton onClick={() => { navigate(-1) }}>
                            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'12px'} >
                                Cancelar
                            </Typography>
                        </ToDanyButton>
                    </ButtonContainer>
                </Container>
            </FormBox>
        </>
    );
};

export default CadastroProduto;
