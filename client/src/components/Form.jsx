import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { post } from "../services/user.service";

const Form = ({ setShowForm }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên không được để trống"),
      email: Yup.string()
        .required("email không được để trống")
        .email("email không hợp lệ"),
      dateOfBirth: Yup.date()
        .required("ngày sinh không được để trống")
        .max(new Date(), "Ngày sinh không hợp lệ"),
    }),
    onSubmit: async (values) => {
      const newUser = {
        id: uuidv4(),
        status: 1,
        ...values,
        createdTime: new Date().toLocaleString(),
      };
      dispatch(post(newUser));
      message.success({
        content: "Registration successful. Welcome!",
      });
      setShowForm(false);
    },
  });

  return (
    <>
      <div className="overlay" hidden="">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Thêm mới nhân viên</h4>
            <i
              onClick={() => setShowForm(false)}
              className="fa-solid fa-xmark"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              id="userName"
              type="text"
              className="form-control"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="form-text error">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <input
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              id="dateOfBirth"
              type="date"
              className="form-control"
            />
          </div>
          {formik.touched.date && formik.errors.date ? (
            <div className="form-text error">{formik.errors.date}</div>
          ) : null}
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              type="email"
              className="form-control"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="form-text error">{formik.errors.email}</div>
          ) : null}
          <div>
            <label className="form-label" htmlFor="address">
              Địa chỉ
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              rows={3}
              defaultValue={""}
            />
          </div>
          <div>
            <button className="w-100 btn btn-primary">Thêm mới</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
