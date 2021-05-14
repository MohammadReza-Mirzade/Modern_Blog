import { Menu, Button } from 'antd';
import 'antd/dist/antd.css'
import style from './MenuDashboard.module.css';
import React from "react";
import {NavLink} from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DesktopOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import Axios from "axios";
const { SubMenu } = Menu;


class MenuDashboard extends React.Component {
    state = {
        collapsed: false,
        defaultSelectedKeys: this.props.page,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    loggingOut = async () => {
        console.log("logout");
        const data = await Axios.get(/*'https://api.mocki.io/v1/6910a074*/'/admin/logout');
        console.log(data);
        window.location.href = "/";
    };


    render() {
        return (
            <div className={style.menu}>
                <Menu
                    defaultSelectedKeys={["/"]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    style={{padding: 0, height: 100+"%"}}
                >
                    <Button className={style.btn} type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                    <Menu.Item key="/" icon={<DesktopOutlined />}>
                        <NavLink className={style.NavLink} to="/admin">Dashboard</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/bloggers" icon={<DesktopOutlined />}>
                        <NavLink className={style.NavLink} to="/admin/bloggers">Bloggers</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/articles" icon={<DesktopOutlined />}>
                        <NavLink className={style.NavLink} to="/admin/articles">Articles</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/comments" icon={<DesktopOutlined />}>
                        <NavLink className={style.NavLink} to="/admin/comments">Comments</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={this.loggingOut} icon={<LogoutOutlined />}>Logout</Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default MenuDashboard;
