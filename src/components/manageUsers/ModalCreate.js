import React, { useEffect, useState } from "react";
import { Button, message, Modal, Input, Space, Form, Select } from "antd";
import { fetchGroup } from "../../services/userService";

const ModalCreate = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [userGroup, setUserGroup] = useState([]);
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
  return (
    <Modal
      title="Edit user"
      open={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
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
  );
};
export default ModalCreate;
