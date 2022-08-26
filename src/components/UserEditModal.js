import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

import { UserService } from "../apis";

const UserEditModal = ({ updateUser, user, onModalClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user && Object.keys(user)?.length) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onOk = async () => {
    form.validateFields().then(async (values) => {
      try {
        const data = await UserService.updateUser(user.id, values);

        if (data) {
          updateUser(user.id, values);
          message.success(`User updated successfully!`);
        }
      } catch (error) {
        message.error(error.message);
      } finally {
        onModalClose();
      }
    });
  };

  return (
    <Modal
      title="Edit User Info"
      visible={user && Object.keys(user)?.length}
      onOk={() => onOk()}
      onCancel={() => onModalClose()}
    >
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your Phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              required: true,
              message: "Please input your website!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
