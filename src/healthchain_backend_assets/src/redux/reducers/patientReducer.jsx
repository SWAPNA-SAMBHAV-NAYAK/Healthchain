import React from 'react'

const initialState ={
  patients:[
    
  ]
};
const patientReducer = (state=initialState,action)=>{
  switch(action.type){
    case 'get_patient':
      return {...state, patients:action.payload};
    default:
      return state
  }
}

export default patientReducer;

// const patientCardReducer = ({patient}) => {
//   return (
//     <div className='patientreducer'>
//       <img src={patient.img} alt="" />
//       <div className="patientInfo">
//         <h2>{patient.name}</h2>
//         <p>{patient.others}</p>
//       </div>
//     </div>
//   )
// }

// export default patientCardReducer

// import patientCardReducer from ----
// const patientListReducer = ({patient}) => {
//   return (
//     <div className='patientListreducer'>
//         {
//           patient.map((x) =>{
//             <patientReducer key={patient.id} />
//           })
//         }  
//     </div>
//     </div>
//   )
// }
// export default patientListReducer;

