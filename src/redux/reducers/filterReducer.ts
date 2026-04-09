type FilterState = {
    res: 'all' | 'active' | 'done'
}

type FilterAction = {
    type: 'filter',
    payload: 'all' | 'active' | 'done'
}

const initialValue: FilterState = {
  res: "all",
};

export const filterReducer = (store = initialValue, action:FilterAction):FilterState => {
  switch (action.type) {
    case "filter":
      return { ...store, res: action.payload };

    default:
      return store;
  }
};