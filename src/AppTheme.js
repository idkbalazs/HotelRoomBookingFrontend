import {createMuiTheme} from "@material-ui/core";

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    primary: {
        main: '#ff0400',
    },
    secondary: {
        main: '#000000',
    }
});

export default darkTheme;
