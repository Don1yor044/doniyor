/** @jsxImportSource @emotion/react */
import {
  Button,
  Col,
  Drawer,
  Input,
  message,
  Row,
  Space,
  Typography,
  Form,
  TimePicker,
  Spin,
  Card,
  Modal,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";

// icons
import { AiFillPlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FiEdit2, FiMapPin } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { LeafletMap } from "./componets/addMap";
import { Maps } from "./componets/clickMap";

export function Filiallar() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [position, setPosition] = useState([41.2995, 69.2401]);
  const [mapVisible, setMapVisible] = useState(false);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Filiallar"
      );
      setLoading(false);
      setData(response.data);
    } catch (error) {
      message.error("Failed to fetch filial.");
      setLoading(false);
    }
  };

  //  search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);

    const filtered = data.filter((item: any) =>
      item.nameUz.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://46d4deb0e08aaad2.mokky.dev/Filiallar/${id}`);
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
    setOpen(true);
    setIsEditMode(false); // Yangi qo'shish rejimi
    setCurrentItem(null); // Tahrirlash uchun itemni bo'shatish
    form.resetFields(); // Formani tozalash
    navigate(`${location.pathname}?action=add`);
  };
  const onClose = () => {
    setOpen(false);
    form.resetFields(); // Formani tozalash
    setIsEditMode(false); // Tahrirlash rejimini tozalash
    setCurrentItem(null); // Tahrirlash uchun itemni bo'shatish
    navigate(`${location.pathname}`);
  };

  // add Drowe and edit
  const onFinish = async (values: any) => {
    console.log(values.photo);

    const data = {
      nameUz: values.nameUz,
      nameRu: values.nameRu,
      moljal: values.moljal,
      address: values.address,
      ishVaqtiB: values.ishVaqtiB ? values.ishVaqtiB.format("HH:mm") : null,
      ishVaqtiT: values.ishVaqtiT ? values.ishVaqtiT.format("HH:mm") : null,
    };

    try {
      if (isEditMode && currentItem) {
        const response = await axios.patch(
          `https://46d4deb0e08aaad2.mokky.dev/Filiallar/${currentItem.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Updated:", response.data);
        message.success("Maxsulot muvaffaqiyatli yangilandi.");
        await fetchProducts();
      } else {
        const response = await axios.post(
          "https://46d4deb0e08aaad2.mokky.dev/Filiallar",
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
    // Set form fields including time and address
    form.setFieldsValue({
      ...item,
      ishVaqtiB: item.ishVaqtiB ? moment(item.ishVaqtiB, "HH:mm") : null,
      ishVaqtiT: item.ishVaqtiT ? moment(item.ishVaqtiT, "HH:mm") : null,
      address: item.address || "Nomalum",
    });

    setCurrentItem(item);
    setIsEditMode(true);
    setOpen(true);

    const addressCoords = item.address
      ? (item.address
          .split(",")
          .map((coord: any) => parseFloat(coord.trim())) as [number, number])
      : [41.2995, 69.2401];

    setPosition(addressCoords);
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
  const handlePositionChange = (position: [number, number]) => {
    form.setFieldsValue({
      address: `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`,
    });

    setPosition(position);
  };
  const handleMapOpen = (address: string) => {
    const addressCoords = address
      ? (address
          .split(",")
          .map((coord: string) => parseFloat(coord.trim())) as [number, number])
      : [41.2995, 69.2401];
    //@ts-ignore
    setMapPosition(addressCoords);
    setMapVisible(true);
  };

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
              Yangi filial <br /> qo’shish
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
        </div>
      </Header>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          width: "100%",
          height: "auto",
          padding: "15px 10px 15px 55px",
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
        <div className="flex gap-10 items-center  ">
          <Typography>Filial Nomi (Uz)</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey " }}></div>
        <div className="flex gap-10 items-center">
          <Typography>Filial Nomi (Ru) </Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex gap-10 items-center ">
          <Typography>Mo'ljal</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div className="flex gap-10 items-center ">
          <Typography>Ish Vaqti</Typography>
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
                        {f.nameUz}
                      </Typography>
                    </div>
                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                          padding-left: 50px;
                        `}
                      >
                        {f.nameRu ? f.nameRu : "-"}
                      </Typography>
                    </div>

                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          padding-left: 70px;
                          font-weight: 500;
                        `}
                      >
                        {f.moljal ? f.moljal : "-"}
                      </Typography>
                    </div>
                    <div style={{ width: `calc(100% / 5)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                          padding-left: 80px;
                        `}
                      >
                        {f.ishVaqtiB} - {f.ishVaqtiT}
                      </Typography>
                    </div>

                    <div css={containerStyle}>
                      <Button
                        type="text"
                        onClick={() => handleMapOpen(f.address)}
                        style={{
                          background: "white",
                          marginLeft: "10px",
                          borderRadius: "50%",
                          padding: 18,
                          border: "4px solid #EDEFF3",
                        }}
                        icon={<FiMapPin fontSize={17} />}
                      />

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
        title={isEditMode ? "Filial tahrirlash" : "Yangi Filial qo'shish"}
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
                label="Filial nomi uz"
                rules={[
                  {
                    required: true,
                    message: "Iltimos filial nomini (uz) yozing !",
                  },
                ]}
              >
                <Input placeholder="Iltimos filial nomini (uz)  yozing !" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="nameRu" label="Filial nomi Ru">
                <Input placeholder="Iltimos  filial nomini (ru)  yozing !" />
              </Form.Item>
            </Col>
            {/* ish vaqt */}
            <Col>
              <div style={{ marginBottom: 5 }}>Ish vaqti</div>
              <Form.Item name="ishVaqtiB">
                <TimePicker
                  format={"HH:mm"}
                  style={{ width: 100, padding: 10 }}
                />
              </Form.Item>
            </Col>
            <Col style={{ marginTop: 29 }}>
              <div
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 20,
                  width: 20,
                  height: 1,
                  background: "#979797",
                }}
              ></div>
            </Col>
            <Col style={{ marginTop: 27 }}>
              <Form.Item name="ishVaqtiT">
                <TimePicker
                  format={"HH:mm"}
                  style={{ width: 100, padding: 10 }}
                />
              </Form.Item>
            </Col>
            <div className="flex p-1 gap-2">
              <Col>
                <Form.Item name="moljal" label="Filial mo'ljal">
                  <Input placeholder="Iltimos moljal yozing !" />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name="address"
                  label="Filial manzili"
                  rules={[
                    {
                      required: true,
                      message: "Iltimos manzil yozing!",
                    },
                  ]}
                >
                  <Input placeholder="Iltimos manzil yozing!" />
                </Form.Item>
              </Col>
            </div>
            <Col span={24}>
              <LeafletMap
                //@ts-ignore
                position={position}
                onPositionChange={handlePositionChange}
              />
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
      <Modal
        title="Filial Manzilini Ko'rsatish"
        visible={mapVisible}
        onCancel={() => setMapVisible(false)}
        footer={null}
        width={400}
      >
        {mapPosition && (
          <Maps position={mapPosition} onPositionChange={() => {}} />
        )}
      </Modal>
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
