import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findOne, patch } from "../services/user.service";
import { message } from "antd";

const ModalBlock = ({ selectedId, setShowBlock }) => {
  const dispatch = useDispatch();
  // lấy dữ liệu user
  const dataUser = useSelector((state) => state.user.userEdit);

  // hàm lấy dữ liệu 1 user qua id
  const loadDataUser = () => {
    dispatch(findOne(selectedId));
  };

  useEffect(() => {
    loadDataUser();
  }, []);

  // hàm close form edit
  const handleCloseShow = () => {
    setShowBlock(false);
  };

  // hàm block, thay đổi key status user = 0
  const handleBlock = async () => {
    try {
      await dispatch(patch({ id: selectedId, statusUpdate: { status: 0 } }));
      message.success({
        content: "block successful!",
      });
      setShowBlock(false);
    } catch (error) {
      console.log(error);
    }
  };

  // hàm unblock. thay đổi key status user = 1
  const handleUnBlock = async () => {
    try {
      await dispatch(patch({ id: selectedId, statusUpdate: { status: 1 } }));
      message.success({
        content: "unblock successful!",
      });
      setShowBlock(false);
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
            <span>
              Bạn có chắc chắn muốn{" "}
              {dataUser?.status === 1 ? "chặn" : "bỏ chặn"} tài khoản này?
            </span>
          </div>

          <div className="modal-footer-custom">
            <button onClick={handleCloseShow} className="btn btn-light">
              Hủy
            </button>
            {dataUser?.status === 1 ? (
              <button onClick={handleBlock} className="btn btn-danger">
                Xác nhận
              </button>
            ) : (
              <button onClick={handleUnBlock} className="btn btn-danger">
                Xác nhận
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBlock;
