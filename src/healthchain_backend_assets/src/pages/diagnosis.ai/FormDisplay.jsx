import React, { useState } from "react";
import AssessForm from "./AssessForm";
import "./FormDisplay.scss";
import { data } from "./data";
import Dropdown from "./Dropdown";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useForm } from "react-hook-form";
import axios from 'axios';
import useAuthenticatedCannister from "../../useAuthenticatedCannister";
import Swal from "sweetalert2";
import { Circles } from 'react-loader-spinner';
import uuid from 'react-uuid';

const FormDisplay = () => {
  const [chosenDisease, setChosenDisease] = useState(null);
  const [inputs, setInputs] = useState({});

  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const authCannister = useAuthenticatedCannister();

  const submitKoHandle = (data) => {
    setIsLoading(true)

    const ngrokUrl = 'https://baf8-103-165-169-6.ngrok-free.app/';

    const baseUrl = `${ngrokUrl}/diagnosis.ai`;

    let config = {
      headers: {
        'Cache-Control': 'no-cache',
      }
    }


    Swal.fire({
      title: "Do you want to submit?",
      showDenyButton: true,
      confirmButtonText: "Submit",
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (chosenDisease.value === 'heart') {

          axios.post(`${baseUrl}/heart_analysis`, new URLSearchParams(data), config)
            .then(async (response) => {

              console.log(response)

              if (response.data === 1) {
                await authCannister.createHeartReport(
                  uuid(),
                  parseInt(data['age']),
                  data['sex'],
                  data['chestpaintype'],
                  parseInt(data['restingbp']),
                  parseInt(data['cholesterol']),
                  parseInt(data['fastingbs']),
                  data['restingecg'],
                  parseInt(data['maxhr']),
                  data['exerciseangina'],
                  parseFloat(data['oldpeak']),
                  data['stslope'],
                  "High Risk",
                );
                Swal.fire("Data Analysed! You have high risk of Heart Disease. Please consult a doctor as soon as possible.", "", "success");
              } else {
                await authCannister.createHeartReport(
                  uuid(),
                  parseInt(data['age']),
                  data['sex'],
                  data['chestpaintype'],
                  parseInt(data['restingbp']),
                  parseInt(data['cholesterol']),
                  parseInt(data['fastingbs']),
                  data['restingecg'],
                  parseInt(data['maxhr']),
                  data['exerciseangina'],
                  parseFloat(data['oldpeak']),
                  data['stslope'],
                  "Low Risk",
                );
                Swal.fire("Data Analysed! You have low risk of Heart Disease", "", "success");
              }
              setIsLoading(false);
            })
            .catch(function (error) {
              console.log(error);
            });

        }



        if (chosenDisease.value === 'liver') {

          axios.post(`${baseUrl}/liver_analysis`, new URLSearchParams(data), config)
            .then(async (response) => {

              console.log(response)

              if (response.data === 1) {
                await authCannister.createLiverReport(
                  uuid(),
                  parseInt(data['age']),
                  data['gender'],
                  parseFloat(data['totalbilirubin']),
                  parseInt(data['alkalinephosphatase']),
                  parseInt(data['alamineamino']),
                  parseFloat(data['albuminandglobulin']),
                  "High Risk",
                );
                Swal.fire("Data Analysed! You have high risk of Liver Disease. Please consult a doctor as soon as possible.", "", "success");
              } else {
                await authCannister.createLiverReport(
                  uuid(),
                  parseInt(data['age']),
                  data['gender'],
                  parseFloat(data['totalbilirubin']),
                  parseInt(data['alkalinephosphatase']),
                  parseInt(data['alamineamino']),
                  parseFloat(data['albuminandglobulin']),
                  "Low Risk",
                );
                Swal.fire("Data Analysed! You have low risk of Liver Disease", "", "success");
              }
              setIsLoading(false);
            })
            .catch(function (error) {
              console.log(error);
            });
        }








      }
    });

  };

  const chosenDiseaseKoHandle = (e) => {
    const disease = data.find((d) => d.value === e);

    setChosenDisease(disease);
    reset({})
  };
  return (
    <div className="mainContainer">
      <Sidebar />
      <div className="ekAurClass">
        <Navbar />
        <div className="container"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <Dropdown
            data={data}
            chosenDiseaseKoHandle={chosenDiseaseKoHandle}
            chosenDisease={chosenDisease}
          />
          {chosenDisease &&
            <AssessForm
              inputs={inputs}
              setInputs={setInputs}
              disease={chosenDisease}
              handleSubmit={handleSubmit}
              submitKoHandle={submitKoHandle}
              register={register} />}
        </div>
      </div>
      <div className="screen_loader">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoading}
        />
      </div>
    </div>
  );
};

export default FormDisplay;
