/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Box } from "@mui/material";
import { SearchTextField, StyledTextField } from "./styles";
import SearchIcon from '@mui/icons-material/Search';


const GerarInput = ({ type, id, placeholder, helperText, dispatch = null, value = "", isDisabled = false, erros = {}, onKeyDown = null, sx = {}, label = "" }) => {
    let helperTextField = "";
    let temErro = (erros !== null && erros !== undefined && Object.hasOwn(erros, id));
    if (temErro) {
        helperTextField = `*${erros[id]}`;
    } else if (helperText !== undefined && helperText !== null) {
        helperTextField = helperText;
    }
    if (type == "busca") {
        return (
            <SearchTextField
                label={label}
                id={id} disabled={isDisabled}
                defaultValue={value}
                placeholder={placeholder}
                aria-label={placeholder}
                sx={[sx,
                    temErro ? {
                        "& .MuiFormHelperText-root": {
                            color: "#b32222"
                        }
                    } : {}
                ]
                }
                helperText={helperTextField}
                onChange={(e) => { if (dispatch !== null) { dispatch({ type: 'INPUT', name: id, value: e.target.value }); } }}
                onKeyDown={(e) => { if (onKeyDown !== undefined && onKeyDown !== null) { onKeyDown(e); } }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <SearchIcon />
                        ),
                    }
                }}
            />);
    }
    if (type == "senha") {
        return (
            <StyledTextField
                label={label}
                variant="filled"
                id={id} disabled={isDisabled}
                type="password"
                defaultValue={value}
                placeholder={placeholder}
                aria-label={placeholder}
                sx={[sx,
                    temErro ? {
                        "& .MuiFormHelperText-root": {
                            color: "#b32222"
                        }
                    } : {}
                ]}
                helperText={helperTextField}
                onChange={(e) => { if (dispatch !== null) { dispatch({ type: 'INPUT', name: id, value: e.target.value }); } }}
                onKeyDown={(e) => { if (onKeyDown !== undefined && onKeyDown !== null) { onKeyDown(e); } }}
            />);
    }

    return (
        <StyledTextField
            label={label}
            variant="filled"
            id={id} disabled={isDisabled}
            defaultValue={value}
            placeholder={placeholder}
            aria-label={placeholder}
            sx={[sx,
                temErro ? {
                    "& .MuiFormHelperText-root": {
                        color: "#b32222"
                    }
                } : {}
            ]}
            helperText={helperTextField}
            onChange={(e) => { if (dispatch !== null) { dispatch({ type: 'INPUT', name: id, value: e.target.value }); } }}
            onKeyDown={(e) => { if (onKeyDown !== undefined && onKeyDown !== null) { onKeyDown(e); } }}
        />);
};

function CInput({ id = "", helperText = "", isDisabled = false, value = "", label = null, placeholder = "", error = null, type = null, sx = null, mask = null, dispatch = null, onKeyDown = null }) {
    return <>
        <GerarInput
            type={type}
            id={id}
            sx={sx}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            dispatch={dispatch}
            value={value}
            isDisabled={isDisabled}
            erros={error}
            onKeyDown={onKeyDown} />
    </>;
}

export default CInput;