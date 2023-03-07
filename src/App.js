import styled from "styled-components";
import { NavBar } from "./components/navbar";
import WebPlayers from "./assets/images/wbgplayers.png";
import banner from './assets/images/gticket.png';

import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

import { AppstoreOutlined } from "@ant-design/icons";
import { Footer } from "./components/footer";


const Container = styled.div`
  display: flex;
  padding: 50px;
  h1 {
    color: #2b2d42;
    font-size: 40px;
    font-weight: 900;
    margin: 0;
  }

  img {
    width: 100%;
  }

  .b-space1 {
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
   
  }
`;
 
function App() {

  const navigate = useNavigate();

 
 

  return (
    <div className="App">
      <NavBar />
      <Container>

        <Space className="b-space1">
        <img src={banner} alt="banner"/>

          <h1>Os melhores plugins pelos melhores preços aqui!</h1>
          <Space style={{
            marginTop: 20,
            width: 700
          }}>
            <Button type="default" icon={<AppstoreOutlined />} size="large" onClick={() => navigate("plugins") }>
              Nossos Plugins
            </Button>
 
            <Button type="primary" size="large"
              onClick={() => window.location.href = "https://discord.gg/c5CnzK3U"}
            >
              Discord
            </Button>
          </Space>
        </Space>
        <Space>
          <img src={WebPlayers} alt="webplayers" />
        </Space>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
