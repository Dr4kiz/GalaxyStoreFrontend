import { Button, List, Space, Input } from "antd";
import styled from "styled-components";
import { Footer } from "../../components/footer";
import { NavBar } from "../../components/navbar";
import {
  DollarCircleOutlined,
  LogoutOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import WHub from "../../assets/images/whub.png";
import { useCallback, useContext, useEffect, useState } from "react";
import { PluginItem } from "../../components/plugin";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { PluginContext } from "../../context/PluginsContext";
import { DiscordIcon } from "../../utils/DiscordIcon";
const { Search } = Input;
const Container = styled.div`
  text-align: center;

  h1 {
    font-weight: lighter;
    font-size: 40px;
    color: #2b2d42;
    margin: 0;
  }
 

  .b-space1 {
    background-color: #f5f5f5;
    margin: 50px auto;
    display: flex;
    justify-content: center;
    flex-direction: row;

    span {
      color: #2b2d42;
    }
  }

  .b-category {
    margin: 50px auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .b-plugins {
    margin: 50px auto;
    width: 90%;
    padding: 20px;
  }

  .ant-table-placeholder {
    display: none;
  }

`;

export const Plugins = () => {

  const category = [
    {
      name: "Economia",
      icon: <DollarCircleOutlined />,
    },
    {
      name: "Factions",
      icon: <LogoutOutlined />,
    },
    {
      name: "RankUP",
      icon: <CrownOutlined />,
    },
    {
      name: "Bots",
      icon: <DiscordIcon />,
    }
  ];

 
  const [currentCategory, setCurrentCategory] = useState("all");
  const [plugins, setPlugin] = useContext(PluginContext)
  const [user, setUser] = useContext(AuthContext);
 
  const [currentFilter, setCurrentFilter] = useState(plugins);

 

  

  const handleCategory = (category) => {
    if (currentCategory == category) {
      setCurrentCategory("all");
      setCurrentFilter(plugins);
      return;
    }
     
    setCurrentCategory(category);
    let filter = plugins.filter((item) => item.tag == category);

    setCurrentFilter(filter);
  };

  useEffect(() => {
    setCurrentFilter(plugins);
  }, [plugins]);

  return (
    <div>
      <NavBar />
      <Container>
        <Space className="b-space1">
          <Space
            style={{
              width: 700,
              flexDirection: "column",
            }}
          >
            <h1>Nossos Plugins</h1>
            <span>Confira nosso Catálogo</span>
          </Space>
          <Space>
            <img src={WHub} alt="webplayers" />
          </Space>
        </Space>

        <Space className="b-category">
          <h1>Categorias</h1>
          <Space>
            {category.map((item, index) => (
              <Button
                type={currentCategory == item.name ? "primary" : "default"}
                icon={item.icon}
                size="large"
                onClick={() => handleCategory(item.name)}
              >
                {item.name}
              </Button>
            ))}
            <Space direction="vertical"></Space>
          </Space>
          <Search
            placeholder="Procurando por algo?"
            allowClear
            onChange={(e) => {
              setCurrentCategory("all");
              setCurrentFilter(
                plugins.filter((item) =>
                  item.name.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
            }}
            size="large"
            style={{
              width: 500,
            }}
          />
        </Space>

        <List
          className="b-plugins"
          pagination={{
            locale:{
              items_per_page: "/ página",
              next_page: "Próxima",
              prev_page: "Anterior",
              jump_to: "Ir para",
              jump_to_confirm: "confirmar",
              page: "",
            },
            pageSize: 8,
            position: "bottom",
            align: "center",
            responsive: true,
           
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={currentFilter}
          renderItem={(item) =>(
            <List.Item>
          <PluginItem plugin={item} />
            </List.Item>
          )}
        />
      </Container>
      <Footer />
    </div>
  );
};
