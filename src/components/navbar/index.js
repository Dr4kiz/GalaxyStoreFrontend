import styled from "styled-components";
import wicon from "../../assets/images/wicon.png";

import {
  UserOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Input, Space, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { CartContext } from "../../context/CartContext";
import { PluginShop } from "./shop/PluginShop";
import axios from "axios";
import { useCookies } from "react-cookie";
import { api } from "../../api/galaxtapi";

const NavBarComponent = styled.nav`
  color: #fff;
  img {
    width: 70px;
    filter: invert(100%);
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

const PluginModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 10px;
  text-align: left;
  .ant-btn-primary {
    width: 100%;
  }

  .ant-btn-primary:disabled {
    background-color: #d9d9d9;
    border-color: #d9d9d9;
  }
`;

const PluginModalList = styled.div`
  overflow: auto;
  width: 100%;
  max-height: 300px;
  text-align: center;
`;

const PluginPrice = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 10px;
  h3 {
    font-size: 20px;
    font-weight: 500;
    color: #a4a4a4;
  }
  h4 {
    font-size: 20px;
    font-weight: 500;
    color: #a4a4a4;
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
    color: #424242;
  }
`;

export const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);
  const [cookie, setCookie] = useCookies(['access_token'])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const pluginsIDs = cart.map((plugin) => plugin.id);
    api
      .post(
        "/plugin/v1/checkout",
        {
          plugins: pluginsIDs,
          username: user.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookie.access_token,
          },
        }
      )
      .then((response) => {
        setCart([]);
        setIsModalOpen(false);
        setCookie("access_token", response.data.token, { path: "/" });
      })
      
  
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <NavBarComponent>
      <Link to="/">
        <img src={wicon} alt="icon"></img>
      </Link>

      <Space>
        <Button
          type="default"
          icon={<UserOutlined />}
          size="large"
          onClick={() => navigate("/profile")}
        >
          {user?.username || "Meu Perfil"}
        </Button>
        <Button
          type="default"
          icon={<ShoppingOutlined />}
          size="large"
          onClick={showModal}
        >
          {cart?.length || 0}
        </Button>
        <Modal
          title="Meu Carrinho"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          style={{ top: 20 }}
        >
          <PluginModalContent>
            <PluginModalList>
              {cart.length === 0 && (
                <AppstoreOutlined
                  style={{
                    fontSize: "100px",
                    color: "#08c",
                    padding: "20px",
                  }}
                />
              )}
              {cart.map((plugin) => (
                <PluginShop plugin={plugin} />
              ))}
            </PluginModalList>
            {cart.length > 0 && (
              <PluginPrice>
                <h3>
                  Total:{" "}
                  {formatPrice(
                    cart.reduce((acc, plugin) => acc + plugin.price, 0)
                  )}
                </h3>
                <h4>
                  Desconto:{" "}
                  {formatPrice(
                    cart.reduce((acc, plugin) => acc + plugin.price, 0) * 0.1
                  )}
                </h4>
                <h2>
                  Valor Final:{" "}
                  {formatPrice(
                    cart.reduce((acc, plugin) => acc + plugin.price, 0) * 0.9
                  )}
                </h2>
              </PluginPrice>
            )}
            <Button
              type="primary"
              disabled={cart.length === 0}
              size="large"
              onClick={handleOk}
            >
              Finalizar Compra
            </Button>
          </PluginModalContent>
        </Modal>
      </Space>
    </NavBarComponent>
  );
};
