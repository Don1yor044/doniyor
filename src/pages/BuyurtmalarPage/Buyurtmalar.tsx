/** @jsxImportSource @emotion/react */
import "./buyurtma.css";
import { Button, Form, message, Segmented, Spin, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { css } from "@emotion/react";
// icons
import { AiFillPlusCircle } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { BsBarChart, BsBarChartFill, BsClock } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { LuCheck } from "react-icons/lu";
import { TbLayoutList, TbLayoutListFilled } from "react-icons/tb";

// function
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ElementsDrower } from "./componets/elementDrower";
import { AddDrowers } from "./componets/addDrawer";
import styled from "@emotion/styled";
import moment from "moment";
import { Listcomponet } from "./componets/listComponets/list";

// const { Option } = Select;

export function Buyurtmalar() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialStatus = queryParams.get("action") || "Yangi";
  const [view, setView] = useState<"Charts" | "Lists">("Lists");
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);
  const [selectedMaxsulotlar, setSelectedMaxsulotlar] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [OrginalData, setOrginalData] = useState<any>([]);
  const [mijozData, setMijozData] = useState([]);
  const [filialData, setFilialData] = useState([]);
  const [maxsulotlarData, setMaxsulotlarData] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [filterMaxsulotlarData, filterSetMaxsulotlarData] = useState<any[]>([]);
  const [activeSegments, setActiveSegments] = useState("Lists");
  const [xodimlarData, setXodimlarData] = useState<any[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const action = queryParams.get("action");
    if (action) {
      setSelectedStatus(action);
    }
  }, [location.search]);
  const SegmentChange = (value: string) => {
    navigate(`${location.pathname}?action=${value}`);
  };

  useEffect(() => {
    filterStatusRender();
    mijozlarRender();
    filialRender();
    BuyurtmalarRender();
    maxsulotlarRender();
    FiltermaxsulotlarRender();
    categoryRender();
    xodimlarRender();
  }, [selectedStatus, selectedMaxsulotlar]);

  const maxsulotlarRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Maxsulotlar`
      );
      setMaxsulotlarData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to kategorya Api.");
      setLoading(false);
    }
  };
  const xodimlarRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/xodimlar`
      );
      setXodimlarData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to xodimlar Api.");
      setLoading(false);
    }
  };

  const categoryRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Kategoriyalar`
      );
      setCategoriesData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to kategorya Api.");
      setLoading(false);
    }
  };
  const FiltermaxsulotlarRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Maxsulotlar?categoryId=${selectedMaxsulotlar}`
      );

      console.log(res.data, "test");

      filterSetMaxsulotlarData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to kategorya Api.");
      setLoading(false);
    }
  };

  const filterStatusRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar?status=${selectedStatus}`
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to buyurtma Api.");
      setLoading(false);
    }
  };
  const mijozlarRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Mijozlar`
      );

      setMijozData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to Mijoz Api.");
      setLoading(false);
    }
  };
  const filialRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Filiallar`
      );
      setFilialData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to Filiallar Api.");
      setLoading(false);
    }
  };
  const BuyurtmalarRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar`
      );
      setOrginalData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to buyurtma Api.");
      setLoading(false);
    }
  };
  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await axios.patch(
        `https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar/${id}`,
        { status: newStatus }
      );
      await filterStatusRender();
      await BuyurtmalarRender();
      message.success("Status o'zgartirildi.");
    } catch (error) {
      message.warning("O'chirlidi");
    }
  };
  const changeStatus = async (
    id: number,
    direction: "next" | "previous" | "otkaz"
  ) => {
    const statuses = ["Yangi", "Qabul qilingan", "Jo'natilgan", "Yopilgan"];
    try {
      const response = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar/${id}`
      );
      const currentStatus = response.data.status;
      const currentIndex = statuses.indexOf(currentStatus);

      let newIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % statuses.length;
      } else if (direction === "otkaz") {
        console.log(1);
        deleteProduct(id);
      } else {
        newIndex = (currentIndex - 1 + statuses.length) % statuses.length; // Oldingi status
      }
      await filterStatusRender();
      await BuyurtmalarRender();
      //@ts-ignore
      const newStatus = statuses[newIndex];
      await updateStatus(id, newStatus);
    } catch (error) {
      message.error("Buyurtma ma'lumotlarini olishda xatolik.");
    }
  };
  const deleteProduct = async (id: number) => {
    try {
      await axios.patch(
        `https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar/${id}`,
        { status: "otkaz" }
      );
      await BuyurtmalarRender();
    } catch (error) {
      console.error("Error delete buyurtma:", error);
    }
  };

  const statusColumns = ["Yangi", "Qabul qilingan", "Jo'natilgan", "Yopilgan"];

  const filteredData = statusColumns.reduce((acc, status: any) => {
    acc[status] = OrginalData.filter((item: any) => item.status === status);
    return acc;
  }, {} as { [key: string]: any[] });

  //drower
  const [open, setOpen] = useState(false);
  const [slecDrower, setSlecDrower] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);
  const showDrawer = (id: number) => {
    const item = OrginalData.find((item: any) => item.id === id);

    if (item) {
      setSlecDrower(item);
      setOpen(true);
    } else {
      setSlecDrower(null);
    }
  };

  const onClose = () => {
    setOpen(false);
    setSlecDrower(null);
  };
  const AddShow = () => {
    setAddOpen(true);
  };
  const AddClose = () => {
    setAddOpen(false);
  };

  // add zakaz
  const [buttonGroups, setButtonGroups] = useState<{ [key: string]: number }>(
    {}
  );
  // Buyurtma qo'shish funksiyasi
  const handleAddClick = (id: string) => {
    setButtonGroups((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Buyurtma miqdorini o'zgartirish funksiyasi
  const handleChange = (id: string, amount: number) => {
    setButtonGroups((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + amount, 0),
    }));
  };

  // Hisoblash funksiyasi
  const calculateTotal = () => {
    return maxsulotlarData.reduce((total, item) => {
      const sanogi = buttonGroups[item.id] || 0;
      const price = parseFloat(item.price.toString()) || 0;

      if (!isNaN(price) && !isNaN(sanogi)) {
        return total + price * sanogi;
      }
      return total;
    }, 0);
  };

  // delete chek
  const deleteChek = () => {
    setButtonGroups({});
    setMaxsulotlarData([]);
  };
  // // add
  const totalPrice = calculateTotal();

  const handleSave = async (values: any) => {
    const selectedProducts = maxsulotlarData
      .filter((item) => buttonGroups[item.id] > 0)
      .map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        counter: buttonGroups[item.id],
      }));

    const newData = {
      id: OrginalData.length + 1,
      mijozId: values.mijoz,
      status: "Yangi",
      phone: values.phone,
      filialId: values.filial,
      tolovTuri: values.tolovTuri,
      price: `${totalPrice},000`,
      zakazVaqti: moment().format("HH:mm"),
      maxsulotlar: selectedProducts,
      zakazSanasi: moment().format("YYYY-MM-DD"),
    };

    try {
      await axios.post(
        "https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar",
        newData
      );

      setOrginalData((prevData: any) => [...prevData, newData]);

      AddClose();
      await filterStatusRender();
      await BuyurtmalarRender();
      form.resetFields();
      setButtonGroups({});
    } catch (error) {
      console.error("API ga yuborishda xatolik:", error);
    }
  };
  const selectedOrder = slecDrower
    ? OrginalData.find((item: any) => item.id === slecDrower.id)
    : null;
  //@ts-ignore
  const products = selectedOrder ? selectedOrder.maxsulotlar : [];

  return (
    <StyledSegmentOption>
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
            width: "270px",
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
              onClick={AddShow}
            >
              <AiFillPlusCircle
                style={{ fontSize: 33, background: "white", color: "#20D472" }}
              />
            </Button>
          </div>
          <div>
            <Typography style={{ fontSize: 13, fontWeight: 600 }}>
              Yangi buyurtma <br /> qo’shish
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
            paddingInline: 50,
          }}
        >
          <Segmented<string>
            size="large"
            style={{
              padding: "5px 20px",
              borderRadius: 50,
              width: "100%",
            }}
            value={selectedStatus}
            options={[
              {
                label: (
                  <span
                    style={{
                      padding: "0 50px",
                    }}
                  >
                    Yangi
                  </span>
                ),
                value: "Yangi",
              },
              {
                label: (
                  <span style={{ padding: "0 50px" }}>Qabul qilingan</span>
                ),
                value: "Qabul qilingan",
              },
              {
                label: <span style={{ padding: "0 50px" }}>Jo'natilgan</span>,
                value: "Jo'natilgan",
              },
              {
                label: <span style={{ padding: "0 50px" }}>Yopilgan</span>,
                value: "Yopilgan",
              },
            ]}
            onChange={(value) => {
              setSelectedStatus(value), SegmentChange(value);
            }}
            disabled={view === "Charts"}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            width: "300px",
          }}
        >
          <Segmented
            options={[
              {
                value: "Lists",
                icon:
                  activeSegments === "Lists" ? (
                    <TbLayoutListFilled
                      style={{
                        marginTop: 7,
                        fontSize: 16,
                        color: "#393939",
                      }}
                    />
                  ) : (
                    <TbLayoutList
                      style={{
                        marginTop: 7,
                        fontSize: 16,
                        color: "#888888",
                      }}
                    />
                  ),
              },
              {
                value: "Charts",
                icon:
                  activeSegments === "Charts" ? (
                    <BsBarChartFill
                      style={{
                        marginTop: 7,
                        fontSize: 16,
                        color: "#393939",
                      }}
                    />
                  ) : (
                    <BsBarChart
                      style={{
                        marginTop: 7,
                        fontSize: 16,
                        color: "#888888",
                      }}
                    />
                  ),
              },
            ]}
            onChange={(value: "Charts" | "Lists") => {
              setView(value);
              setActiveSegments(value);
            }}
          />
        </div>
      </Header>
      <Content
        style={{
          margin: "24px 120px 0px 34px",
        }}
      >
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="default" />
          </div>
        ) : view === "Charts" ? (
          <div css={gridContainer}>
            {statusColumns.map((status) => (
              <div key={status}>
                <div className="flex gap-2 items-center mb-2">
                  <Typography.Title level={5} style={{ color: "#424c48" }}>
                    {status}
                  </Typography.Title>

                  <Button
                    key={status}
                    style={{ outline: "none", border: "none" }}
                  >
                    {filteredData[status].length}
                  </Button>
                </div>
                {filteredData[status].map((item: any) => (
                  <div
                    key={item.id}
                    css={CardStyle1}
                    className="mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => showDrawer(item.id)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          css={css`
                            background-color: #20d472;
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 3px 15px;
                            border-radius: 40px;
                            font-size: 18px;
                          `}
                        >
                          {item.id}
                        </div>
                        <div>
                          <Button
                            style={{
                              padding: "15px 7px",
                              borderRadius: "50%",
                              background: "#EDEFF3",
                              border: "none",
                              outline: "none",
                            }}
                          >
                            <BiBookmark
                              style={{ fontSize: 19, color: "#4e5458b0" }}
                            />
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div>
                          <BsClock size={17} color="grey" />
                        </div>
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: 17,
                            color: "#3b4650",
                          }}
                        >
                          {item.zakazVaqti}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        background: "#9797973e",
                        height: "1px",
                        marginTop: 27,
                      }}
                    ></div>
                    <div
                      css={css`
                        margin-top: 10px;
                        padding: 3px;
                      `}
                    >
                      <div style={{ display: "flex", gap: 15 }}>
                        <div>
                          <FiUser
                            size={22}
                            style={{ marginTop: 3 }}
                            color="grey"
                          />
                        </div>
                        <Typography.Title style={{ fontSize: 19 }}>
                          {
                            //@ts-ignore
                            mijozData.find((item1) => item1.id === item.mijozId)
                              .name
                          }{" "}
                          {
                            //@ts-ignore
                            mijozData.find((item1) => item1.id === item.mijozId)
                              .lastName
                          }
                        </Typography.Title>
                      </div>
                      <div style={{ marginLeft: 40, marginTop: "-7px" }}>
                        <Typography.Title
                          level={5}
                          style={{ color: "#6f7070" }}
                        >
                          {
                            //@ts-ignore
                            mijozData.find((item1) => item1.id === item.mijozId)
                              .phone
                          }
                        </Typography.Title>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 4,
                        gap: 40,
                      }}
                    >
                      <div>
                        <div className="mt-3" style={{ color: "grey" }}>
                          Umumiy summa
                        </div>
                        <div className="flex">
                          <Typography.Title
                            level={4}
                            style={{ fontWeight: 700 }}
                          >
                            {
                              //@ts-ignore
                              OrginalData.find(
                                (item1: any) => item1.id === item.id
                              )?.price
                                ? (
                                    parseInt(
                                      OrginalData.find(
                                        (item1: any) => item1.id === item.id
                                        //@ts-ignore
                                      )?.price
                                    ) + 5
                                  ).toLocaleString("UZ-uz")
                                : "0"
                            }
                            ,000
                          </Typography.Title>
                          <Typography.Title
                            level={4}
                            style={{
                              margin: "0px 0px 0px 10px",
                              fontWeight: 400,
                            }}
                          >
                            UZS
                          </Typography.Title>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div
                            style={{
                              background:
                                OrginalData.find(
                                  (item1: any) => item1.id === item.id
                                )?.tolovTuri === "Payme"
                                  ? "#14E5E4"
                                  : OrginalData.find(
                                      (item1: any) => item1.id === item.id
                                    )?.tolovTuri === "Naqd"
                                  ? "#093"
                                  : "#FCB600",
                              borderRadius: "50%",
                              height: "10px",
                              width: "10px",
                            }}
                          ></div>
                          <Typography.Title level={5} style={{ margin: 0 }}>
                            {
                              //@ts-ignore
                              OrginalData.find(
                                (item1: any) => item1.id === item.id
                              )?.tolovTuri
                            }
                          </Typography.Title>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        background: "#9797973e",
                        height: "1px",
                        marginTop: 5,
                      }}
                    ></div>
                    <div className="flex justify-between py-4 px-1">
                      <div>
                        <div
                          style={{
                            fontWeight: 500,
                            color: "grey",
                            fontSize: 12,
                          }}
                        >
                          Operator
                        </div>
                        <Typography.Title level={5}>
                          {xodimlarData.find(
                            (item1) =>
                              item1.lavozim === "operator" &&
                              item1.id === item.filialId
                          )?.name || "Nasriddin"}
                        </Typography.Title>
                        <div
                          style={{
                            fontWeight: 500,
                            color: "grey",
                            fontSize: 12,
                            marginTop: 20,
                          }}
                        >
                          Filial:
                        </div>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                          Fast Food
                        </Typography.Title>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                          {
                            //@ts-ignore
                            filialData.find(
                              (item1: any) => item1.id === item.filialId
                            ).nameUz
                          }
                        </Typography.Title>
                      </div>
                      <div>
                        {item.status == "Yangi" ? (
                          <button
                            css={css`
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              background: white;
                              border-radius: 50%;
                              height: 55px;
                              width: 55px;
                              padding: 0;
                              border: 5px solid #edeff3;
                              box-shadow: none;
                              z-index: 99%;
                            `}
                            onClick={(event) => {
                              event.stopPropagation();
                              changeStatus(item.id, "otkaz");
                            }}
                          >
                            <CgClose size={24} />
                          </button>
                        ) : (
                          <button
                            css={css`
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              background: white;
                              border-radius: 50%;
                              height: 55px;
                              width: 55px;
                              padding: 0;
                              border: 5px solid #edeff3;
                              box-shadow: none;
                              z-index: 99%;
                            `}
                            onClick={(event) => {
                              event.stopPropagation(); // Bu hodisani Card'ga o'tishini to'xtatadi
                              changeStatus(item.id, "previous");
                            }}
                          >
                            <CgClose size={24} />
                          </button>
                        )}

                        {item.status == "Yopilgan" ? (
                          <button
                            css={css`
                              display: none;
                              justify-content: center;
                              align-items: center;
                              background: white;
                              border-radius: 50%;
                              height: 55px;
                              width: 55px;
                              margin-top: 10px;
                              padding: 0;
                              border: 5px solid #edeff3;
                              z-index: 99%;
                            `}
                            onClick={(event) => {
                              event.stopPropagation();
                              changeStatus(item.id, "next");
                            }}
                          >
                            <LuCheck size={24} />
                          </button>
                        ) : (
                          <button
                            css={css`
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              background: white;
                              border-radius: 50%;
                              height: 55px;
                              width: 55px;
                              margin-top: 10px;
                              padding: 0;
                              border: 5px solid #edeff3;
                              z-index: 99%;
                            `}
                            onClick={(event) => {
                              event.stopPropagation();
                              changeStatus(item.id, "next");
                            }}
                          >
                            <LuCheck size={24} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {data.map((order: any) => (
              <Listcomponet
                key={order.id}
                item={order}
                mijozData={mijozData}
                xodimlarData={xodimlarData}
                filialData={filialData}
                changeStatus={changeStatus}
                showDrawer={showDrawer}
                OrginalData={OrginalData}
              />
            ))}
          </div>
        )}
      </Content>
      {/* profile Drower  */}
      <ElementsDrower
        open={open}
        onClose={onClose}
        slecDrower={slecDrower}
        mijozData={mijozData}
        filialData={filialData}
        products={products}
        OrginalData={OrginalData}
        xodimlarData={xodimlarData}
      />
      {/* add Drower  */}
      <AddDrowers
        categoriesData={categoriesData}
        AddClose={AddClose}
        addOpen={addOpen}
        selectedMaxsulotlar={selectedMaxsulotlar}
        setSelectedMaxsulotlar={setSelectedMaxsulotlar}
        loading={loading}
        filterMaxsulotlarData={filterMaxsulotlarData}
        buttonGroups={buttonGroups}
        handleChange={handleChange}
        handleAddClick={handleAddClick}
        deleteChek={deleteChek}
        maxsulotlarData={maxsulotlarData}
        calculateTotal={calculateTotal}
        form={form}
        handleSave={handleSave}
        mijozData={mijozData}
        filialData={filialData}
      />
    </StyledSegmentOption>
  );
}

const CardStyle1 = css`
  padding: 15px;
  border-radius: 8px 8px 8px 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #dcdcdc;
  background-color: white;
  height: 60vh;
`;

const gridContainer = css`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 10px;
`;
const StyledSegmentOption = styled("div")`
  .ant-segmented-item {
    border-radius: 50px 50px 50px 50px !important;
  }
  .ant-segmented-group {
    display: flex;
    gap: 0px;
  }
  .ant-segmented {
    border-radius: 50px 50px 50px 50px !important;
    padding: 7px 10px;
  }
`;
