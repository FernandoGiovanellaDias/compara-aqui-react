import { useEffect, useReducer, useState } from 'react';
import { Typography, Container } from '@mui/material';
import CInput from '../../components/CInput';
import { FormBox, ButtonContainer } from './styles';
import { ConfirmButton, ToDanyButton } from '../../assets/MeusComponentes';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../models/Categoria';
import reducer from '../../Util';
import { carregarCategoria, salvarCategoria } from '../../Util/categoriaUtils';
import { TipoRetorno } from '../../Util/ReduceUtils';
import Loading from '../../components/Loading';
import { MsgError } from '../../components/MsgError';

const CadastroCategoria = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [erros, setErros] = useState({});
    const [error, setError] = useState("");
    const [erroAoCarregar, setErroAoCarregar] = useState("");
    const [loading, setLoading] = useState(false);



    const { loading: loadingDados, data: dataDados, error: errorDados } = carregarCategoria(id);


    const [categoria, dispatch] = useReducer(reducer, new Categoria());


    useEffect(() => {
        if (id) {
            if (!loadingDados && !errorDados && !dataDados.error) {
                setErroAoCarregar("");
                dispatch({ type: "MANY_VALUES", values: dataDados.categoria });
            } else {
                setErroAoCarregar(dataDados.message ?? "Falha ao recuperar os dados da categoria");
            }
        }
    }, [loadingDados]);

    if (!loadingDados && erroAoCarregar) {
        return (<>
            <Loading data={{ loading: loading }} />
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                {!id ? "Cadastro" : "Edição"} de Categoria
            </Typography>
            <FormBox>
                <Container sx={{ margin: '10px 0' }}>
                    <MsgError error={erroAoCarregar} />
                </Container>
            </FormBox>
        </>);
    }





    const handlerSalvarCategoria = (categoria, callbackFunc) => {
        setLoading(true);
        console.log(JSON.stringify(categoria));

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

        salvarCategoria(categoria, callback);
    }




    const submitHandler = () => {
        handlerSalvarCategoria(categoria, () => {
            if (categoria.id === null || categoria.id === undefined || categoria.id <= 0) {
                navigate(-1);
            }
        });
    };

    return (
        <>
            <Loading data={{ loading: loading }} />
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                {!id ? "Cadastro" : "Edição"} de Categoria
            </Typography>

            <FormBox>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="switch"
                        id="status"
                        label="Status"
                        value={categoria.status}
                        dispatch={dispatch}
                    />
                </Container>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="text"
                        id="title"
                        label="Nome da categoria"
                        placeholder="Escreva o nome da categoria"
                        helperText=""
                        value={categoria.title}
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
                        <ToDanyButton onClick={()=>{navigate(-1)}}>
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

export default CadastroCategoria;
