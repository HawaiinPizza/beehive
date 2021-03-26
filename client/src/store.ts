import { configureStore } from '@reduxjs/toolkit'
enum Relation{
        Manager,
        RSVP,
        NotRSVP
}
interface MemberInfo {
        id: number;
        firstname: string;
        lastname: string;
        points: number;
}


// ACTIOn
const redux_index = (new_index:number) =>{ return { type: 'INDEX', payload:new_index } }
const redux_rsvp = (rsvp_state:number) =>{ return { type: 'RSVP', payload:rsvp_state } }
const redux_id = (id_state:number) =>{ return { type: 'ID', payload:id_state } }
const redux_transfer = (id:number) =>{ return { type: 'ID2', payload:id } }
const redux_members = (members_state:Array<MemberInfo>|null) =>{ return { type: 'MEMBERS', payload:members_state } }

// REDUCER
const change_index = (state={index:0, relation:Relation.Manager, id:-1, members:null, big:-1}, action:any) =>{
        switch(action.type){
                case "INDEX":
                        return {...state, index:action.payload}
                case "RSVP":
                        return {...state, relation:action.payload}
                case "ID":
                        return {...state, id:action.payload}
                case "MEMBERS":
                        return {...state, id:action.payload}
                case "ID2":
                        return {...state, big:action.payload}

                default:
                        return {...state, index:state.index, relation:state.relation}
        }

}
// REDUX END
const store = configureStore(
        { reducer: {state: change_index }}
); 




export { store, redux_index, redux_rsvp, redux_id, redux_members, redux_transfer};
