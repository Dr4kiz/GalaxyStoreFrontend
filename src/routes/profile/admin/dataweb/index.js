import { Card } from "antd";
import {
  ContactsFilled,
  AppstoreFilled,
  PieChartFilled,
  FundFilled,
} from "@ant-design/icons";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { PluginContext } from "../../../../context/PluginsContext";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthProvider";
import { api } from "../../../../api/galaxtapi";

const DataWebContainer = styled.div`
  width: 90%;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;
const CardInfo = styled(Card)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;

  p {
    font-size: 20px;
    font-weight: 600;
    color: #595959;
  }

  span {
    font-size: 20px;
    font-weight: 500;
  }

  svg {
    font-size: 40px;
  }
`;

const CardInfoImage = styled.div`
  width: 50px;
  height: 50px;
`;

export const DataWeb = () => {
  const [plugins, setPlugins] = useContext(PluginContext);
  const [user, setUser] = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    api
      .post("/auth/clients", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setClients(response.data);

        
      });
  }, []);

  useEffect(() => {
    clients.map((client) => {
      let cplugins = client.plugins;
      if(cplugins !== null){
      let ids = cplugins.split(",");
      ids.map((id) => {
        sales.push(id);
        let tplugin = plugins.find((plugin) => plugin.id == id);
        setTotalSales(totalSales + tplugin.price);
       
      });
    }
      
    });
  }, [clients]);
 
 

  return (
    <DataWebContainer>
      <CardInfo>
        <CardInfoImage>
          <ContactsFilled />
        </CardInfoImage>
        <p>Quantidade de Clientes</p>
        <span>{clients?.length || 0}</span>
      </CardInfo>
      <CardInfo>
        <CardInfoImage>
          <AppstoreFilled />
        </CardInfoImage>
        <p>Quantidade de Plugins</p>
        <span>{plugins?.length || 0}</span>
      </CardInfo>
      <CardInfo>
        <CardInfoImage>
          <PieChartFilled />
        </CardInfoImage>
        <p>Quantidade de Vendas</p>
        <span>{sales?.length || 0}</span>
      </CardInfo>
      <CardInfo>
        <CardInfoImage>
          <FundFilled />{" "}
        </CardInfoImage>
        <p>Total de Vendas</p>
        <span>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalSales || 0)}
        </span>
      </CardInfo>
    </DataWebContainer>
  );
};
