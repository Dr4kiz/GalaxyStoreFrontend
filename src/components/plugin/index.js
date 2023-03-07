import { Button, Card, message } from "antd";
import styled from "styled-components";
import {
  ShoppingCartOutlined,
  DownloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/galaxtapi";

const PluginBody = styled(Card)`
  width: 250px;
  min-height: 300px;
  height: 90%;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  padding: 10px;
  margin-top: 20px;

  color: #141414;
  animation: slide-fwd-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @keyframes slide-fwd-center {
    0% {
      transform: translateZ(-1400px);
      opacity: 0;
    }
    100% {
      transform: translateZ(0);
      opacity: 1;
    }
  }
`;

const PluginTag = styled.div` 
  background-color: #5273e0;
  color: #fff;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(1, 1, 1, 0.5);
  width: 50%;

  margin: 0 auto 2px;
  border-radius: 5px;
  h2 {
    font-weight: lighter;
  }
`;

const PluginInfo = styled.div`
  min-height: 90px;
  h1 {
    font-size: 1rem;
    font-weight: bolder;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const sendMessage = (content, type) => {
  message.open({
    type,
    content: content,
  });
};

export const PluginItem = ({ plugin, purchased }) => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  const [user, setUser] = useContext(AuthContext);

  const handleClick = () => {
    if(user?.plugins){
    const ids = user.plugins.split(",").map((id) => parseInt(id));
    if (ids.includes(plugin.id)) {
      sendMessage("Você já possui este plugin", "error");
      return;
    }
  }

    setLoading(true);
    if (plugin.price > 0 && !purchased) {
      if (cart.find((item) => item.id === plugin.id)) return;
      setCart([...cart, plugin]);
      sendMessage("Plugin adicionado ao carrinho", "success");
      return;
    }
    if (plugin.price > 0 && purchased)
      return alert("Você já possui este plugin");

      api
      .post(`/plugin/download/${plugin.id}`, {
        responseType: "blob",
      })
      .then((res) => {
        const fileNameHeader = "x-suggested-filename";
        const suggestedFileName = res.headers[fileNameHeader];
        const effectiveFileName =
          suggestedFileName === undefined ? plugin.fileName : suggestedFileName;
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", effectiveFileName);
        document.body.appendChild(link);
        link.click();
        setLoading(false);
        sendMessage("Plugin baixado com sucesso", "success");
      }).catch(err => {
        sendMessage("Erro ao baixar plugin", "error");
        setLoading(false);
      });
  };

  const handleDownload = () => {
    setLoading(true);
    api
      .post(`/plugin/download/${plugin.id}`, {
        responseType: "blob",
      })
      .then((res) => {
        const fileNameHeader = "x-suggested-filename";
        const suggestedFileName = res.headers[fileNameHeader];
        const effectiveFileName =
          suggestedFileName === undefined ? plugin.fileName : suggestedFileName;
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", effectiveFileName);
        document.body.appendChild(link);
        link.click();
        sendMessage("Plugin baixado com sucesso", "success");
        setLoading(false);
      }).catch(err => {
        sendMessage("Erro ao baixar plugin", "error");
        setLoading(false);
      });
  };

  return (
    <PluginBody key={plugin.id} className="slide-fwd-center">
      <img
        style={{
          width: "32%",
          minHeight: "60px",
        }}
        src={plugin.image}
        alt="Plugin Icon"
      />
      <PluginTag>
        <h2>{plugin.tag}</h2>
      </PluginTag>
      <PluginInfo>
        <h1>{plugin.name}</h1>
        <p>
          {purchased
            ? "Adquirido"
            : plugin.price <= 0
            ? `Grátis`
            : `R$${plugin.price}`}
        </p>
      </PluginInfo>
      <Button
        type="primary"
        onClick={handleClick}
        icon={
          purchased ? (
            <SettingOutlined />
          ) : plugin.price > 0 ? (
            <ShoppingCartOutlined />
          ) : (
            <DownloadOutlined />
          )
        }
        style={{
          width: "100%",
          height: "40px",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        {purchased ? "Configurar" : plugin.price <= 0 ? "Baixar" : "Adquirir"}
      </Button>
      {purchased && (
        <Button
          type="primary"
          onClick={handleDownload}
          icon={<DownloadOutlined />}
          style={{
            width: "100%",
            height: "30px",
            borderTopLeftRadius: 5,
            marginTop: 5,
          }}
          loading={loading}
        >
          Baixar
        </Button>
      )}
    </PluginBody>
  );
};
