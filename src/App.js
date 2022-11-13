import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import {Layout} from "antd";
import MainFooter from "./shared/navigation/MainFooter";
import MainHeader from "./shared/navigation/MainHeader";
import './App.css';
import Auth from "./user/pages/Auth";

const {Content} = Layout;

function App() {
    return (<Router>
            <Layout>
                <MainHeader/>
                <Content
                    style={{
                        padding: 80, margin: 0, minHeight: 280,
                    }}>
                    <Routes>
                        <Route path="auth" element={<Auth/>}/>
                        {/*<Route path="*" element={<Navigate to={"/"} replace/>}/>*/}
                    </Routes>
                </Content>
                <MainFooter/>
            </Layout>
        </Router>);
}

export default App;
