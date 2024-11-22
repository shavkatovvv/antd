import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Table,
    Typography,
} from "antd";
import { useGetData } from "./hooks/useGetData";
import { useDeleteUser } from "./hooks/useDeleteUser";
import { useNavigate } from "react-router-dom";

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export const Tabll = () => {
    const { data: initialData } = useGetData();
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState("");
    const { mutate } = useDeleteUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            const transformedData = initialData.map((item) => ({
                ...item,
                key: item.id,
            }));
            setData(transformedData);
        }
    }, [initialData]);

    const isEditing = (record) => record.key === editingKey;

    const Delete = (id) => mutate(id);

    const edit = (record) => {
        form.setFieldsValue({
            text: "",
            name: "",

            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "Text",
            dataIndex: "text",
            width: "25%",
            editable: true,
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "15%",
            editable: true,
        },
        {
            title: "Operation",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Typography.Link>

                        <Button
                            style={{ marginLeft: "10px" }}
                            type="primary"
                            onClick={() => Delete(record.key)}
                        >
                            Delete
                        </Button>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />

            <Button onClick={() => navigate("/app/user-create")} type="primary">
                create User
            </Button>
        </Form>
    );
};
