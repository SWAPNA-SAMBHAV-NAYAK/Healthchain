import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Swal from "sweetalert2";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileData } from "../../redux/actions/profileDataAction";
import { useForm } from "react-hook-form";

import { canisterId, createActor } from "../../../../declarations/healthchain_backend";
import { AuthClient } from "@dfinity/auth-client";


function Profile() {




    const { profileData } = useSelector((state) => state.profileData);

    const [sjBtn, setSJBtn] = useState();
    const [imageTag, setImageTag] = useState();


    const dispatch = useDispatch();



    const { register, handleSubmit, reset } = useForm(
        {
            defaultValues: {
                name: "",
                email: "",
                address: "",
                contact: "",
                age: 0,
                gender: "Male",

            }
        }
    );


    useEffect(() => {
        setSJBtn(
            <button type="button" onClick={handleEdit}>
                Edit Profile
            </button>
        );
    }, []);


    useEffect(() => {
        reset({
            name: profileData.name,
            email: profileData.email,
            address: profileData.address,
            contact: profileData.contact,
            age: profileData.age,
            gender: profileData.gender,
        });
    }, [profileData])

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


    useEffect(() => {
        dispatch(updateProfileData())
    }, [dispatch]);



    useEffect(() => {
        if (profileData.image) {
            const imageurl = URL.createObjectURL(profileData.image[0]);
            setImageTag(
                <img id="imgId" src={imageurl} alt="Profile Pic" />
            )
        }

    }, [profileData])


    async function handleSave(data) {

        //disable inputs after changes
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) inputs[i].disabled = true;
        const textarea = document.getElementsByTagName("textarea")[0];
        textarea.disabled = true;
        const select = document.getElementsByTagName("select")[0];
        select.disabled = true;


        setSJBtn(
            <button type="button" onClick={handleEdit}>
                Edit Profile
            </button>
        );


        setImageTag(
            <img id="imgId" src={URL.createObjectURL(data.image[0])} alt="Profile Pic" />
        )

        const imageArray = await data.image[0].arrayBuffer();
        const imageByteData = [...new Uint8Array(imageArray)];


        const authClient = await AuthClient.create();
        const identity = await authClient.getIdentity();

        const authenticatedCanister = createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });

        const result = await authenticatedCanister.createProfile(data.name,
            data.email,
            data.address,
            data.contact,
            data.age,
            data.gender,
            imageByteData);


        dispatch(updateProfileData())


        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your profile has been updated successfully",
            showConfirmButton: false,
            timer: 1500
        });
    };

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
                                defaultValue={profileData.name}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Email:</label>
                            <input
                                {...register("email", { required: true })}
                                type="text"
                                defaultValue={profileData.email}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Address:</label>
                            <textarea
                                {...register("address", { required: true })}
                                defaultValue={profileData.address}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Contact:</label>
                            <input
                                {...register("contact", { required: true })}
                                type="tel"
                                defaultValue={profileData.contact}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Age:</label>
                            <input
                                {...register("age", { required: true })}
                                type="number"
                                defaultValue={profileData.age}
                                disabled
                            />
                        </div>
                        <div className="col">
                            <label>Gender:</label>
                            <select
                                {...register("gender", { required: true })}
                                defaultValue={profileData.gender}
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
