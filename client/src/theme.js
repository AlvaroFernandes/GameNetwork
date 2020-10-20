import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    pallete: {
        primary: { main: "black" },
        secondary: { main: "grey" }
    },
    typography: {
        useNextVariants: true,
    }, 
    overrides: {
        MuiButton: {
            root: {
              color: 'grey',
              '&:hover': {
                backgroundColor: 'black'
              }
            }
        }
    }
});