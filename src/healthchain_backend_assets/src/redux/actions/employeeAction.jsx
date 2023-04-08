import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadEmployeeList = (authCannister) => async (dispatch) => {

  if (authCannister) {
    const employeeList = await authCannister.readEmployees();

    dispatch({
      type: 'get_employee',
      payload: { employees: employeeList },
    })
  }
} 