import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadEmployeeList = () => async (dispatch) => {

  const employeeList = await healthchain_backend.readEmployees();


  dispatch({
    type:'get_employee',
    payload: { employees: employeeList },
  }) 
} 