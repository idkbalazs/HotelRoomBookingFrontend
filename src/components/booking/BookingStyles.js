import {makeStyles} from "@material-ui/core/styles";

const bookingStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    booking: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    room: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));

export default bookingStyles;
