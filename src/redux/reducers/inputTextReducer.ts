
export type InitialValue = {
    value: string
}

const initialValue:InitialValue = {
    value: ''
}

type InitialStateType = typeof initialValue


const inputTextReducer= (store:InitialStateType = initialValue, action: {type: string, payload: string}):InitialStateType => {
    switch (action.type) {
        case 'change':
            return{...store, value: action.payload}
            
        case 'zero':
            return{...store, value:''}
    
        default:
           return store
    }
};

export default inputTextReducer