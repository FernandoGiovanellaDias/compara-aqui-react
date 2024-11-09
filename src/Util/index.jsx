export const reducer = (state, action) => {
    switch (action.type) {
        case 'INPUT': {
            let data = {};
            data[action.name] = action.value;
            data = { ...state, ...data };
            return data;
        }
        case 'MANY_VALUES':
            return { ...state, ...action.values };
        default:
            return state;
    }
};


export default reducer;