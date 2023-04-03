import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Swal from "sweetalert2";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { updateProfileData } from "../../redux/actions/profileDataAction";

import { useForm } from "react-hook-form";

function Profile() {

    const { register, handleSubmit } = useForm();

    // const [name, setName] = useState("Your Name");
    // const [email, setEmail] = useState("xyz@gmail.com");
    // const [address, setAddress] = useState("ABC-123, Philadelphia, 756346");
    // const [contact, setContact] = useState("1234567891");
    // const [age, setAge] = useState(0);
    // const [gender, setGender] = useState("Male");
    // const [image, setImage] = useState(null);
    const [sjBtn, setSJBtn] = useState();
    const [imageTag, setImageTag] = useState();


    const dispatch = useDispatch();

    useEffect(() => {
        setSJBtn(
            <button type="button" onClick={handleEdit}>
                Add Profile
            </button>
        );
    }, []);




    const handleEdit = () => {
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) inputs[i].disabled = false;
        const textarea = document.getElementsByTagName("textarea")[0];
        textarea.disabled = false;
        const select = document.getElementsByTagName("select")[0];
        select.disabled = false;

        //activate save btn
        // const saveBtn = document.getElementsByTagName("button")[1];
        // saveBtn.style.display = "inline";
        setSJBtn(
            <button type="submit">
                Save Profile
            </button>
        );
    };


    function handleSave(data) {

        //disable inputs after changes
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) inputs[i].disabled = true;
        const textarea = document.getElementsByTagName("textarea")[0];
        textarea.disabled = true;
        const select = document.getElementsByTagName("select")[0];
        select.disabled = true;


        console.log(data);


        // const imgPreview = document.getElementById("imgId");
        // if (imgPreview) imgPreview.src = URL.createObjectURL(data.image);



        setSJBtn(
            <button type="button" onClick={handleEdit}>
                Edit Profile
            </button>
        );


        setImageTag(
            <img id="imgId" src={URL.createObjectURL(data.image[0])} alt="Profile Pic" />
        )


        dispatch(updateProfileData(data))


        // Save edited info in motoko

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your profile has been updated successfully",
            showConfirmButton: false,
            timer: 1500
        });
    };

    // const imageChangeKoHandle = (e) => {
    //     const image = e.target.files[0];
    //     if (!image) {
    //         return;
    //     }

    //     setImage(image);

    //     const imgPreview = document.getElementById("imgId");
    //     if (imgPreview) imgPreview.src = URL.createObjectURL(image);
    // };

    return (
        <div className="profile">
            <Sidebar />
            <div className="navProfileContainer">
                <Navbar />
                <div className="profileContainer">
                    <div className="profileImg">
                        {imageTag}
                        <div className="editIcon" onClick={handleEdit}>
                            <i className="fa fa-pencil"></i>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(handleSave)}>
                        <div className="col">
                            <label>Name:</label>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Email:</label>
                            <input
                                {...register("email", { required: true })}
                                type="text"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Address:</label>
                            <textarea
                                {...register("address", { required: true })}
                                // value={address}
                                // onChange={(e) => setAddress(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Contact:</label>
                            <input
                                {...register("contact", { required: true })}
                                type="tel"
                                // // value={contact}
                                // // onChange={(e) => setContact(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Age:</label>
                            <input
                                {...register("age", { required: true })}
                                type="number"
                                // // value={age}
                                // // onChange={(e) => setAge(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Gender:</label>
                            <select
                                {...register("gender", { required: true })}
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                                disabled
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col uploadKaCSS">
                            <label>Upload or Edit Image</label>
                            <input

                                {...register("image", { required: true })}
                                type="file"
                                accept="image/*"
                                // onChange={imageChangeKoHandle}
                                disabled
                            />
                        </div>
                        {sjBtn}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
