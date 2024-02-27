import { message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { remove } from "../services/user.service";

const ModalDelete = ({ selectedId, setShowDelete }) => {
  const dispatch = useDispatch();

  // hàm đóng modal xác nhận
  const handleCloseShow = () => {
    setShowDelete(false);
  };

  // hàm xoá user qua id
  const handleDelete = async () => {
    try {
      await dispatch(remove(selectedId));
      message.success({
        content: "Remove successful!",
      });
      setShowDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overlay" hidden="">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i onClick={handleCloseShow} className="fa-solid fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light" onClick={handleCloseShow}>
              Hủy
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
