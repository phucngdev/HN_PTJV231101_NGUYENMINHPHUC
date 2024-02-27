import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../api/axios";

// hàm lấy dữ liệu
export const findAll = createAsyncThunk("user/findAll", async () => {
  try {
    // gọi api lấy dữ liệu
    const response = await baseUrl.get("users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// hàm xóa 1 bản ghi theo id
export const remove = createAsyncThunk("user/remove", async (id) => {
  try {
    let response = await baseUrl.delete(`users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

//hàm tìm kiếm thông tin một bản ghi theo id
export const findOne = createAsyncThunk("user/findOne", async (id) => {
  try {
    let response = await baseUrl.get(`users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const post = createAsyncThunk("user/post", async (data) => {
  try {
    let response = await baseUrl.post(`users`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const put = createAsyncThunk("user/put", async ({ id, data }) => {
  try {
    let response = await baseUrl.put(`users/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const patch = createAsyncThunk(
  "user/patch",
  async ({ id, statusUpdate }) => {
    try {
      const response = await baseUrl.patch(`users/${id}`, statusUpdate);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
