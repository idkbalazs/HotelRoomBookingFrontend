import {makeStyles} from "@material-ui/core/styles";

const signUpStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(4),
    },
    text: {
        color: "whitesmoke",
        margin: theme.spacing(1)
    },
    link : {
        textAlign: "center",
        margin: theme.spacing(0,1)
    },
    box : {
        margin: theme.spacing(2)
    }
}));

export default signUpStyles;
