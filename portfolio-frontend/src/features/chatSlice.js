import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit';
import { User } from 'lucide-react';
import axios from 'axios';
// const url = "http://localhost:5002";
const url = 'https://portfolio-afkm.onrender.com';

const initialState = {
  ChatStatus: {
    isPending: false,
    isFulfilled: false,
    isRejected: false,
  },
  messages: [],
  thread_id: '',
  socketConnected: false,
};

export const NewConversation = createAsyncThunk(
  'Chat/NewConversation',
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/new_conversation`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response ? error.response.data.message : 'Network Error',
      });
    }
  }
);

export const TrinityChat = createAsyncThunk(
  'Chat/TrinityChat',
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/chat`, params);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response ? error.response.data.message : 'Network Error',
      });
    }
  }
);

const chatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { text } = action.payload;
      state.messages.push({
        id: Date.now(),
        text,
        sender: 'user',
        timestamp: new Date().toISOString(),
      });
    },
  },
  extraReducers: (builder) => {
    // NEW CONVERSATION
    builder.addCase(NewConversation.pending, (state) => {
      state.ChatStatus.isPending = true;
      state.ChatStatus.isFulfilled = false;
      state.ChatStatus.isRejected = false;
    });
    builder.addCase(NewConversation.fulfilled, (state, action) => {
      state.ChatStatus.isPending = false;
      state.ChatStatus.isFulfilled = true;
      state.ChatStatus.isRejected = false;
      state.thread_id = action.payload.data.thread_id;

      // Handle structured response
      if (action.payload.data.response) {
        state.messages.push({
          id: Date.now(),
          response: action.payload.data.response,
          sender: 'assistant',
          timestamp: new Date().toISOString(),
        });
      } else {
        // Fallback for simple message
        state.messages.push({
          id: Date.now(),
          text:
            action.payload.data.message ||
            "Hello! I'm Trinity, how can I help you?",
          sender: 'assistant',
          timestamp: new Date().toISOString(),
        });
      }
    });
    builder.addCase(NewConversation.rejected, (state, action) => {
      state.ChatStatus.isPending = false;
      state.ChatStatus.isFulfilled = false;
      state.ChatStatus.isRejected = true;
      state.error = action.payload.message || 'An error occurred';
    });

    // TRINITY CHAT
    builder.addCase(TrinityChat.pending, (state) => {
      state.ChatStatus.isPending = true;
      state.ChatStatus.isFulfilled = false;
      state.ChatStatus.isRejected = false;
    });
    builder.addCase(TrinityChat.fulfilled, (state, action) => {
      state.ChatStatus.isPending = false;
      state.ChatStatus.isFulfilled = true;
      state.ChatStatus.isRejected = false;

      // Handle structured response
      if (action.payload.data.response) {
        state.messages.push({
          id: Date.now(),
          response: action.payload.data.response,
          sender: 'assistant',
          timestamp: new Date().toISOString(),
        });
      } else {
        // Fallback for simple message
        state.messages.push({
          id: Date.now(),
          text:
            action.payload.data.message ||
            "I'm sorry, I couldn't process that.",
          sender: 'assistant',
          timestamp: new Date().toISOString(),
        });
      }
    });
    builder.addCase(TrinityChat.rejected, (state, action) => {
      state.ChatStatus.isPending = false;
      state.ChatStatus.isFulfilled = false;
      state.ChatStatus.isRejected = true;
      state.error = action.payload.message || 'An error occurred';
    });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
