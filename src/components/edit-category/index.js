import "./style.css";

import { Button, Form, Image, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";
import { useForm } from "antd/lib/form/Form";
const { Option } = Select;

const EditCategory = ({ item, editModalOpen, setEditModalOpen }) => {
  const [form] = useForm();

  useEffect(() => {
    form.resetFields();
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data) => {
      return api.put(`categories/${item?.id}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories-data");
        setEditModalOpen(false);
      },
    }
  );

  const onFinish = (values) => {
    console.log(values);
    mutate({ ...values, status: item?.status, path: item?.path });
  };
  const [imgg, setImgg] = useState("");

  return (
    <>
      <Modal
        open={editModalOpen}
        width={800}
        title={`${item?.name}`}
        onCancel={() => {
          form.resetFields();
          setEditModalOpen(false);
        }}
        footer={false}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          initialValues={item}
          form={form}
        >
          <Form.Item
            label="Key word"
            name="key-word"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kategoriya nomi O‘zbek"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Название категории Русский"
            name="nameRu"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category name English"
            name="nameEng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "20px",
            }}
          >
            <Form.Item
              name="start-time"
              label="Tayyor bolish vaqti"
              style={{ width: "230px" }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Vaqtni tanlash" allowClear>
                <Option value="08:00">08:00</Option>
                <Option value="09:00">09:00</Option>
                <Option value="10:00">10:00</Option>
                <Option value="11:00">11:00</Option>
                <Option value="12:00">12:00</Option>
                <Option value="13:00">13:00</Option>
                <Option value="14:00">14:00</Option>
                <Option value="15:00">15:00</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="finish-time"
              label="Tugash vaqti"
              style={{ width: "230px" }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Vaqtni tanlash" allowClear>
                <Option value="08:00">08:00</Option>
                <Option value="09:00">09:00</Option>
                <Option value="10:00">10:00</Option>
                <Option value="11:00">11:00</Option>
                <Option value="12:00">12:00</Option>
                <Option value="13:00">13:00</Option>
                <Option value="14:00">14:00</Option>
                <Option value="15:00">15:00</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="img">
            {/* <Input
              type="file"
              onChange={(e) => {
                setImgg(e.target.value);
              }}
            /> */}

            <Input
              type="text"
              placeholder="Rasm uchun link"
              onChange={(e) => {
                setImgg(e.target.value);
              }}
              style={{ marginTop: "10px" }}
            />
            {/* <ImgCrop rotationSlider>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={items == [] ? fileList : items}
                onChange={onChange}
                onPreview={onPreview}
                style={{ width: "100%" }}
              >
                {fileList.length < 1 || items.length < 1 || "+ Rasm yuklash"}
              </Upload>

              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </ImgCrop> */}
          </Form.Item>

          <Image
            src={imgg != "" ? imgg : item?.img}
            style={{
              width: "300px",
              height: "200px",
              objectFit: "cover",
            }}
          />

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginTop: "15px" }}
          >
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditCategory;
