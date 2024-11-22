import { Button, Input, Form, Typography } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUsers } from "../hooks/useRegisterUser";

export const Register = () => {
    const { mutate } = useRegisterUsers();
    const navigate = useNavigate();
    const onFinish = (data) => {
        mutate(data, {
            onSuccess: (data) => {
                localStorage.setItem("userData", JSON.stringify(data));

                navigate("/app");
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };
    return (
        <div className="container">
            <Form
                name="basic"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, paddingTop: "100px" }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Typography>
                    <Link style={{ marginTop: "100px" }} to="/">
                        Login
                    </Link>
                </Typography>
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input />
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
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
