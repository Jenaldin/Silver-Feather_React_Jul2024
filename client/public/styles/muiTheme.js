import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#417954',
        },
        secondary: {
            main: '#7d5343',
        },
        background: {
            paper: '#fff4e0',
            default: '#fee4cb',
        },
        info: {
            main: '#5697a3',
        },
        success: {
            main: '#9cb766',
        },
        error: {
            main: '#8a1a1a',
        },
        warning: {
            main: '#e06d14',
        },
    },
});