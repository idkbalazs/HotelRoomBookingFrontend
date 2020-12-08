import ReservationsStyles from "./ReservationsStyle";
import React, {useState} from "react";
import {useAuth} from "../connection/Auth";
import MaterialTable from "material-table";
import axios from "axios";

function Reservations() {

    const classes = ReservationsStyles();
    const [data, setData] = useState([]);
    const { authTokens } = useAuth();
    const reservationData = data.map(item => ({ id: item.id, name: item.user.name, floor: item.floor, room: item.room, arriveDate: item.arriveDate, leaveDate: item.leaveDate}));
    const columns=[
        {
            title: 'Your name', field:'name'
        },
        {
            title: 'Floor', field:'floor'
        },
        {
            title: 'Room Number', field:'room'
        },
        {
            title: 'Arrive Date', field:'arriveDate'
        },
        {
            title: 'Leave Date', field:'leaveDate'
        }
    ]

    React.useEffect(() => {
        axios.get(`https://hotelroombookingbackend.herokuapp.com/bookings/user/${authTokens.id}`,
            {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                setData(result.data);
                console.log(result.data);
            }
        })
    }, [])

    function deleteReservation(props) {
        console.log(props);
        axios.delete("https://hotelroombookingbackend.herokuapp.com/bookings/" + props, {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                if(data.length > 1) {
                    axios.get(`https://hotelroombookingbackend.herokuapp.com/bookings/user/${authTokens.id}`, {
                        auth: {
                            username: authTokens.username,
                            password: authTokens.password
                        }
                    }).then(result => {
                        if (result.status === 200) {
                            setData(result.data);
                        }
                    }).catch(
                        setData([])
                    )
                } else {
                    setData([]);
                }
            }
        });
    }

    if(authTokens.role==="ROLE_USER"){
        return(
            <div>
                <div className={classes.paper}>
                </div>
                <MaterialTable
                    title={"Your Reservations"}
                    columns={columns}
                    data={reservationData}
                    options={{
                        search:false,
                    }}
                    editable={{
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    deleteReservation(oldData.id);
                                }, 600);
                            }),
                    }}
                />
            </div>
        )} else {
        return(
            <h1 className={classes.paper}>
                You can't reach this site with your authentication.</h1>
        );
    }
};

export default Reservations;