import React, { useEffect } from "react";
import "./Notification.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loadNotificationList } from "../../redux/actions/notificationAction";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";

const Notification = () => {

    const { notifications } = useSelector(state => state.notificationList);

    const dispatch = useDispatch();

    const authCannister = useAuthenticatedCannister();


    useEffect(() => {
        dispatch(loadNotificationList(authCannister));
    }, [authCannister])

    // const notific = [
    //     {
    //         doctor: "Samyak",
    //         timestamp: "09:00:00 06-04-2023"
    //     },
    //     {
    //         doctor: "Manan",
    //         timestamp: "09:00:00 06-04-2023"
    //     },
    //     {
    //         doctor: "Sohan",
    //         timestamp: "09:00:00 06-04-2023"
    //     }
    // ];
    // let sentence = "Your appointmemt has been set with Dr.";


    return (
        <div className="notification">
            <Sidebar />
            <div className="navNotificationContainer">
                <Navbar />
                <div className="notificationContainer">
                    <header>
                        <h2>My Notifications</h2>
                    </header>
                    {notifications.map((n, i) => (
                        <div key={i} className="notificCard">
                            <div className="msg">
                                {n.notification}
                            </div>
                            <div className="timestamp">{new Date(Number(n.time_stamp) / 1000000).toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;
