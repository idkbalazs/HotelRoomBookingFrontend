import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import UserStyles from "./UserStyles";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Moment from 'moment';
import axios from "axios";
import {useAuth} from "../connection/Auth";

function User(){

    const classes = UserStyles();
    const [selectedDate, setSelectedDate] = useState(Moment.now());
    const [date, setDate] = useState(Moment(selectedDate));
    //const [selectedArrive, setSelectedArrive] = useState(Moment.now());
    //onst [arrive, setArrive] = useState(Moment(selectedArrive));
    //const [selectedLeave, setSelectedLeave] = useState(Moment.now());
    //const [leave, setLeave] = useState(Moment(selectedLeave));
    const { authTokens } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState();
/*
    const handleArriveChange = (d) => {
        setSelectedArrive(d);
        setArrive(Moment(d));
        console.log(selectedArrive);
    };

    const handleLeaveChange = (d) => {
        setSelectedLeave(d);
        setLeave(Moment(d));
        console.log(selectedLeave);
    };*/

    const handleDateChange = (d) => {
        setSelectedDate(d);
        setDate(Moment(d));
    };

    React.useEffect(() => {
        axios.get("http://localhost:8080/rooms",{auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                setRooms(result.data);
            }
        })
    }, [])

    const handleChangeRoom = (event) => {
        console.log(selectedDate);
        console.log(event.target.value);
        setSelectedRoom(event.target.value);
        console.log(selectedRoom);
        };

return (
    <div className={classes.paper}>
        <Typography component="h1" variant="h6" >
            HotelRoomBooking
        </Typography>

        <Grid container maxwidth="xl" className={classes.grid}>
            <Grid item xs={2} >
                <TextField className={classes.text}
                           id="filled-select-floor-native"
                           select
                           label="Please select the room"
                           value={selectedDate}
                           onChange={handleChangeRoom}
                           SelectProps={{
                               native: true,
                           }}
                           variant="outlined"
                >
                    <option aria-label="None" value="" />
                    {rooms?.map((option) => (
                        <option key={option.id} value={option.id}>
                           Floor: {option.floor}, Room Number: {option.roomNumber}
                        </option>
                    ))}
                </TextField>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" >
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker"
                            label="Pick a date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" >
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker"
                            label="Pick a date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>

            </Grid>
            </Grid>

    </div>
);
}


export default User;