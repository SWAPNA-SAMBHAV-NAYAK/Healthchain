import React from "react";
// import ldp1 from "./images/ldp1.png";
import "./Styling.scss";
const LiverIndex = () => {
  return (
    <div className="diseasecontainer">
      <h2>Liver Disease</h2>
      <img src={"https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOQz74JT8YJ1M-bkeN3sewx1aa29QlPc-FJCkeL6-T_1Zqsy2tGLxI2BfoYA9bkkI78L4BVI7R1mJYAooxUINdvKrjEj=w1360-h617"} alt="liver image" />
      <p>
        Liver disease can be inherited (genetic) or caused by a variety of
        factors that damage the liver, such as viruses and alcohol use. Obesity
        is also associated with liver damage. Over time, damage to the liver
        results in scarring (cirrhosis), which can lead to liver failure, a
        life-threatening condition.
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
            <td>Yellowing of the skin and eyes (jaundice)</td>
            <td>The skin and whites of the eyes appear yellowish</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Abdominal pain and swelling</td>
            <td>Pain and swelling in the area of the stomach and abdomen</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Swelling in the legs and ankles</td>
            <td>Swelling in the legs and ankles due to fluid buildup</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Itchy skin</td>
            <td>Intense itching of the skin</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Dark urine color</td>
            <td>Urine appears dark or brownish in color</td>
          </tr>
        </tbody>
      </table>
      <a href="https://www.niddk.nih.gov/health-information/liver-disease" target="_blank">
        Learn More
      </a>
    </div>
  );
};

export default LiverIndex;
