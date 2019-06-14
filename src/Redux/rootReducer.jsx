 const INIT_STATE={
    events:[{
        id:'given',
        event:['get milk','go to gym']
    }]
}
const rootReducer = (state=INIT_STATE,action)=>{
    switch (action.type) {
        case "ADD_EVENT":
            return{...state,events:action.payload}
        default:
            return state
    }
}





export default rootReducer