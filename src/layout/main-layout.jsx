import React from "react";
import { data } from "./data-lay";
import {
    Breadcrumb,
    Layout,
    Menu,
    Typography,
    Dropdown,
    Button,
    Steps,
    Form,
    Input,
    Checkbox,
    message,
} from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Sider } = Layout;

const item = data.map((item) => {
    return {
        key: item.id,
        label: <Link to={item.path}>{item.label}</Link>,
        icon: React.createElement(item.icon),
        children: item.children?.map((child) => {
            return {
                key: child.id,
                label: <Link to={child.path}>{child.label}</Link>,
            };
        }),
    };
});

export const MainLayout = () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <div className="wrapper">
            <Layout style={{ height: "100%" }}>
                <Header
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div className="demo-logo" />
                </Header>
                <Layout style={{ height: "100%" }}>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1"]}
                            style={{
                                height: "100%",
                                borderRight: 0,
                            }}
                            items={item}
                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: "50px",
                            height: "100%",
                        }}
                    >
                        <Typography onClick={() => setCollapsed(!collapsed)}>
                            <Button
                                type="primary"
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                {collapsed ? "Open" : "Close"}
                            </Button>
                        </Typography>

                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};
