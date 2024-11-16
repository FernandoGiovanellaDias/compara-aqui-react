/* eslint-disable react-refresh/only-export-components */
import { Button } from "@mui/material";
import styled from "styled-components";
import { keyframes } from "@emotion/react";


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


export const NormalButton = styled(Button)({
    padding: '8px 20px',
    minWidth: '120px !important',
    borderRadius: '10px !important',
    color: '#3d416c !important',
    fontSize: '16px',
    textTransform: 'none',
    backgroundColor: '#e9ebff !important',
    '&:hover': {
        color: '#9b9ebe !important',
        backgroundColor: '#ebedff !important',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },

    '&& .MuiTouchRipple-child': {
        backgroundColor: '#9b9ebe !important',
    },

    '&& .MuiTouchRipple-rippleVisible': {
        opacity: 0.5,
        animation: `${enterKeyframe} 550ms ease-in-out !important`,
    },
});


export const ActionButton = styled(Button)({
    padding: '8px 20px',
    minWidth: '10px !important',
    minHeight: '10px !important',
    width: '30px !important',
    height: '30px !important',
    borderRadius: '50% !important',
    color: '#3d416c !important',
    fontSize: '16px',
    textTransform: 'none',
    backgroundColor: '#e9ebff !important',
    '&:hover': {
        color: '#9b9ebe !important',
        backgroundColor: '#ebedff !important',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },

    '&& .MuiTouchRipple-child': {
        backgroundColor: '#9b9ebe !important',
    },

    '&& .MuiTouchRipple-rippleVisible': {
        opacity: 0.5,
        animation: `${enterKeyframe} 550ms ease-in-out !important`,
    },
});