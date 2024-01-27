import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Button, message, Modal, Input } from "antd";
import "./user.scss";
import { Space, Table, Form, Select } from "antd";
import { fetchAllUsers, deleteUsers } from "../../services/userService";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { fetchGroup } from "../../services/userService";

const Users = (props) => {
  const [listUser, setListUser] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentLimit, setCurrentLimit] = useState(20);
  // const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // let res = await fetchAllUsers(currentPage, currentLimit);
    let res = await fetchAllUsers();
    if (res && res.data && res.data.EC === 0) {
      // console.log("res", res.data.DT);
      // setTotalPages(res.data.EC.totalPages);
      setListUser(res.data.DT);
    }
  };

  useEffect(() => {
    getGroup();
  }, []);
  const getGroup = async () => {
    let data = await fetchGroup();
    if (data && data.data && data.data.EC === 0) {
      setUserGroup(data.data.DT);
    } else {
      message.error(data.data.EM);
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

  //==============   Edit user   ===================
  const handleEditUser = (record) => {
    setDataEdit(record);
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

        {/* ==============   Delete user   =================== */}
        <Modal
          title="Confirm delete user"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        />

        {/* ==============   Edit user   =================== */}
        <Modal
          title="Edit user"
          open={isModalEditOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input
                size="large"
                placeholder="Username"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input
                size="large"
                placeholder="Username"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Group" name="group">
              <Select
                options={userGroup.map((group) => ({
                  label: group.name,
                  value: group.id,
                }))}
              />
            </Form.Item>

            <Form.Item label="Sex" name="sex">
              <Select
                defaultValue="123"
                // style={{
                //   width: 120,
                // }}
                // onChange={handleChange}
                options={[
                  {
                    value: "123",
                    label: "123",
                  },
                  {
                    value: "khai",
                    label: "khai",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* ========================================================= */}

        <div className="table-data">
          <Table columns={columns} dataSource={listUser} />
        </div>
      </div>
    </div>
  );
};
export default Users;
