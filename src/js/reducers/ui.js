const ui = (state = {
  formData: {
    demand: {},
    defect: {},
    effort: {},
  },
}, action) => {
  switch (action.type) {
  case 'UPDATE_FORM_DATA': {
    const newFormData = state.formData;
    newFormData.id = state.formData.id ? state.formData.id.toString() : '';
    switch (action.section) {
    case 'header': {
      newFormData[action.key] = action.value;
      return {
        ...state,
        formData: newFormData,
      };
    }
    case 'demand': {
      newFormData.demand[action.key] = action.value;
      return {
        ...state,
        formData: newFormData,
      };
    }
    case 'defect': {
      newFormData.defect[action.key] = action.value;
      return {
        ...state,
        formData: newFormData,
      };
    }
    case 'effort': {
      newFormData.effort[action.key] = action.value;
      return {
        ...state,
        formData: newFormData,
      };
    }
    default: return state;
    }
  }
  case 'INITIALIZE_FORM_DATA': {
    return {
      ...state,
      formData: action.project,
    };
  }
  case 'REMOVE_LIST_ITEM': {
    let newList = state.formData[action.section][action.list];
    newList = newList.slice(0, action.index).concat(newList.slice(action.index + 1));
    const newFormData = state.formData;
    newFormData[action.section][action.list] = newList;
    newFormData.newAppendage = 'thumb';
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'MOVE_LIST_ITEM_UP': {
    if (action.index === 0) {
      return {
        ...state,
      };
    }
    const newList = state.formData[action.section][action.list];
    const temp = newList[action.index - 1];
    newList[action.index - 1] = newList[action.index];
    newList[action.index] = temp;
    const newFormData = state.formData;
    newFormData[action.section][action.list] = newList;
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'MOVE_LIST_ITEM_DOWN': {
    const newList = state.formData[action.section][action.list];
    if (action.index >= newList.length - 1) {
      return {
        ...state,
      };
    }
    const temp = newList[action.index + 1];
    newList[action.index + 1] = newList[action.index];
    newList[action.index] = temp;
    const newFormData = state.formData;
    newFormData[action.section][action.list] = newList;
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'ADD_DEMAND_FLOW_LIST_ITEM': {
    const newFormData = state.formData;
    newFormData.demand.flow.push({ name: action.name });
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'ADD_DEFECT_FLOW_LIST_ITEM': {
    const newFormData = state.formData;
    newFormData.defect.flow.push({ name: action.name });
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'ADD_ROLE_LIST_ITEM': {
    const newFormData = state.formData;
    newFormData.effort.role.push({ name: action.name, groupWith: action.groupWith });
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'ADD_SEVERITY_LIST_ITEM': {
    const newFormData = state.formData;
    newFormData.defect.severity.push({ name: action.name, groupWith: action.groupWith });
    return {
      ...state,
      formData: newFormData,
    };
  }
  default: return state;
  }
};

export default ui;
