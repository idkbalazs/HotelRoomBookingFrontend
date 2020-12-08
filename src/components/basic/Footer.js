import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import footerStyles from "./FooterStyles";

function Footer() {
    const classes = footerStyles();
    return (
        <Box mt={8} className={classes.root}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://hotelroombookingfrontend.herokuapp.com/">
                    HotelRoomBooking
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

export default Footer;