import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { useAuth } from "../context/AuthContext";

import "../styles/profile.css";


function Profile(){

    const {user}=useAuth();


    return(

        <>

        <Navbar/>


        <div className="dashboard">

            <Sidebar/>


            <div className="profile-container">

                <div className="profile-card">

                    <h2>
                        Profile
                    </h2>


                    <p>
                        Name :
                        {" "}
                        {user?.fullname}
                    </p>


                    <p>
                        Email :
                        {" "}
                        {user?.email}
                    </p>


                    <p>
                        Account Type :
                        Normal User
                    </p>


                </div>

            </div>


        </div>


        </>

    )

}


export default Profile;