import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadDepartmentList = (authCannister) => async (dispatch) => {

    if (authCannister) {
        const departmentList = await authCannister.readDepartments();
 
        dispatch({
            type: 'get_department_list',
            payload: { departments: departmentList },
        })
    }    
}                                     