import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    content: "",
    messages: []
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  }
});

export const { setContent, addMessage, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
