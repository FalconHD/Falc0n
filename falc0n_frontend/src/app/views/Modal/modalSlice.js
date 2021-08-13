import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    action: "",
    data: {}
};



export const modalSlice = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
        activateModal: (state, { payload }) => {
            state.status = payload
        },
        modalData : (state, { payload }) => {
            state.action = payload.action
            state.data = payload.infos
        }
    }
});


export const { activateModal,modalData } = modalSlice.actions;
export default modalSlice.reducer;
