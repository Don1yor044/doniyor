import { Button, Drawer, Form, Input, message, Select } from "antd";
import axios from "axios";
import { useEffect } from "react";

const { Option } = Select;
export const EditDrawer = ({
  open,
  onClose,
  render,
  editData,
}: {
  open: boolean;
  onClose: () => void;
  render: () => void;
  editData: {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    lavozim: string;
  } | null;
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const onFinish = async (values: any) => {
    try {
      if (editData) {
        await axios.patch(
          `https://46d4deb0e08aaad2.mokky.dev/xodimlar/${editData.id}`,
          values
        );
        message.success("Yangi xodim qo‘shildi!");
      }
      form.resetFields();
      render();
      onClose();
    } catch (error) {
      message.error("Xodim qo'shishda xatolik !");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Formani toldirish xatolik !:", errorInfo);
  };
  return (
    <Drawer title="Tahrirlash" onClose={onClose} open={open}>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        hideRequiredMark
      >
        <Form.Item
          label="Ism"
          name="name"
          rules={[{ required: true, message: "Iltimos Ismini kiritng!" }]}
        >
          <Input placeholder="Ismini kiritng !" />
        </Form.Item>{" "}
        <Form.Item
          label="Familiya"
          name="lastName"
          rules={[{ required: true, message: "Iltimos Familiyani kiritng!" }]}
        >
          <Input placeholder="Familiyani kiritng !" />
        </Form.Item>
        <Form.Item
          label="TelefonRaqam"
          name="phone"
          rules={[
            { required: true, message: "Iltimos TelefonRaqamni kiritng!" },
          ]}
        >
          <Input type="text" placeholder="+998 90 123 45 67 !" />
        </Form.Item>
        <Form.Item
          name="lavozim"
          label="Lavozimlar"
          rules={[{ required: true, message: "Iltimos lavozim tanlang !" }]}
        >
          <Select
            style={{ width: "100%" }}
            dropdownStyle={{ minWidth: 150 }}
            placeholder="Lavozim tanglang !"
          >
            <Option value="operator">Operator</Option>
            <Option value="Sotuvchi">Sotuvchi</Option>
            <Option value="Bosh Oshpaz">Bosh Oshpaz</Option>
            <Option value="Xisobchi">Xisobchi</Option>
            <Option value="Ofisant">Ofisant</Option>
            <Option value="Zavzal">Zav zal</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: 20,
              background: "#20D472",
            }}
          >
            Yangilash
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
