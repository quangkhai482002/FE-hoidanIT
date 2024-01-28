import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Button,
  message,
  Modal,
  Input,
  Space,
  Table,
  Form,
  Select,
} from "antd";
import "./user.scss";
import { fetchAllUsers, deleteUsers } from "../../services/userService";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { fetchGroup } from "../../services/userService";
import ModalDelete from "./ModalDelete";
import ModalCreate from "./ModalCreate";

const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let res = await fetchAllUsers();
    if (res && res.data && res.data.EC === 0) {
      setListUser(res.data.DT);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "Group",
      key: "Group",
      render: (Group) => (Group ? `${Group.name}` : "No role"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleDeleteUser(record)}
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
          <Button
            onClick={() => handleCreateUser()}
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
        </Space>
      ),
    },
  ];
  //==============   Delete user   ===================
  const handleDeleteUser = async (record) => {
    setDataModal(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    let res = await deleteUsers(dataModal);
    if (res && res.data && res.data.EC === 0) {
      message.success(res.data.EM);
      await fetchUsers();
    } else {
      message.error(res.data.EM);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setDataModal({});
    setIsModalOpen(false);
  };

  //==============   Create user   ===================
  const handleCreateUser = () => {
    setDataEdit();
    setIsModalEditOpen(true);
  };
  const handleCreateOk = async () => {
    setIsModalEditOpen(false);
  };
  const handleCreateCancel = () => {
    setIsModalEditOpen(false);
  };

  return (
    <div className="mananger-users-container">
      <div className="users-header">
        <div className="title">
          <h3>Table users</h3>
        </div>

        <div className="add-user">
          <Button
            type="primary"
            icon={<UserOutlined />}
            onClick={() => handleCreateUser()}
          >
            Add user
          </Button>
        </div>

        {/* ==============   Delete user   =================== */}
        <ModalDelete
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          dataModal={dataModal}
        />

        {/* ==============   Edit user   =================== */}
        <ModalCreate
          open={isModalEditOpen}
          onOk={handleCreateOk}
          onCancel={handleCreateCancel}
        />

        <div className="table-data">
          <Table columns={columns} dataSource={listUser} />
        </div>
      </div>
    </div>
  );
};
export default Users;
