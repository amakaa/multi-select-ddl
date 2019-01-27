const ADD_DEPARTMENT = 'departments/ADD_DEPARTMENT';
const REMOVE_DEPARTMENT = 'departments/REMOVE_DEPARTMENT';
const SET_EXPANDED = 'departments/SET_EXPANDED';

const initialState = {
  selectedDepartments: [],
  expanded: false,
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_DEPARTMENT:
      return {
        ...state,
        ...{
          selectedDepartments: [
            ...state.selectedDepartments,
            action.result.department
          ],
          expanded: state.expanded,
        }
      }
    case REMOVE_DEPARTMENT:
      return {
        ...state,
        ...{
          selectedDepartments: [
            ...state.selectedDepartments.filter(c => (c !== action.result.department
            ))
          ],
          expanded: state.expanded,
        }
      }
    case SET_EXPANDED:
      return {
        ...state,
        ...{
          expanded: action.result.expanded,
        }   
      }
    default:
      return state;
  }
}

export function getSelectedDepartments(state) {
  return state && state.selectedDepartments;
}

export function getExpandedState(state) {
  return state && state.expanded;
}

export function setExpandedState(expanded) {
  return {
    type: SET_EXPANDED,
    result: { 
      expanded
    }
  }
}

export function addDepartment(department) {
  return {
    type: ADD_DEPARTMENT,
    result: { 
      department
    }
  }
}

export function removeDepartment(department) {
  return {
    type: REMOVE_DEPARTMENT,
    result: { department },
  }
}
