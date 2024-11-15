/* eslint-disable react-refresh/only-export-components */
import { Button } from "@mui/material";
import styled from "styled-components";
import { keyframes } from "@emotion/react";

import Switch from '@mui/material/Switch';


export const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`;

export const ConfirmButton = styled(Button)({
    padding: '8px 20px',
    minWidth: '120px !important',
    borderRadius: '100px !important',
    color: '#3a4ac6 !important',
    fontSize: '16px',
    textTransform: 'none',
    backgroundColor: '#f0e9ff !important',
    '&:hover': {
        backgroundColor: '#ede4ff !important',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    '&& .MuiTouchRipple-child': {
        backgroundColor: '#0018ff !important',
    },

    '&& .MuiTouchRipple-rippleVisible': {
        opacity: 0.5,
        animation: `${enterKeyframe} 550ms ease-in-out !important`,
    },
});

export const ToDanyButton = styled(Button)({
    padding: '8px 20px',
    minWidth: '120px !important',
    borderRadius: '100px !important',
    color: '#3a4ac6 !important',
    fontSize: '16px',
    textTransform: 'none',
    backgroundColor: '#ffdede !important',
    '&:hover': {
        backgroundColor: '#ffc4c4 !important',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },

    '&& .MuiTouchRipple-child': {
        backgroundColor: '#ff0000 !important',
    },

    '&& .MuiTouchRipple-rippleVisible': {
        opacity: 0.5,
        animation: `${enterKeyframe} 550ms ease-in-out !important`,
    },
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