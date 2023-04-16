import React from "react";
// import hdindex from "./images/hdindex.png";
import "./Styling.scss";

const HeartIndex = () => {
  return (
    <div className="diseasecontainer">
      <h2>Heart Disease</h2>
      <img src={"https://lh3.googleusercontent.com/drive-viewer/AAOQEOSzaPwx78ac43CpnphGWr0jt76TaCSmxL-efnxrpXiXCeA5hnmlHkHks7LcryiJenaFMlDsuDi73LE28V67WcRYrB-V0A=s2560"} alt="heart disease image" />
      <p>
        Heart disease is a group of conditions that affect the structure and
        function of the heart. It is often caused by a build-up of plaque in the
        arteries, which can lead to a heart attack, stroke, or other
        complications. Risk factors for heart disease include high blood
        pressure, high cholesterol, smoking, and diabetes.
      </p>
      <h3>Symptoms</h3>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Symptom</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Chest pain or discomfort</td>
            <td>
              This symptom is caused by reduced blood flow to the heart, which
              can lead to chest pain or discomfort, often described as a
              tightness, pressure, or burning sensation in the chest.
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Shortness of breath</td>
            <td>
              As the heart struggles to pump blood, it can lead to shortness of
              breath, especially during physical activity or when lying down.
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Fatigue</td>
            <td>
              The heart is responsible for pumping oxygen-rich blood to the
              body, so when it is not functioning properly, it can lead to
              feelings of tiredness and fatigue.
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Swelling in the legs, ankles, or feet</td>
            <td>
              As blood flow from the heart slows, it can cause fluid to build up
              in the legs, ankles, and feet, leading to swelling and discomfort.
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Dizziness or lightheadedness</td>
            <td>
              Poor blood flow to the brain can cause dizziness or
              lightheadedness, especially when standing up or changing
              positions.
            </td>
          </tr>
        </tbody>
      </table>
      <a href="https://www.cdc.gov/heartdisease/about.htm#:~:text=What%20is%20heart%20disease%3F,can%20cause%20a%20heart%20attack.">
        Learn More
      </a>
    </div>
  );
};

export default HeartIndex;
