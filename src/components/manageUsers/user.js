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
import ModalEdit from "./ModalEdit";

const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [dataCreate, setDataCreate] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataModalUser, setDataModalUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let res = await fetchAllUsers();
    console.log("res:", res);
    if (res && res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const columns = [
    {
      title: "No.",
      key: "no.",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
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
      title: "Password",
      dataIndex: "password",
      key: "password",
      width: 100,
      className: "column-no", // Add this line
    },
    {
      title: "User name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
            onClick={() => handleEditUser(record)}
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
    setIsModalDeleteOpen(true);
  };

  const handleOk = async () => {
    let res = await deleteUsers(dataModal);
    if (res && res.EC === 0) {
      message.success(res.EM);
      await fetchUsers();
    } else {
      message.error(res.EM);
    }
    setIsModalDeleteOpen(false);
  };
  const handleCancel = () => {
    setDataModal({});
    setIsModalDeleteOpen(false);
  };

  //==============   Create user   ===================
  const handleCreateUser = () => {
    // setActionModal("CREATE");
    setDataCreate();
    setIsModalCreateOpen(true);
  };
  const handleCreateOk = async () => {
    setIsModalCreateOpen(false);
  };
  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
  };
  //==============   Edit user   ===================
  const handleEditUser = (record) => {
    console.log("record", record);
    setDataModalUser(record);
    setIsModalEditOpen(true);
  };
  const handleEditOk = async () => {
    setIsModalEditOpen(false);
  };
  const handleEditCancel = () => {
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

        {/* ==============   Modal delete user   =================== */}
        <ModalDelete
          open={isModalDeleteOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          dataModal={dataModal}
        />

        {/* ==============   Modal create user   =================== */}
        <ModalCreate
          open={isModalCreateOpen}
          onOk={handleCreateOk}
          onCancel={handleCreateCancel}
          fetchUsers={fetchUsers}
        />

        {/* ==============   Modal edit user   =================== */}
        <ModalEdit
          open={isModalEditOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
          fetchUsers={fetchUsers}
          dataModalUser={dataModalUser}
        />

        <div className="table-data">
          <Table
            columns={columns}
            dataSource={listUser}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Users;
