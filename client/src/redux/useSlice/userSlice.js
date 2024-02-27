import { createSlice } from "@reduxjs/toolkit";
import {
  findAll,
  findOne,
  patch,
  post,
  put,
  remove,
} from "../../services/user.service";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    userEdit: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(findAll.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(findAll.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(findAll.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      // ----------- remove ----------------------------------------------------
      .addCase(remove.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.status = "Successfully!";
        // cập nhật lại dữ liệu
        state.data = state.data.filter(
          (user) => user.id !== action.payload?.data.id
        );
      })
      // ----------- findOne ----------------------------------------------------
      .addCase(findOne.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(findOne.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.userEdit = action.payload;
      })
      .addCase(findOne.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      // ----------- post ----------------------------------------------------
      .addCase(post.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(post.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data.unshift(action.payload);
      })
      .addCase(post.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      // ----------- patch ----------------------------------------------------
      .addCase(patch.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(patch.fulfilled, (state, action) => {
        state.status = "Success";
        state.data = state.data.map((user) => {
          if (user.id === action.payload.id) {
            return { ...user, ...action.payload };
          }
          return user;
        });
      })
      .addCase(patch.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      })
      // ----------- put ----------------------------------------------------
      .addCase(put.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(put.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = state.data.map((user) => {
          if (user.id === action.payload?.id) {
            return { ...user, ...action.payload };
          }
          return user;
        });
      })
      .addCase(put.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
