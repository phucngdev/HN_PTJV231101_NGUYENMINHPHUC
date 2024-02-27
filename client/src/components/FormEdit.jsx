import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findOne, put } from "../services/user.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";

const FormEdit = ({ selectedId, setShowEdit }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.userEdit);

  const loadDataUser = () => {
    dispatch(findOne(selectedId));
  };
  useEffect(() => {
    loadDataUser();
  }, []);

  useEffect(() => {
    formik.setValues({
      name: dataUser?.name || "",
      email: dataUser?.email || "",
      dateOfBirth: dataUser?.dateOfBirth || "",
      address: dataUser?.address || "",
    });
  }, [dataUser]);

  // hàm close form
  const handleCloseForm = () => {
    setShowEdit(false);
  };

  // hàm validate và submit form
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
      const newUserEdit = {
        ...dataUser,
        name: values.name,
        email: values.email,
        address: values.address,
        dateOfBirth: values.dateOfBirth,
        updatedTime: new Date().toLocaleString(),
      };
      dispatch(put({ id: selectedId, data: newUserEdit }));
      message.success({
        content: "save successful. Welcome!",
      });
      setShowEdit(false);
    },
  });

  return (
    <>
      <div className="overlay" hidden="">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Sửa thông tin nhân viên</h4>
            <i onClick={handleCloseForm} className="fa-solid fa-xmark" />
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input
              name="name"
              value={formik.values.name}
              defaultValue={dataUser?.name}
              onChange={formik.handleChange}
              id="userNameEdit"
              type="text"
              className="form-control"
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="form-text error">{formik.errors.name}</div>
          ) : null}
          <div>
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <input
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              id="dateOfBirthEdit"
              type="date"
              className="form-control"
            />
          </div>
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <div className="form-text error">{formik.errors.dateOfBirth}</div>
          ) : null}
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              id="emailEdit"
              type="text"
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
              id="addressEdit"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              rows={3}
              defaultValue={""}
            />
          </div>
          <div>
            <button className="w-100 btn btn-primary">Lưu</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormEdit;
