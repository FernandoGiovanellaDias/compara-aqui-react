import { useState } from 'react';
import { Typography, Container } from '@mui/material';
import CInput from '../../components/CInput';
import { FormBox, ButtonContainer, StyledSwitchContainer } from './styles';
import { ConfirmButton, CustomSwitch, ToDanyButton } from '../../assets/MeusComponentes';

const CadastroEstabelecimento = () => {
    const [status, setStatus] = useState(false);
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState("");

    const handleStatusChange = () => {
        setStatus(!status);
    };

    const handleNomeChange = (e) => {
        setNomeEstabelecimento(e.target.value);
    };

    return (
        <>
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                Cadastro de Estabelecimentos
            </Typography>

            <FormBox>
                <Container sx={{ margin: '10px 0' }}>
                    <StyledSwitchContainer>
                        <CustomSwitch checked={status} onChange={handleStatusChange} />
                        <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'12px'} >
                            Status
                        </Typography>
                    </StyledSwitchContainer>
                </Container>
                <Container sx={{ margin: '10px 0' }}>
                    <CInput
                        type="text"
                        id="nomeEstabelecimento"
                        label="Nome do estabelecimento"
                        placeholder="Escreva o nome do estabelecimento"
                        helperText="Supporting text"
                        value={nomeEstabelecimento}
                        sx={{ width: '80%' }}
                        onChange={handleNomeChange}
                    />
                </Container>

                <Container sx={{ margin: '10px 0' }}>
                    <ButtonContainer>
                        <ConfirmButton>
                            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'12px'} >
                                Confirmar
                            </Typography>
                        </ConfirmButton>
                        <ToDanyButton>
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

export default CadastroEstabelecimento;
