/** @jsxImportSource @emotion/react */
import {
  Button,
  Col,
  Drawer,
  Input,
  message,
  Row,
  Select,
  Space,
  Typography,
  Form,
  Card,
  Spin,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
// icons
import { AiFillPlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

export function Kategoriyalar() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Apidan malumot olish
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Kategoriyalar"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch products.");
      setLoading(false);
    }
  };

  //  search
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    if (value) {
      const search = data.filter((item: any) =>
        item.nameUz.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(search);
    } else {
      setFilteredData(data); // Bo'sh qidiruv maydoni uchun butun data
    }
  };
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://46d4deb0e08aaad2.mokky.dev/Kategoriyalar/${id}`
      );
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
      setFilteredData((prevData) =>
        prevData.filter((item: any) => item.id !== id)
      );
      message.success("Kategoriya muvaffaqiyatli o'chirildi.");
    } catch (error) {
      message.error("Kategoriya o'chirishda xatolik.");
    }
  };

  // drower
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
    setIsEditMode(false); // Yangi qo'shish rejimi
    setCurrentItem(null); // Tahrirlash uchun itemni bo'shatish
    setSelectedCategory(null); // `Select` qiymatini bo'shatish
    form.resetFields(); // Formani tozalash
    navigate(`${location.pathname}?action=add`);
  };
  const onClose = () => {
    setOpen(false);
    form.resetFields(); // Formani tozalash
    setSelectedCategory(null); // `Select` qiymatini bo'shatish
    setIsEditMode(false); // Tahrirlash rejimini tozalash
    setCurrentItem(null); // Tahrirlash uchun itemni bo'shatish
    navigate(`${location.pathname}`);
  };

  // add Drowe and edit
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log(values.photo);

    const data = {
      nameUz: values.nameUz,
      nameRu: values.nameRu,
      boshqaKategoriya: selectedCategory,
    };

    try {
      if (isEditMode && currentItem) {
        const response = await axios.patch(
          `https://46d4deb0e08aaad2.mokky.dev/Kategoriyalar/${currentItem.id}`,
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
          "https://46d4deb0e08aaad2.mokky.dev/Kategoriyalar",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Created:", response.data);
      }

      await fetchProducts(); // Ma'lumotlarni yangilash
      onClose();
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  // edit Drower

  const onEdit = (item: any) => {
    form.setFieldsValue(item);
    setCurrentItem(item);
    setSelectedCategory(item.boshqaKategoriya); // Tahrirlash uchun tanlangan kategoriya
    setIsEditMode(true); // Tahrirlash rejimi
    setOpen(true);
    navigate(`${location.pathname}?action=edit`);
  };

  useEffect(() => {
    if (location.search.includes("action=edit")) {
      setIsEditMode(true);
      setOpen(true);
    } else if (location.search.includes("action=add")) {
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
            justifyContent: "center",
            gap: 8,
            background: "white",
            width: "230px",
          }}
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
          <Typography style={{ fontSize: 13, fontWeight: 600 }}>
            Yangi kategoriya <br /> qo’shish
          </Typography>
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
        </div>
      </Header>{" "}
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          width: "100%",
          height: "auto",
          padding: "15px 15px 15px 75px",
          background: "white",
          display: "flex",
          justifyContent: "start",
          textAlign: "end",
          gap: "105px",
          alignContent: "center",
          fontWeight: "bolder",
          boxShadow: "5px 5px 5px rgba(124, 124, 124, 0.3)",
        }}
      >
        <div className="flex gap-10 items-center ">
          <Typography>Kategoriya nomi (UZ)</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey " }}></div>
        <div className="flex gap-10 items-center">
          <Typography>Kategoriya nomi (Ru)</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex gap-10 items-center ">
          <Typography>Boshqa Kategoriya</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex gap-10 items-center">
          <Typography>Actions</Typography>
        </div>
      </div>
      <Content style={{ margin: "10px 20px 0" }}>
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
                style={{ padding: "13px", marginTop: -14 }}
                key={f.id}
              >
                <Card
                  className="card-col"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "1px 1px 10px rgba(124, 124, 124, 0.3)",
                    height: "63px",
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
                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.nameUz}
                      </Typography>
                    </div>
                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.nameRu ? f.nameRu : "-"}
                      </Typography>
                    </div>

                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.boshqaKategoriya}
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
          isEditMode ? "Kategoriyani tahrirlash" : "Yangi Kategoriyani qo'shish"
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
                name="nameUz"
                label="Kategoriya nomi uz"
                rules={[
                  {
                    required: true,
                    message: "Iltimos kategoriya nomini (uz) yozing !",
                  },
                ]}
              >
                <Input placeholder="Iltimos kategoriya nomini (uz)  yozing !" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="nameRu" label="Kategoriya nomi Ru">
                <Input placeholder="Iltimos  kategoriya nomini (ru)  yozing !" />
              </Form.Item>
            </Col>
            <Form.Item label="Boshqa kategoriya biriktirish ">
              <Select
                placeholder="Kategoriya tanlang"
                style={{ width: "100%" }}
                onChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
              >
                <Select.Option value="Ichimliklar">Ichimliklar</Select.Option>
                <Select.Option value="Go'shli maxsulot">
                  Go'shli maxsulot
                </Select.Option>
                <Select.Option value="Tovuqli maxsulot">
                  Tovuqli maxsulot
                </Select.Option>
              </Select>
            </Form.Item>
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
