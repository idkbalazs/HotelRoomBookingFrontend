import React, {useState} from "react";
import {useAuth} from "../connection/Auth";
import MaterialTable from "material-table";
import axios from "axios";
import Reservations from "./UserReservations";
import ReservationsStyles from "./ReservationsStyle";

function Admin() {

    const classes = ReservationsStyles();
    const [data, setData] = useState([]);
    const { authTokens } = useAuth();
    const reservationData = data.map(item => ({ id: item.id, name: item.user.name, floor: item.floor, room: item.room, arriveDate: item.arriveDate, leaveDate: item.leaveDate}));
    const columns=[
        {
            title: 'Guest name', field:'name'
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
        axios.get("http://localhost:8080/bookings/all",
            {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                setData(result.data);
                console.log(result.data);
            }
        })
    }, [])

    function deleteReservation(props) {
        console.log(props);
        axios.delete("http://localhost:8080/bookings/" + props, {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                if(data.length > 1) {
                    axios.get(`http://localhost:8080/bookings/all`, {
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

    if(authTokens.role==="ROLE_ADMIN"){
        return(
            <div>
                <div className={classes.paper}>
                </div>
                <MaterialTable
                    title={"Reservations"}
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

export default Admin;