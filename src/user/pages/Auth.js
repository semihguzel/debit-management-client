import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import {Alert, Button, Card, Form, Input, Space} from "antd";
import {AuthContext} from "./auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";

const Auth = () => {
    const auth = useContext(AuthContext);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const {clearError, error, isLoading, sendRequest} = useHttpClient();

    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
        form.resetFields();
        setIsLoginMode((prevMode) => !prevMode);
    };

    const errorCloseHandler = () => {
        clearError();
    }

    const submitHandler = async (values) => {
        let url = `${process.env.REACT_APP_BACKEND_URL}`;
        if (isLoginMode) {
            url += "/api/Auth/Login";
        } else {
            url += "/api/Auth/Register";
        }
        try {
            const responseData = await sendRequest(url, "POST", JSON.stringify({
                Username: values.username, Password: values.password
            }), {
                "Content-Type": "application/json",
                "Access-control-Allow-Origin": "*",
            });

            auth.login(responseData.userId, responseData.token);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (<React.Fragment>
        {error && (<Alert
            type="error"
            message="Error"
            description={error}
            closable
            onClose={errorCloseHandler}
        />)}
        <Space
            direction="vertical"
            size="large"
            style={{
                display: "flex", textAlign: "center", justifyContent: "center", minHeight: "100hv",
            }}
        >
            <Card>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={submitHandler}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{
                            required: true, message: "Please input your username!",
                        },]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{
                            required: true, message: "Please input your password!",
                        },]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 7, span: 10,
                        }}
                    >
                        <Button
                            size="large"
                            style={{width: "150px"}}
                            type="primary"
                            htmlType="submit"
                        >
                            {isLoginMode ? "Login" : "Signup"}
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 7, span: 10,
                        }}
                    >
                        <Button
                            size="large"
                            style={{width: "250px"}}
                            type="primary"
                            onClick={switchModeHandler}
                        >
                            SWITCH TO {isLoginMode ? "Signup" : "Login"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    </React.Fragment>)
}

export default Auth;
