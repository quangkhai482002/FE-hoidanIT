import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./login.scss";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";

const onFinish = (values) => {
  console.log("Success:", values);
};

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!email) {
      message.error("Email không được để trống!");
      return;
    }
    if (!password) {
      message.error("Mật khẩu không được để trống!");
      return;
    }

    let response = await loginUser(email, password);
    if (response && +response.EC === 0) {
      // success
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      navigate("/users");
      window.location.reload();

      //redux
    }
    if (response && +response.EC !== 0) {
      // wrong password
      message.error(response.EM);
      return;
    }
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter" && e.charCode === 13) {
      handleLogin();
    }
  };

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      navigate("/users");
    }
  }, []);
  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="centered-image">
          <img src={logo} alt="logo" width={200} />
        </div>

        <div className="centered-welcome">
          <div className="title">Welcome to Webnovel!</div>
        </div>

        <div className="centered-become">
          <div className="title">Become the Next Top Writer with Webnovel.</div>
        </div>

        <Form.Item
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
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              handlePressEnter(e);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ float: "left" }}>Remember me</Checkbox>
          </Form.Item>

          <a style={{ float: "right" }} className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", marginBottom: "10px" }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
          Chưa có tài khoản? <Link to="/register">Đăng kí ngay!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
