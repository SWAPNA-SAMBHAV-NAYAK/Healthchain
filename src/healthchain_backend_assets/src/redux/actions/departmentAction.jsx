import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadDepartmentList = () => async (dispatch) => {

    const departmentList = await healthchain_backend.readDepartments();

    dispatch({
        type: 'get_department_list',
        payload: { departments: departmentList },
    })
} 