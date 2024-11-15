import { Box, Switch, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)({
    margin: "10px 0",
    width: "300px",
    "& .MuiFilledInput-root": {
        backgroundColor: "#e0e0e0",
        fontSize: "12px",
        "&:before, &:after": {
            borderBottom: "none",
        },
    },

    "& .MuiFormLabel-root": {
        color: "#757575",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "12px",
        "&.Mui-focused": {
            color: "#757575",
        },
    },
    "& .MuiInputBase-input": {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        padding: "20px 6px 4px 6px",
        fontSize: "12px",
    },
    "& .MuiInputLabel-root": {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "12px",
        marginLeft: "-6px",
    },
    "& .MuiFormHelperText-root": {
        color: "#757575",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "10px",
    },
});


export const SearchTextField = styled(TextField)({
    margin: "10px 0",
    width: "300px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        fontSize: "12px",
        "&:before, &:after": {
            borderBottom: "none",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #9B9CA2",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #9B9CA2",
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #9B9CA2",
    },
    "& .MuiInputBase-input": {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        padding: "10px 12px",
        fontSize: "12px",
    },
    "& .MuiInputAdornment-root": {
        color: "#b3b3b3",
    },
    "& .MuiFormLabel-root": {
        color: "#757575",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "12px",
    },
    "& .MuiFormHelperText-root": {
        color: "#757575",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "10px",
    },
});


export const StyledSwitchContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: 'min-content',
});



export const CustomSwitch = styled(Switch)({
    height: "auto !important",
    width: "75px !important",
    padding: 0,
    display: 'flex',
    '& .MuiSwitch-switchBase:hover': {
        background: "none !important",
    },
    '& .MuiSwitch-track': {
        width: '100%',
        height: 28,
        backgroundColor: '#afafdb',
        borderRadius: 100,
        opacity: 1,
    },
    '& .MuiSwitch-switchBase': {
        padding: 0,
        '&.Mui-checked': {
            transform: 'translateX(37px)',
            '& .MuiSwitch-thumb': {
                backgroundColor: '#9cb7ff',
                margin: "14px 14px",
                marginLeft: 'auto',
            },
            '& + .MuiSwitch-track': {
                backgroundColor: '#2944f3',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 22,
        height: 22,
        backgroundColor: '#bbc2ff',
        margin: "14px 14px",
    },
});