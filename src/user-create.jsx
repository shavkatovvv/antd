import React from "react";
import { Button, Input, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "./hooks/useCreateUser";

export const UserCreate = () => {
    const navigate = useNavigate();
    const { mutate: createUser } = useCreateUser();

    const onFinish = (data) => {
        createUser(data);
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
                <Form.Item
                    label="Text"
                    name="text"
                    rules={[
                        {
                            required: true,
                            message: "Please input your text!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Name"
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
