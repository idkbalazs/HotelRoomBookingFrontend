import {makeStyles} from "@material-ui/core/styles";

const UserStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button:{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        position: 'relative',
        width: '100%',
        margin: theme.spacing(1)
    },

    grid: {
        position: 'relative',
        margin: theme.spacing(10),
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },

}));

export default UserStyles;
