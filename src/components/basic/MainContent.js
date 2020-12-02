import React from "react";
import Typography from "@material-ui/core/Typography";
//import {useAuth} from "./connection/Auth";
import mainContentStyles from "./MainContentStyles";

function MainContent() {
    const classes = mainContentStyles();
    //const { authTokens } = useAuth();
    /*if(!authTokens){*/
        return (
            <div className={classes.root}>
                <Typography variant="h4">
                    Welcome! This is the HotelRoomBooking Application
                </Typography>
                <br/>
                <Typography variant="body1">
                   If you want to book a room, then please sign in with your account. If you don't have please sign up first.
                </Typography>
            </div>
        );
    /*} else {
        return (
            <div className={classes.root}>
                <Typography variant="h4">
                    Welcome {authTokens.name}!
                </Typography>
                <br/>
                <Typography variant="body1">
                    Successfully logged in.
                </Typography>
            </div>
        );
    }*/
}

export default MainContent;
