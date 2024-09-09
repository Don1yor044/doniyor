import { Button, Drawer, Form, Input, message, Select } from "antd";
import axios from "axios";

const { Option } = Select;
export const AddDrawer = ({
  open,
  onClose,
  render,
}: {
  open: boolean;
  onClose: () => void;
  render: () => void;
}) => {
  const [form] = Form.useForm();
  const onFinish = async (values: string) => {
    try {
      await axios.post(`https://46d4deb0e08aaad2.mokky.dev/xodimlar`, values);
      message.success("Yangi xodim qo‘shildi!");
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
    <>
      <Drawer title="Yangi xodim qo'shish" onClose={onClose} open={open}>
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
              // value={selectedCategory}
              style={{ width: "100%" }}
              dropdownStyle={{ minWidth: 150 }}
              // onChange={handleChange}
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
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
