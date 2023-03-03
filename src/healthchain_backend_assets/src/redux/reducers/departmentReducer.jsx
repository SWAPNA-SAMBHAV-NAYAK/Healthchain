const initialState = {
    departments: []
  };
  
  
  const departmentReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'get_department_list':
        return { ...state, departments: action.payload.departments };
      default:
        return { ...state }
    }
  }
  
  export default departmentReducer;
  