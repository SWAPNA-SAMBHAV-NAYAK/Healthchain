const initialState = {
    employees: []
  };
  
  
  const employeeReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'get_employee':
        return { ...state, employees: action.payload.employees };
      default:
        return { ...state }
    }
  }
  
  export default employeeReducer;
  