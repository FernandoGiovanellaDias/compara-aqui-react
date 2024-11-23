import PropTypes from 'prop-types';
import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActionButton, NormalButton } from "../../assets/MeusComponentes";
import { TipoRetorno } from "../../Util/ReduceUtils";
import { realizarUpload } from "../../Util/uploadUtils";
import Loading from "../Loading";
import { MsgError } from "../MsgError";

export default function FileUploader({ icon, campoAtualizado, dispatch }) {

    const inputRef = useRef();
    const [preview, setPreview] = useState(icon);
    const [upload, setUpload] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleButtonClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            setUpload(true);
        }
    };
    const removePreview = () => {
        setPreview(null);
        setUpload(false);
        dispatch({ type: 'INPUT', name: campoAtualizado, value: null });
    };


    const handlerUpload = () => {
        setLoading(true);

        let callback = ({ type, error, data }) => {
            if (type == TipoRetorno.FAIL) {
                setLoading(false);
                if (data.message) {
                    setError(data.message);
                } else {
                    console.error(error);
                    setError("Falha ao realizar upload");
                }
            } else {
                setLoading(false);
                dispatch({ type: 'INPUT', name: campoAtualizado, value: data.icon });
                setUpload(false);
            }
        };

        realizarUpload(preview, callback);
    }


    return (
        <>
            <Loading data={{ loading: loading }} />
            <Box display="inline-flex" flexDirection="column">
                <div>
                    <ActionButton onClick={handleButtonClick}>
                        <UploadIcon sx={{ fontSize: 14 }} />
                    </ActionButton>
                    {
                        (upload || preview) && <>
                            <ActionButton sx={{ marginLeft: 1 }} onClick={removePreview}>
                                <DeleteIcon sx={{ fontSize: 14 }} />
                            </ActionButton>
                            {upload && <>
                                <NormalButton sx={{ height: 30, marginLeft: 2, minWidth: '100px !important' }}
                                    onClick={handlerUpload}>
                                    <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'14px'} >
                                        Upload
                                    </Typography>
                                </NormalButton>
                            </>}
                        </>
                    }
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                {
                    preview &&
                    <Box padding="20px 0px 0px 20px" display="flex" flexDirection="column">
                        {
                            upload && <>
                                <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'10px'} >
                                    Preview da imagem
                                </Typography>
                            </>
                        }
                        <MsgError error={error} />
                        <Box component="img"
                            src={preview}
                            sx={{ maxWidth: 200, maxHeight: 200, borderRadius: 4, objectFit: "contain" }}
                            alt="Icone Selecionado"
                        />
                    </Box>
                }
            </Box>
        </>
    );
};

FileUploader.propTypes = {
    icon: PropTypes.string.isRequired,
    campoAtualizado: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
};