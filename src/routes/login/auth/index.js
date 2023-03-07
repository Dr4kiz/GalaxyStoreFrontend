import { Button, Input, Form, Checkbox, Alert } from "antd";
import styled from "styled-components";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import wicon from "../../../assets/images/wicon.png";
import { DiscordIcon } from "../../../utils/DiscordIcon";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios, { Axios } from "axios";
import { api } from "../../../api/galaxtapi";

const AuthDiv = styled.div`
  display: flex;
  background-color: #fafafa;
  color: #2c2c2c;
  justify-content: center;
  align-items: center;
  height: 100vh;
  img {
    width: 40%;
  }

  .login-form {
    width: 400px;
    height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const AuthLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 50px;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  span {
    padding: 0 10px;
  }
  ::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: #e8e8e8;
  }

  ::before {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: #e8e8e8;
  }
`;

const LoginMethods = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  .login-form-button {
    margin: 0 10px;
  }
`;

export const Auth = () => {
  const [user, setUser] = useContext(AuthContext);
  const [usernameError, setUsernameError] = useState(false);
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["access_token"]);

  const handleLogin = async (values) => {
    setLoading(true);
    const response = await api
      .post("auth/login", {
        username: values.username,
        password: values.password,
        rememberMe: values.remember,
      })
      .then((response) => {
        const { data } = response;
        setLoading(true);
      
        let expires = new Date();
        if (values.remember) {
          expires.setDate(expires.getDate() + 7);
        } else {
          expires.setDate(expires.getDate() + 1);
        }



        setAlert(<Alert message="Login efetuado com sucesso!" type="success" />);
        setCookie("access_token", data.token, { path: "/", expires: expires });
        setUser(data);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      })
      .catch((error) => {
        const { data } = error.response;
        setAlert(<Alert message={data.message} type="error" showIcon />);
        setLoading(false);
      });
  };

  return (
    <AuthDiv>
      <AuthLeft>
        <h1>Faça login para continuar</h1>
        <img src={wicon}></img>
      </AuthLeft>
      <Form
        onFinish={handleLogin}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <LoginMethods>
          <Button
            type="primary"
            disabled
            htmlType="submit"
            className="login-form-button"
          >
            {" "}
            <GoogleOutlined />
            Google
          </Button>
          <Button
            type="primary"
            disabled
            htmlType="submit"
            className="login-form-button"
          >
            {" "}
            <DiscordIcon />
            Discord
          </Button>
        </LoginMethods>
        <Separator>
          <span>ou</span>
        </Separator>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Você precisa inserir um nome de usuário!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={
              usernameError ? (
                <ClockCircleOutlined />
              ) : (
                <UserOutlined className="site-form-item-icon" />
              )
            }
            placeholder="Insira seu nome de usuário"
            status={usernameError ? "error" : "success"}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Você precisa inserir uma senha!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            size="large"
            placeholder="Sua senha"
          />
        </Form.Item>

        <Form.Item
        
         name="remember" valuePropName="checked" noStyle>
          <Checkbox
          style={{
            marginBottom: 5,
          }}
          >Manter conectado</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Entrar
          </Button>
          <br />
          Ou <Link to="/register">registre-se agora!</Link>
        </Form.Item>
        {alert !== undefined && alert}
      </Form>
    </AuthDiv>
  );
};
