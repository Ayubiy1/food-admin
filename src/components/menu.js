import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

import { FaAngleLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useLocalStorageState } from "ahooks";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useLocalStorageState("actice-menu", {
    defaultValue: false,
  });
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ marginTop: "50px" }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Menu",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Reklama",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Ishchilar",
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Konpaniya nomlari",
            },
            {
              key: "5",
              icon: <VideoCameraOutlined />,
              label: "Bildirishnoma",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <FaChevronRight /> : <FaAngleLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        ></Content>
      </Layout>
    </Layout>
  );
};
export default App;
