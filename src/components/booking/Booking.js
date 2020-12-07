import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {useAuth} from "../connection/Auth";
import bookingStyles from "./BookingStyles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import moment from 'moment';
import { MuiPickersUtilsProvider,DatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // import

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Booking(){
    const { authTokens } = useAuth();
    const classes = bookingStyles();
    const [value, setValue] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [floors, setFloors] = useState([]);
    const [arriveDate, setArriveDate] = useState("");
    const [leaveDate, setLeaveDate] = useState("");
    const [room, setRoom] = useState("");
    const [floor, setFloor] = useState("");
    const [openFloor, setOpenFloor] = React.useState(false);
    const [openRoom, setOpenRoom] = React.useState(false);
    const [isPosted, setPosted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedCheckIn, setSelectedCheckIn] = useState(new Date());
    const [selectedCheckOut, setSelectedCheckOut] = useState(new Date());
    const [selectedRoom, setSelectedRoom] = useState("");
    const [bookings, setBookings] = useState([]);
    const [bookedDate, setBookedDate] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPosted(false);
        setIsError(false);
    };

    const handleFloorClose = () => {
        setOpenFloor(false);
    };


    const handleFloorOpen = () => {
        setOpenFloor(true);
        getFloors();
    };

    const handleRoomClose = () => {
        setOpenRoom(false);
        getBookingsOnRoom();
    };


    const handleRoomOpen = () => {
        setOpenRoom(true);
        getRooms();
    };


    function getBookingsOnRoom(){
        axios.get(
            "http://localhost:8080/bookings",
            {auth: {username:authTokens.username, password:authTokens.password}}
        ).then(result => {
            if (result.status === 200) {
                setBookings(result.data);
            }
            
        })
    
    }
  
    function getRooms() {
        axios.get(
            "http://localhost:8080/rooms",
            {auth: {username:authTokens.username, password:authTokens.password}}
        ).then(result => {
            if (result.status === 200) {
                let filteredRooms = []; 
                result.data.forEach(element => {
                    if(element.floor === selectedFloor){
                        filteredRooms.push(element);
                    }
                });
               
               setRooms(filteredRooms);
               
            }
        })
    }

    
    function getFloors() {
        axios.get(
            "http://localhost:8080/rooms",
            {auth: {username:authTokens.username, password:authTokens.password}}
        ).then(result => {
            if (result.status === 200) {
                let filteredFloors = new Set();
                let filteredArray = [];

                result.data.forEach(element => {
                    filteredFloors.add(element.floor);
                });
                filteredFloors.forEach(element => {
                    filteredArray.push(element);
                })
                setFloors(filteredArray);
               
            }
        })
    }




    function postReservation() {
        axios.post(`http://localhost:8080/bookings/${​​​​​authTokens.id}​​​​​`, {
            floor:selectedFloor,
            room:selectedRoom, 
            arriveDate:selectedCheckIn,
            leaveDate:selectedCheckOut
        }, {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                setPosted(true);
                setFloor("");
                setRoom("");
                setArriveDate("");
                setLeaveDate("");
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    const renderUserFields = () => {
            return(
                <Select
                    labelId="subgenre-label"
                    id="genre"
                    color="primary"
                    className={classes.textField}
                    open={openFloor}
                    onClose={handleFloorClose}
                    onOpen={handleFloorOpen}
                    value={selectedFloor}
                    onChange={e => {
                        setSelectedFloor(e.target.value);
                    }}
                >
                    {floors.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
                </Select>
            )
        
    }

    const renderRoomSelection = () => {
        return(
            <Select
                labelId="room"
                id="genre"
                color="primary"
                className={classes.textField}
                defaultValue="1"
                open={openRoom}
                onClose={handleRoomClose}
                onOpen={handleRoomOpen}
                value={selectedRoom}
                onChange={e => {
                    setSelectedRoom(e.target.value);
                }}
            >
            {rooms.map((option) => ( 
            <MenuItem key={option.roomNumber} value={option.roomNumber}>
              {option.roomNumber}
            </MenuItem>
          ))}
            </Select>
        )
    
}

    

    if(authTokens.role==="ROLE_USER") {
        return(
            <React.Fragment>
                <Container maxWidth="lg" className={classes.user}>
                  
                            <Grid container spacing={3} align="center">
                                <Grid item xs={12} className={classes.gridAll} >
                                    <Typography variant="h6" >Please choose the room you would like to book!</Typography>
                                </Grid>
                                <Grid item xs={12}  className={classes.gridAll}>
                                    <FormControl className={classes.textField} color="primary">
                                        <InputLabel required id="floor" shrink>Floor</InputLabel>
                                        {renderUserFields()}
                                    </FormControl>
                                    <FormControl className={classes.textField} color="primary">
                                        <InputLabel required id="room" shrink>Room</InputLabel>
                                        {renderRoomSelection()}
                                    </FormControl>
                                </Grid>
                                
                                   
                            
                                <Grid item xs={12} className={classes.gridAll}>
                                    
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                    label="Check in"
                                    format="yyyy-MM-dd"
                                    value={selectedCheckIn}
                                    shouldDisableDate={(date) => {
                                        var booked = false;
                                        bookings.forEach(element => {
                                            if(element.floor == selectedFloor && element.room == selectedRoom){
                                                    if(moment(date).isSameOrAfter(moment(element.arriveDate)) && moment(date).isSameOrBefore(moment(element.leaveDate))){
                                                        booked = true;
                                                    }
                                            }
                                        });
                                        return booked;       
                                    }}
                                    onChange={selectedCheckIn => setSelectedCheckIn(selectedCheckIn)}
                                    minDate={new Date()}
                                    />
                                     </MuiPickersUtilsProvider>   
                                  

                                   
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                    label="Check out"
                                    format="yyyy-MM-dd"
                                    value={selectedCheckOut}
                                    onChange={selectedCheckOut => setSelectedCheckOut(selectedCheckOut)}
                                    shouldDisableDate={(date) => {
                                        var booked = false;
                                        bookings.forEach(element => {
                                            if(element.floor == selectedFloor && element.room == selectedRoom){
                                                    if(moment(date).isSameOrAfter(moment(element.arriveDate)) && moment(date).isSameOrBefore(moment(element.leaveDate))){
                                                        booked = true;
                                                    }
                                            }
                                        });
                                        return booked;     
                                    }}
                                    minDate={selectedCheckIn}
                                    /> 
                                     </MuiPickersUtilsProvider> 
                               
                                </Grid>
                                <Grid item xs={12} className={classes.gridAll}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={(e)=>{postReservation()}}
                                        className={classes.button}
                                    >
                                       Book
                                    </Button>
                                </Grid>
                            </Grid>
                    
                  
                    {isError &&
                    <Snackbar
                        open={isError}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        autoHideDuration={2000}
                        onClose={handleClose}>
                        <Alert severity="error">Booking failed, please try to submit the form again!</Alert>
                    </Snackbar>
                    }
                    {isPosted &&
                    <Snackbar
                        open={isPosted}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        autoHideDuration={2000}
                        onClose={handleClose}>
                        <Alert severity="success">Congratulation, your booking was successful!</Alert>
                    </Snackbar>
                    }
                </Container>
            </React.Fragment>
        )
    } else {
        return (
            <div className={classes.user}>
                <img src='./error.png' alt="error-img" width="5%"/>
                <br/>
                <Typography variant="h5">
                    You are not an User.
                </Typography>
               
            </div>
        );
    }
}

export default Booking;