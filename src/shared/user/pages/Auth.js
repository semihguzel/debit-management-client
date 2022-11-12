import React, {useState} from "react";
import {Button, Card, Form, Input, Space} from "antd";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
        form.resetFields();
        setIsLoginMode((prevMode) => !prevMode);
    };
    
    return (
        <Space
            direction="vertical"
            size="large"
            style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                minHeight: "100hv",
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
                    onFinish={(event) => {console.log(event)}}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 7,
                            span: 10,
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
                            offset: 7,
                            span: 10,
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
    )
}

export default Auth;
