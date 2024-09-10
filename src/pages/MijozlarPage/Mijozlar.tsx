/** @jsxImportSource @emotion/react */
import {
  Button,
  Col,
  Drawer,
  Input,
  message,
  Modal,
  Row,
  Space,
  Typography,
  Form,
  Checkbox,
  Spin,
  Card,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
// icons
import { AiFillPlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FiEdit2, FiFilter } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { MdBlockFlipped } from "react-icons/md";
import { LuCheckCircle } from "react-icons/lu";

export function Mijozlar() {
  const [data, setData] = useState([]);
  const [buyurtmalarData, setBuyurtmalarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
    BuyurtmalarData();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Mijozlar"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch products.");
      setLoading(false);
    }
  };
  const BuyurtmalarData = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar"
      );
      setBuyurtmalarData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch buyurmalar.");
      setLoading(false);
    }
  };

  // Modal
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  // Checkboxlar
  const handleCheckboxChange = (e: any) => {
    const { value, checked } = e.target;
    setStatusFilter((prev: string[]) =>
      checked ? [...prev, value] : prev.filter((status) => status !== value)
    );
  };

  useEffect(() => {
    let sortedData = [...data];
    if (sortOrder) {
      sortedData = sortedData.sort((a: any, b: any) =>
        sortOrder === "asc"
          ? a.buyurtmalarSoni - b.buyurtmalarSoni
          : b.buyurtmalarSoni - a.buyurtmalarSoni
      );
    }
    if (statusFilter.length > 0) {
      sortedData = sortedData.filter((item: any) =>
        statusFilter.includes(item.status)
      );
    }

    setFilteredData(sortedData);
  }, [data, sortOrder, statusFilter]);

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
      await axios.delete(`https://46d4deb0e08aaad2.mokky.dev/Mijozlar/${id}`);
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
      setFilteredData((prevData) =>
        prevData.filter((item: any) => item.id !== id)
      );
      message.success("Mijoz muvaffaqiyatli o'chirildi.");
    } catch (error) {
      message.error("Mijoz o'chirishda xatolik.");
    }
  };

  // drower
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
    navigate(`${location.pathname}?action=add`);
    setIsEditMode(false);
    form.resetFields();
  };

  const onClose = () => {
    setOpen(false);
    navigate(location.pathname);
  };

  // add Drowe and edit

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values.photo);

    const data = {
      name: values.name,
      lastName: values.lastName,
      phone: values.phone,
      buyurtmalarSoni: values.buyurtmalarSoni,
      status: "Activ",
    };

    try {
      if (isEditMode && currentItem) {
        const response = await axios.patch(
          `https://46d4deb0e08aaad2.mokky.dev/Mijozlar/${currentItem.id}`,
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
          "https://46d4deb0e08aaad2.mokky.dev/Mijozlar",
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

  // quareni kuzatish
  useEffect(() => {
    if (location.search.includes("action=add")) {
      setOpen(true);
    }
  }, [location.search]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await axios.patch(`https://46d4deb0e08aaad2.mokky.dev/Mijozlar/${id}`, {
        status: newStatus,
      });
      message.success(`Status successfully updated to ${newStatus}`);
      await fetchProducts();
    } catch (error) {
      message.error("Failed to update status.");
    }
  };
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
              Yangi mijoz <br /> qo’shish
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
          </div>
        </div>
      </Header>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          width: "100%",
          height: "auto",
          padding: "15px 15px 15px 85px",
          background: "white",
          display: "flex",
          justifyContent: "start",
          textAlign: "end",
          gap: "80px",
          alignContent: "center",
          fontWeight: "bolder",
          boxShadow: "5px 5px 5px rgba(124, 124, 124, 0.3)",
        }}
      >
        <div className="flex gap-10 items-center ">
          <Typography>Mijoz Ismi </Typography>
        </div>
        <div style={{ borderRight: "1px solid grey " }}></div>
        <div className="flex gap-10 items-center">
          <Typography>Telefon Raqami </Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex justify-center ">
          <Typography>Buyurtmalar Soni </Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex gap-10 items-center ">
          <Typography>Status</Typography>
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
                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.lastName + " " + f.name}
                      </Typography>
                    </div>
                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.phone}
                      </Typography>
                    </div>

                    <div style={{ width: `calc(100% / 5)`, paddingLeft: 50 }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {
                          buyurtmalarData.filter(
                            (buyurtma: any) => buyurtma.mijozId === f.id
                          )?.length
                        }{" "}
                        ta
                      </Typography>
                    </div>
                    <div style={{ width: `calc(100% / 5)`, paddingLeft: 50 }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                          color: ${f.status == "Activ" ? "green" : "red"};
                        `}
                      >
                        {f.status}
                      </Typography>
                    </div>

                    <div css={containerStyle}>
                      {f.status === "Activ" ? (
                        <Button
                          type="text"
                          onClick={() => handleStatusChange(f.id, "Block")}
                          style={{
                            background: "white",
                            marginLeft: "10px",
                            borderRadius: "50%",
                            padding: 18,
                            border: "4px solid #EDEFF3",
                          }}
                          icon={<MdBlockFlipped fontSize={17} />}
                        />
                      ) : (
                        <Button
                          type="text"
                          onClick={() => handleStatusChange(f.id, "Activ")}
                          style={{
                            background: "white",
                            marginLeft: "10px",
                            borderRadius: "50%",
                            padding: 18,
                            border: "4px solid #EDEFF3",
                          }}
                          icon={<LuCheckCircle fontSize={17} />}
                        />
                      )}
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
      <Modal
        title="Mijozlarni Filtrlash"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        style={{ top: 70 }}
        width={400}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontWeight: 500,
          }}
        >
          <Checkbox
            style={{ color: "#4b4b4b" }}
            value="asc"
            onChange={(e) => setSortOrder(e.target.checked ? "asc" : null)}
          >
            Buyurtmalar Soni (o'sish tartibida)
          </Checkbox>
          <Checkbox
            style={{ color: "#4b4b4b" }}
            value="desc"
            onChange={(e) => setSortOrder(e.target.checked ? "desc" : null)}
          >
            Buyurtmalar Soni( kamayish tartibida)
          </Checkbox>

          <Checkbox
            style={{ color: "#4b4b4b" }}
            value="Activ"
            onChange={handleCheckboxChange}
          >
            Aktiv Mijozlar
          </Checkbox>
          <Checkbox
            style={{ color: "#4b4b4b" }}
            value="Block"
            onChange={handleCheckboxChange}
          >
            Bloklangan Mijozlar
          </Checkbox>
        </div>
      </Modal>
      <Drawer
        title={isEditMode ? "Mijozni tahrirlash" : "Yangi Mijoz qo'shish"}
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
                    message: "Iltimos Mijoz nomini yozing !",
                  },
                ]}
              >
                <Input placeholder="Iltimos Mijoz nomini yozing !" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="lastName"
                label="LastName"
                rules={[
                  {
                    required: true,
                    message: "Iltimos Mijoz lastName yozing !",
                  },
                ]}
              >
                <Input placeholder="Iltimos Mijoz lastName yozing !" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="phone"
                label="Telefon Raqami"
                rules={[
                  {
                    required: true,
                    message: "Iltimos Telefon Raqamini yozing !",
                  },
                ]}
              >
                <Input placeholder="Iltimos Telefon Raqami yozing !" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="buyurtmalarSoni"
                label="Buyurtmalar Soni"
                rules={[
                  {
                    required: true,
                    message: "Iltimos Buyurtmalar sonini ma'lumot kiriting!",
                  },
                ]}
              >
                <Input placeholder="Iltimos Buyurtmalar sonini ma'lumot kiriting!" />
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
