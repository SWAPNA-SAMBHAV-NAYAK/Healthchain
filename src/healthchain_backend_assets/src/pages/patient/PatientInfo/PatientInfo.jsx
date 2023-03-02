import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function PatientInfo() {

  // const params = useParams();


  // useEffect(() => {
  //   console.log(params);
  // }, [])


  return (
    <div>
      <div className="patientDetailsCard">
        <div className="patientDetailsCardContent">
          <div className="cardTextContainer">
            <h2 className="cardHeader">Swapna Sambhav</h2>
            <span className="userId">ID:12345</span>
            <div className="cardTags">
              <span className="tag" id="tag1">
                <strong>Blood Group:</strong> {bloodGroup}
              </span>
              <span className="tag" id="tag2">
                <strong>Age:</strong> {age}
              </span>
              <span className="tag" id="tag3">
                <strong>Weight:</strong> {weight}
              </span>
              <span className="tag" id="tag4">
                <strong>Height:</strong> {height}
              </span>
              <span className="tag" id="tag5">
                <strong>Gender:</strong> {gender}
              </span>
            </div>
            <p className="tag" id="tag6">
              <strong>Address:</strong> {address}
            </p>
          </div>
          <div className="cardButtons">
            <button
              className="btnDesign"
              id="edit-button"
              onClick={handleEditButton}>
              Edit Details
            </button>
            <button className="btnDesign">Button 1</button>
            <button className="btnDesign">Button 1</button>
          </div>
        </div>
      </div>

      {
        isPopupOpen && (
          <div id="popup">
            <form id="form" onSubmit={handleSubmit}>
              <label htmlFor="tag1">Blood Group:</label>
              <input
                type="text"
                id="tag-1-input"
                name="tag1"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              />
              <br />
              <label htmlFor="tag2">Age:</label>
              <input
                type="text"
                id="tag-2-input"
                name="tag2"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <br />
              <label htmlFor="tag3">Weight:</label>
              <input
                type="text"
                id="tag-3-input"
                name="tag3"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <br />
              <label htmlFor="tag4">Height:</label>
              <input
                type="text"
                id="tag-4-input"
                name="tag4"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <br />
              <label htmlFor="tag5">Gender:</label>
              <input
                type="text"
                id="tag-5-input"
                name="tag5"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <br />
              <label htmlFor="tag6">Address:</label>
              <textarea
                id="tag-6-input"
                name="tag6"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        )
      }
    </div>
  )
}