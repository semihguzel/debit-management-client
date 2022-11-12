import React from "react";
import {Link} from "react-router-dom";

import {Layout, Menu} from "antd";

const {Header} = Layout;

const menuItems = [
    {
        key: "login",
        label: <Link to={"/auth"}>Login</Link>
    }
]

const MainHeader = () => {
    return (
        <Header>
            <Menu
                style={{justifyContent: "flex-end"}}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["login"]}
                items={menuItems}>

            </Menu>
        </Header>
    )
}

export default MainHeader;