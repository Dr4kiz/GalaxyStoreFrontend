import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Profile } from '../../routes/profile';
import { DashBoard } from '../../routes/profile/admin/dashboard';
import { DataWeb } from '../../routes/profile/admin/dataweb';
import logo from '../../assets/images/wicon.png';
import { Link,
    useNavigate
} from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
 
 


function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

 export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useContext(AuthContext);
    const [content, setContent] = useState(<Profile />);

    const navigate = useNavigate();

    const [items, setItems] = useState([
        getItem('Meus Plugins', '1', <PieChartOutlined />), 
        getItem('Logout', '5', <LogoutOutlined />),
      ]);


    const handleClick = (e) => {
      
        if(e.key === "1"){
            setContent(<Profile />)

        }
        if(e.key === "2"){
            setContent(<DashBoard />)
        }

        if(e.key === "5"){
            navigate('/logout')
        }
  
    }

    useEffect(() =>{
        if(user?.roles){
            if(user.roles.includes("ROLE_ADMIN")){
                setItems([
                    getItem('Inicio', '1', <PieChartOutlined />), 
                    getItem('Administração', '2', <DesktopOutlined />),
                    getItem('Logout', '5', <LogoutOutlined />),

                ])
            }
        }
    }, [user])

    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout

        style={{
            minHeight: '100vh',
            background: colorBgContainer,
            }}
            
      >
        <Sider
         collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
       
         >
          <Link to="/">
          <img 
          src={logo}
           alt="logo"
           style={{
            width: '100px',
            filter: 'invert(1)',
            margin: '0 auto',
            display: 'block',
            
         
           }}
            />
          </Link>
          <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline"
            onClick={handleClick}
           items={items} />
        </Sider>
        <Layout className="site-layout">
      
          <Content>
          {content}
          </Content>
 
        </Layout>
      </Layout>
    );
  };