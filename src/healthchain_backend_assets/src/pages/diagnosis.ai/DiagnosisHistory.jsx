import React, { useEffect } from "react";
import "./DiagnosisHistory.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadHeartReportList } from "../../redux/actions/heartReportAction";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";
import { loadLiverReportList } from "../../redux/actions/liverReportAction";
function DiagnosisHistory() {


  const params = useParams();

  const dispatch = useDispatch();

  const authCannister = useAuthenticatedCannister();

  const { liverReports } = useSelector(state => state.liverReportList);
  const { heartReports } = useSelector(state => state.heartReportList);


  useEffect(() => {
    dispatch(loadHeartReportList(authCannister,params.patient_id));
  }, [authCannister])

  useEffect(() => {
    dispatch(loadLiverReportList(authCannister,params.patient_id));
  }, [authCannister])


  return (
    // <div className="mainContainer">
    //   <Sidebar />
    //   <div className="ekAurClass">
    //     <Navbar />
    //     <div className="container">
          <div className="tableContainer">
            <h2>Heart Disease Diagnosis History</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  {/* <th>Id</th> */}
                  <th>Timestamp</th>
                  {/* <th>Patient_ID</th>
                  <th>Done_BY</th> */}
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Chest Pain Type</th>
                  <th>Resting BP</th>
                  <th>Cholesterol</th>
                  <th>Fasting Blood Sugar</th>
                  <th>Resting ECG</th>
                  <th>Maximum Heart Rate</th>
                  <th>Exercise induced Angina</th>
                  <th>Old Peak</th>
                  <th>Peak Exercise Slope</th>
                  <th>Risk?</th>
                  {/* <th colSpan={2} className="text-center">
              Actions
            </th> */}
                </tr>
              </thead>
              <tbody>
                {heartReports.length > 0 ? (
                  heartReports.map((heartReport, i) => (
                    <tr key={heartReport.report_id}>
                      <td>{i + 1}</td>
                      {/* <td>{heartReport.report_id}</td> */}
                      <td>{new Date(Number(heartReport.time_stamp) / 1000000).toLocaleString()}</td>
                      {/* <td>{heartReport.patient_id.toString()}</td>
                      <td>{heartReport.done_by.toString()}</td> */}
                      <td>{parseInt(heartReport.age)}</td>
                      <td>{heartReport.sex}</td>
                      <td>{heartReport.chest_pain_type}</td>
                      <td>{parseInt(heartReport.resting_bp)}</td>
                      <td>{parseInt(heartReport.cholesterol)}</td>
                      <td>{parseInt(heartReport.fasting_blood_sugar)}</td>
                      <td>{heartReport.resting_ecg}</td>
                      <td>{parseInt(heartReport.max_heart_rate)}</td>
                      <td>{heartReport.exercise_induced_angina}</td>
                      <td>{heartReport.old_peak}</td>
                      <td>{heartReport.peak_exercise_slope}</td>
                      <td>{heartReport.outcome}</td>
                      {/* <td className="text-right">
                  <button
                    onClick={() => handleEdit(heartReport.report_id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(heartReport)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={14}>No Diagnosis History</td>
                  </tr>
                )}
              </tbody>
            </table>
            <h2>Liver Disease Diagnosis History</h2>
            <table className="table">

              <thead>
                <tr>
                  <th>No.</th>
                  {/* <th>Id</th> */}
                  <th>Timestamp</th>
                  {/* <th>Patient_ID</th>
                  <th>Done_BY</th> */}
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Total Bilirubin </th>
                  <th>Alkaline Phosphatase</th>
                  <th>Alamine Aminotransferase</th>
                  <th>Albumin & Globulin Ratio</th>
                  <th>Risk?</th>
                  {/* <th colSpan={2} className="text-center">
              Actions
            </th> */}
                </tr>
              </thead>
              <tbody>
                {liverReports.length > 0 ? (
                  liverReports.map((liverReport, i) => (
                    <tr key={liverReport.report_id}>
                      <td>{i + 1}</td>
                      {/* <td>{liverReport.report_id}</td> */}
                      <td>{new Date(Number(liverReport.time_stamp) / 1000000).toLocaleString()}</td>
                      {/* <td>{liverReport.patient_id.toString()}</td>
                      <td>{liverReport.done_by.toString()}</td> */}
                      <td>{parseInt(liverReport.age)}</td>
                      <td>{liverReport.gender}</td>
                      <td>{liverReport.total_bilirubin}</td>
                      <td>{parseInt(liverReport.alkaline_phosphatase)}</td>
                      <td>{parseInt(liverReport.alamine_amino_transferase)}</td>
                      <td>{liverReport.albumin_globulin_ratio}</td>
                      <td>{liverReport.outcome}</td>
                      {/* <td className="text-right">
                  <button
                    onClick={() => handleEdit(liverReport.report_id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(liverReport)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>No Diagnosis History</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default DiagnosisHistory;
