/** @jsxImportSource @emotion/react */

import {
  Button,
  Col,
  Drawer,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  Form,
  Spin,
  Card,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
// icons
import { AiFillPlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
const { Option } = Select;

export function Maxsulotlar() {
  const [categData, setCategData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Kategoriyalar"
      );
      setCategData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch products.");
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Maxsulotlar"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch products.");
      setLoading(false);
    }
  };

  // selectni boshqarish
  useEffect(() => {
    if (selectedCategory) {
      setFilteredData(
        data.filter((item: any) => item.categoryId === selectedCategory)
      );
    } else {
      setFilteredData(data);
    }
  }, [selectedCategory, data]);

  // Modal
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleChange = (value: any) => {
    setSelectedCategory(value);
  };

  //  search
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    const search = data.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(search);
  };

  // Delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://46d4deb0e08aaad2.mokky.dev/Maxsulotlar/${id}`
      );
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
      setFilteredData((prevData) =>
        prevData.filter((item: any) => item.id !== id)
      );
      message.success("Maxsulot muvaffaqiyatli o'chirildi.");
    } catch (error) {
      message.error("Maxsulotni o'chirishda xatolik.");
    }
  };

  // drower
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    form.resetFields();
    setOpen(true);
    navigate(`${location.pathname}?action=add`);
  };

  const onClose = () => {
    setOpen(false);
    navigate(location.pathname);
  };

  // add Drowe and edit

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const data = {
      name: values.name,
      categoryId: values.categoryId,
      price: values.price,
      qoshimcha: values.qoshimcha,
      photo: values.photo,
    };

    try {
      if (isEditMode && currentItem) {
        const response = await axios.patch(
          `https://46d4deb0e08aaad2.mokky.dev/Maxsulotlar/${currentItem.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Updated:", response.data);
      } else {
        const response = await axios.post(
          "https://46d4deb0e08aaad2.mokky.dev/Maxsulotlar",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Created:", response.data);
      }
      await fetchProducts();
      form.resetFields(); // Formani tozalash
      setOpen(false); // Drawerni yopish
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  // edit Drower
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [currentItem, setCurrentItem] = useState<any>(null);
  const onEdit = (item: any) => {
    form.setFieldsValue(item);
    setCurrentItem(item);
    setIsEditMode(true);
    setOpen(true);
  };
  useEffect(() => {
    if (location.search.includes("action=add")) {
      setOpen(true);
    }
  }, [location.search]);
  const containerStyle = css`
    display: flex;
    gap: 8px;
    margin-top: -14px;
  `;
  return (
    <>
      <Header
        style={{ padding: 0, display: "flex", gap: 3, background: "#EDEFF3" }}
      >
        <div
          style={{
            marginLeft: 3,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "white",
            width: "230px",
          }}
        >
          <div
            style={{ width: "60px", display: "flex", justifyContent: "end" }}
          >
            <Button
              style={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                padding: 0,
              }}
              onClick={showDrawer}
            >
              <AiFillPlusCircle
                style={{ fontSize: 33, background: "white", color: "#20D472" }}
              />
            </Button>
          </div>
          <div>
            <Typography style={{ fontSize: 13, fontWeight: 600 }}>
              Yangi maxsulot <br /> qo’shish
            </Typography>
          </div>
        </div>
        <div
          style={{
            background: "white",
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: 25,
            paddingInline: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 0,
              background: "#EDEFF3",
              height: "40px",
              paddingInline: 5,
              borderRadius: 100,
            }}
          >
            <Input
              placeholder="Qidirish"
              value={searchText}
              onChange={handleSearch}
              style={{
                boxShadow: "none",
                borderRadius: 100,
                outline: "none",
                height: "39px",
                width: "250px",
                border: "none",
                background: "#EDEFF3",
              }}
            />
            <Button
              style={{
                outline: "none",
                border: "none",
                background: "#EDEFF3",
                transition: "none",
              }}
            >
              <CiSearch style={{ fontSize: 18 }} />
            </Button>
          </div>{" "}
          <div>
            <div
              style={{ background: "#EDEFF3", padding: 6, borderRadius: "50%" }}
            >
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  background: "#ffffff",
                  color: "#8b8d94",
                  border: "none",
                  borderRadius: "50%",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                icon={<FiFilter style={{ fontSize: 16, marginTop: 2 }} />}
                onClick={handleOpenModal}
              ></Button>
            </div>

            <Modal
              title="Kategory"
              visible={modalVisible}
              onCancel={handleCloseModal}
              footer={null}
              style={{ top: 70 }}
              width={400}
            >
              <Select
                value={selectedCategory}
                style={{ width: "100%" }}
                dropdownStyle={{ minWidth: 150 }}
                onChange={handleChange}
                placeholder="Select a category"
                bordered={false}
              >
                <Option value="">All Categories</Option>
                {categData.map((category: any) => (
                  <Option key={category.id} value={category.id}>
                    {category.nameUz}
                  </Option>
                ))}
              </Select>
            </Modal>
          </div>
        </div>
      </Header>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          width: "100%",
          height: "auto",
          padding: "15px 15px 15px 55px",
          background: "white",
          display: "flex",
          justifyContent: "start",
          textAlign: "end",
          gap: "100px",
          alignContent: "center",
          fontWeight: "bolder",
          boxShadow: "5px 5px 5px rgba(124, 124, 124, 0.3)",
        }}
      >
        <div className="flex gap-10 items-center ">
          <Typography>Maxsulotlar</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey " }}></div>
        <div className="flex gap-10 items-center">
          <Typography>Kategoriya </Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex gap-10 items-center ">
          <Typography>Narxi</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex gap-10 items-center ">
          <Typography>Qo'shimcha</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex gap-10 items-center">
          <Typography>Actions</Typography>
        </div>
      </div>

      <Content style={{ margin: "10px 20px 0" }} css={StyleContent}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="default" />
          </div>
        ) : data.length === 0 ? (
          <Typography.Title level={5}>
            Apida Malumot qolmadi !!!
          </Typography.Title>
        ) : (
          <Row>
            {filteredData.map((f: any) => (
              <Col
                span={24}
                style={{ padding: "13px", marginTop: "-17px" }}
                key={f.id}
              >
                <Card
                  style={{
                    borderRadius: "8px",
                    boxShadow: "1px 1px 10px rgba(124, 124, 124, 0.3)",
                    height: "65px",
                  }}
                  hoverable
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      textAlign: "start",
                    }}
                  >
                    <div
                      style={{ width: `calc(100% / 5)` }}
                      css={css`
                        display: flex;
                      `}
                    >
                      <Image
                        width={45}
                        height={45}
                        src={f.photo}
                        className="object-cover "
                        style={{ borderRadius: "50%", margin: "-13px -20px " }}
                      />
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.name}
                      </Typography>
                    </div>
                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {
                          //@ts-ignore
                          categData.find((i) => i.id === f.categoryId)?.nameUz
                        }
                      </Typography>
                    </div>

                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.price}
                      </Typography>
                    </div>
                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.qoshimcha ? f.qoshimcha : "-"}
                      </Typography>
                    </div>

                    <div css={containerStyle}>
                      <Button
                        type="text"
                        onClick={() => onEdit(f)}
                        style={{
                          background: "white",
                          marginLeft: "10px",
                          borderRadius: "50%",
                          padding: 18,
                          border: "4px solid #EDEFF3",
                        }}
                        icon={<FiEdit2 fontSize={17} />}
                      />
                      <Button
                        type="text"
                        onClick={() => handleDelete(f.id)}
                        style={{
                          background: "white",
                          borderRadius: "50%",
                          padding: 18,
                          marginLeft: "10px",
                          border: "4px solid #EDEFF3",
                        }}
                        icon={<FaRegTrashAlt fontSize={17} />}
                      />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>
      <Drawer
        title={
          isEditMode ? "Maxsulotni tahrirlash" : "Yangi Maxsulotlar qo'shish"
        }
        placement="right"
        onClose={onClose}
        open={open}
        width={350}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          form={form}
          hideRequiredMark
          onFinish={onFinish}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Iltimos maxsulot nomini yozing !",
                  },
                ]}
              >
                <Input placeholder="Iltimos maxsulot nomini yozing !" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select placeholder="Select a category">
                  {categData.map((cat: any) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.nameUz}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="price"
                label="Narxi"
                rules={[
                  {
                    required: true,
                    message: "Iltimos maxsulot narxini yozing !",
                  },
                ]}
              >
                <Input placeholder="Iltimos maxsulot narxini yozing !" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="qoshimcha" label="Qo'shimcha">
                <Input placeholder="Iltimos qo'shimcha ma'lumot kiriting!" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="photo"
                label="Rasm (Url)"
                rules={[
                  {
                    required: true,
                    message: "Iltimos, rasm URL-ni kiriting!",
                  },
                ]}
              >
                <Input placeholder="Rasm URL-ni kiriting" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Space style={{ marginTop: 40 }}>
            <Button
              htmlType="submit"
              style={{
                background: "#20D472",
                color: "white",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              {isEditMode ? "Saqlash" : "Qo'shish"}
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
}
const StyleContent = css`
  max-height: 77vh !important;
  width: auto;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;
