import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

import { BiDish } from "react-icons/bi";

import { FaAngleLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import { useLocalStorageState } from "ahooks";
import HeaderComponent from "./components/header";
import ContantComp from "./components/content";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useLocalStorageState("actice-menu", {
    defaultValue: false,
  });
  const [activeMenu, setActiveMenu] = useLocalStorageState("actice-menu-btn", {
    defaultValue: 1,
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigator = useNavigate();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#F4F4F4" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[`${activeMenu}`]}
          style={{
            marginTop: "50px",
            background: "#F4F4F4",
            color: "#5B5B5B",
          }}
          items={[
            {
              key: "1",
              icon: <BiDish />,
              label: "Menu",
              onClick: (label) => {
                navigator("/menu");
                setActiveMenu(+label?.key);
              },
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Reklama",
              onClick: (label) => {
                navigator("/reklama");
                setActiveMenu(+label?.key);
              },
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Ishchilar",
              onClick: (label) => {
                navigator("/ishchilar");
                setActiveMenu(+label?.key);
              },
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Konpaniya nomlari",
              onClick: (label) => {
                navigator("/konpaniya-nomlari");
                setActiveMenu(+label?.key);
              },
            },
            {
              key: "5",
              icon: <VideoCameraOutlined />,
              label: "Bildirishnoma",
              onClick: (label) => {
                navigator("/bildirishnoma");
                setActiveMenu(+label?.key);
              },
            },
          ]}
        />
        <Button
          icon={collapsed ? <FaChevronRight /> : <FaAngleLeft />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: 20,
            height: 20,
            position: "absolute",
            background: "#E5F1D6",
            color: "#7EBA34",
            top: "15px",
            right: "-12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Button>
      </Sider>

      <Layout
        style={{
          background: colorBgContainer,
        }}
      >
        <Header
          style={{
            background: colorBgContainer,
          }}
        >
          <HeaderComponent />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <ContantComp />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
