import { Button, Input, Form, Typography } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUsers } from "../hooks/useLoginUser";

export const Login = () => {
    const navigate = useNavigate();
    const { mutate } = useLoginUsers();

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
                    <Link style={{ marginTop: "100px" }} to="/register">
                        Register
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
