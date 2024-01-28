import React, { useEffect, useState } from "react";
import { Modal } from "antd";

const ModalDelete = (props) => {
  return (
    <>
      <Modal
        title="Confirm delete user"
        open={props.open}
        onOk={props.onOk}
        onCancel={props.onCancel}
      >
        <p>
          Are you sure you want to delete <bold>{props.dataModal.email}</bold> ?
        </p>
      </Modal>
    </>
  );
};
export default ModalDelete;
