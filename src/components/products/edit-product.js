import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";
import { useEffect, useState } from "react";

const EditProdeuct = ({ setIsModalOpen, isModalOpen, product, productId }) => {
  const [form] = useForm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data) => {
      return api.put(`products/${productId}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products-data");
        setIsModalOpen(false);
      },
    }
  );

  useEffect(() => {
    form.resetFields();
  });

  const onFinish = (values) => {
    const newData = {
      ...values,
      nameEng: product?.nameEng,
      nameEng: product?.nameEng,
      categoryId: product?.categoryId,
      img: product?.img,
    };

    mutate(newData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          initialValues={product}
        >
          <Form.Item label="Taom nomi O‘zbek" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Название блюда Русский" name="nameRu">
            <Input />
          </Form.Item>

          <Form.Item label="Note" name="nameEng">
            <Input />
          </Form.Item>

          <Form.Item label="note" name="note">
            <Input />
          </Form.Item>

          <Form.Item label="Примечание Русский" name="noteRu">
            <Input />
          </Form.Item>

          <Form.Item label="Taom kalloriyasi" name="kcal">
            <Input />
          </Form.Item>

          <Form.Item label="price" name="price">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditProdeuct;
