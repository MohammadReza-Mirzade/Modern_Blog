import { Menu, Button } from 'antd';
import 'antd/dist/antd.css'
import style from './MenuDashboard.module.css';
import React from "react";
import {NavLink} from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DesktopOutlined,
    ContainerOutlined,
    LogoutOutlined,
    SettingFilled,
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
        const data = await Axios.get(/*'https://api.mocki.io/v1/6910a074*/'/blogger/logout');
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
                        <NavLink className={style.NavLink} to="/dashboard">Dashboard</NavLink>
                    </Menu.Item>

                    <SubMenu key="sub0" icon={<ContainerOutlined />} title="Article">
                        <Menu.Item key="/myArticles">
                            <NavLink className={style.NavLink} to="/dashboard/myArticles">My Articles</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/newArticle" >
                            <NavLink className={style.NavLink} to="/dashboard/newArticle">New Article</NavLink>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1" icon={<SettingFilled />} title="Setting">
                        <Menu.Item key="/userUpdateInfo" ><NavLink className={style.NavLink} to="/dashboard/userUpdateInfo">Change Your Info</NavLink></Menu.Item>
                        <Menu.Item key="/userUpdatePassword" ><NavLink className={style.NavLink} to="/dashboard/userUpdatePassword">Change Your Password</NavLink></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" onClick={this.loggingOut} icon={<LogoutOutlined />}>Logout</Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default MenuDashboard;
