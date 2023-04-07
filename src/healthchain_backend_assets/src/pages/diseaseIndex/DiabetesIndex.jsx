import React from "react";
// import dm1 from "./images/dm1.jpg";
import "./Styling.scss";

const DiabetesIndex = () => {
  return (
    <div className="diseasecontainer">
      <h2>Diabetes Disease</h2>
      <img src={"https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEORvlFBqgOIsqgPkan5Agn1o_THtHZwvviAraZksOE-cE3b8JXrT8myv6-TgADQUvtipSrVQdX5YGZA_xbwjwFa-KBQfFg=w1360-h617"} alt="diabetes image" />
      <p>
        Diabetes is a chronic disease that affects the way your body regulates
        blood sugar (glucose). Glucose is the fuel that powers your body, but to
        enter your cells it needs a key. Insulin is that key. People with
        diabetes don’t have enough insulin to unlock the cells’ energy.
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
            <td>Increased thirst and urination</td>
            <td>
              This symptom is caused by high levels of glucose in the blood,
              which leads to increased urine production and dehydration.
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Increased hunger</td>
            <td>
              Diabetes can cause the body to crave more food, especially
              carbohydrates, as the cells are not getting enough glucose for
              energy.
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Unexplained weight loss</td>
            <td>
              As the body cannot use glucose for energy, it starts to break down
              fats and proteins, which can lead to weight loss.
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Fatigue</td>
            <td>
              The cells in the body are not getting enough glucose for energy,
              leading to feelings of tiredness and fatigue.
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Blurred vision</td>
            <td>
              High levels of glucose in the blood can cause fluid to be pulled
              from the lenses of the eyes, leading to blurred vision.
            </td>
          </tr>
        </tbody>
      </table>
      <a href="https://www.who.int/health-topics/diabetes" target="_blank">Learn More</a>
    </div>
  );
};

export default DiabetesIndex;
