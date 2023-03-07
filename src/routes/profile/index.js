import { Button, List, Space } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../../api/galaxtapi";
import { NavBar } from "../../components/navbar";
import { PluginItem } from "../../components/plugin";
import { SideBar } from "../../components/sidebar";
import { AuthContext } from "../../context/AuthProvider";
const PluginDiv = styled.div`
  padding: 20px;
  text-align: center;

  h1 {
    font-weight: lighter;
    font-size: 40px;
    color: #2b2d42;
    margin: 0;
  }
  img {
    width: 40%;
  }

  .b-space1 {
    background-color: #f5f5f5;
 
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
const ProfileDiv = styled.div`
  padding: 20px;

`;

const Main = styled.div`
  margin-left: 20px;
  h1{
    font-size: 1.5rem;
    font-weight: 600;
  }
  
`

 

export const Profile = () => {
  const [user, setUser] = useContext(AuthContext);
  const [plugins, setPlugin] = useState();
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState();

  useEffect(() => {
    async function fetchdata() {
      const response = await api.post("/plugin/list");
      const { content } = response.data;
      setPlugin(content);
      if(user?.plugins){
        let plugins = content.filter((item) => user.plugins.includes(item.id));
        setCurrentFilter(plugins);
      }
      setLoading(false);
    }
    fetchdata();
 
  }, [user.plugins]);


  document.title = "Dashboard | Perfil do usuário";

  return (
    <div>
          
            <Main>
      <ProfileDiv>
      <h1>Seus dados</h1>
      <p>Admininstre sua conta aqui</p>
 
      </ProfileDiv>

      <PluginDiv>
        <List
          className="b-plugins"
          pagination={{
            pageSize: 3,
            position: "bottom",
            align: "center",
            responsive: true,
          }}
          grid={{
            gutter: 16,
            xs: 2,
          }}
          dataSource={currentFilter}
          renderItem={(item) => (
            <List.Item>
              <PluginItem plugin={item} purchased />
            </List.Item>
          )}
        />
      </PluginDiv>
    </Main>
    </div>

  );
};
