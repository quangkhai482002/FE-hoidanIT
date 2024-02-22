import React, { useEffect, useState } from "react";
import { Button, message, Modal, Input, Space, Form, Select } from "antd";
import { fetchGroup, createNewUser } from "../../services/userService";
import _, { set } from "lodash";
const ModalCreate = (props) => {
  const defaultUserData = {
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    groupID: "",
    sex: "",
  };
  const validInputDefault = {
    username: true,
    email: true,
    password: true,
    phone: true,
    address: true,
    groupID: true,
    sex: true,
  };
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(validInputDefault);

  const [userGroup, setUserGroup] = useState([]);
  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = async () => {
    let data = await fetchGroup();
    if (data && data.EC === 0) {
      setUserGroup(data.DT);
    } else {
      message.error(data.EM);
    }
  };
  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const checkValidInput = () => {
    setValidInput(validInputDefault);
    let arr = ["username", "email", "password", "groupID"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        message.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };
  const onFinish = async () => {
    let check = checkValidInput();
    if (check === true) {
      let res = await createNewUser(userData);
      if (res && res.EC === 0) {
        message.success("Create user success");
        props.onCancel();
        props.fetchUsers();
        form.resetFields(); // Reset form fields
      } else {
        message.error(res.EM);
      }
    }
  };
  return (
    <Modal
      title="Create user"
      open={props.open}
      onOk={onFinish}
      onCancel={props.onCancel}
    >
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
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
            value={userData.username}
            onChange={(e) => handleOnChangeInput(e.target.value, "username")}
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
            value={userData.email}
            onChange={(e) => handleOnChangeInput(e.target.value, "email")}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            size="password"
            placeholder="password"
            value={userData.password}
            onChange={(e) => handleOnChangeInput(e.target.value, "password")}
          />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input
            size="large"
            placeholder="phone"
            value={userData.phone}
            onChange={(e) => handleOnChangeInput(e.target.value, "phone")}
          />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input
            size="large"
            placeholder="address"
            value={userData.address}
            onChange={(e) => handleOnChangeInput(e.target.value, "address")}
          />
        </Form.Item>

        <Form.Item
          label="Group"
          name="groupID"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Select
            // defaultValue={userGroup[0].id}
            options={userGroup.map((groupID) => ({
              label: groupID.name,
              value: groupID.id,
            }))}
            onChange={(value) => handleOnChangeInput(value, "groupID")}
          />
        </Form.Item>

        <Form.Item label="Sex" name="sex">
          <Select
            defaultValue={userData.sex}
            onChange={(value) => handleOnChangeInput(value, "sex")}
            // style={{
            //   width: 120,
            // }}

            options={[
              {
                value: "male",
                label: "male",
              },
              {
                value: "female",
                label: "female",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalCreate;
