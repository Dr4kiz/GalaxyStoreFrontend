import { Button, Input, Form, Checkbox, Alert } from "antd";
import styled from "styled-components";
import { UserOutlined, LockOutlined, GoogleOutlined, AuditOutlined, MailOutlined } from "@ant-design/icons";
import wicon from "../../../assets/images/wicon.png";
import { DiscordIcon } from "../../../utils/DiscordIcon";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import axios, { Axios } from "axios";
import { AuthContext } from "../../../context/AuthProvider";
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
    background-color: #fff;
    padding: 25px;
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

export const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(AuthContext);
  const [alert, setAlert] = useState();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const handleLogin = async (values) => {


    if(!values.accept){
      setAlert(<Alert message="Você precisa aceitar os termos de uso para continuar" type="error" showIcon />);
      return;
    }

    setLoading(true);
    const response = await api
      .post("/auth/register", {
        username: values.username,
        name: values.name,
        email: values.email,
        password: values.password,
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
        setCookie("access_token", data.token, { path: "/", expires: expires });
        setUser(data);
        setAlert(<Alert message="Conta criada com sucesso!" type="success" showIcon />);
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
        <h1>Faça uma conta para continuar</h1>
        <img src={wicon}></img>
      </AuthLeft>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={handleLogin}
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
          name="name"
          rules={[
            {
              required: true,
              message: "Você precisa inserir o seu nome!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Insira seu nome (Ex.: Galaxy Souza da Silva)"
          />
        </Form.Item>
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
            prefix={<AuditOutlined className="site-form-item-icon" />}
            placeholder="Insira seu nome de usuário"
          />
        </Form.Item>
        <Form.Item
          name="email"
          type="email"
          rules={[
            {
              required: true,
              message: "Você precisa inserir um email!",
              type: "email",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
        
            placeholder="Insira seu email"
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
        <Form.Item>
          <Form.Item
            name="accept"
            valuePropName="checked"
            
            noStyle
          >
            <Checkbox
              style={{
                marginBottom: 10,
              }}
            >
              Aceito os <Link to="/terms" target={"_blank"} rel="noopener noreferrer">Termos de Licença</Link> do site
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              htmlType="submit"
              loading={loading}
            >
              Registrar
            </Button>
            <br />
            Ou <Link to="/auth">Faça login</Link>
          </Form.Item>
          {alert !== undefined && alert}

        </Form.Item>
      </Form>
    </AuthDiv>
  );
};
