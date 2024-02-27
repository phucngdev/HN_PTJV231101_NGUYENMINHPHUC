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
        state.status = "Successfully!"; // trả về trạng thái thành công
        state.data = action.payload; // gán lại dữ liệu lấy từ api cho giá trị khởi tạo
      })
      .addCase(findAll.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message; // lấy ra nội dung lỗi
      })
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
      .addCase(post.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(post.fulfilled, (state, action) => {
        state.status = "Successfully!"; // trả về trạng thái thành công
        state.data.push(action.payload); // gán lại dữ liệu lấy từ api cho giá trị khởi tạo
      })
      .addCase(post.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message; // lấy ra nội dung lỗi
      })
      .addCase(patch.pending, (state) => {
        state.status = "Pending"; // Đặt trạng thái là "Pending" khi yêu cầu gửi đi
      })
      .addCase(patch.fulfilled, (state, action) => {
        state.status = "Success"; // Đặt trạng thái là "Success" khi yêu cầu thành công
        // Cập nhật thông tin người dùng đã sửa
        state.data = state.data.map((user) => {
          if (user.id === action.payload.id) {
            return { ...user, ...action.payload }; // Cập nhật các trường mới từ phản hồi API
          }
          return user;
        });
      })
      .addCase(patch.rejected, (state, action) => {
        state.status = "Failed"; // Đặt trạng thái là "Failed" khi yêu cầu thất bại
        state.error = action.error.message; // Lưu thông báo lỗi
      })
      .addCase(put.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(put.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = state.data.map((user) => {
          if (user.id === action.payload?.id) {
            return { ...user, ...action.payload }; // Cập nhật các trường mới từ phản hồi API
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
