import React, { useEffect, useState } from "react";
import { Modal } from "antd";

const ModalDelete = (props) => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Confirm delete user",
      content: `Are you sure you want to delete user?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        props.onOk();
      },
      onCancel() {
        props.onCancel();
      },
    });
  };

  // Call the function when the component is rendered
  React.useEffect(() => {
    if (props.open) {
      showDeleteConfirm();
    }
  }, [props.open]);

  return null;
  // return (
  //   <>
  //     <Modal
  //       title="Confirm delete user"
  //       open={props.open}
  //       onOk={props.onOk}
  //       onCancel={props.onCancel}
  //     >
  //       <p>
  //         Are you sure you want to delete user:{" "}
  //         <strong>{props.dataModal.email}</strong> ?
  //       </p>
  //     </Modal>
  //   </>
  // );
};
export default ModalDelete;
