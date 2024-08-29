/** @jsxImportSource @emotion/react */
import { Button, message, Segmented, Spin, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { AiFillPlusCircle } from "react-icons/ai";
import { css } from "@emotion/react";
// icons
import { BiBookmark } from "react-icons/bi";
import { BsBarChart, BsClock } from "react-icons/bs";
import { FiPhone, FiUser } from "react-icons/fi";
import { RxClipboard } from "react-icons/rx";
import { CiDeliveryTruck } from "react-icons/ci";
import { CgClose } from "react-icons/cg";
import { LuCheck } from "react-icons/lu";
import { TbLayoutList } from "react-icons/tb";

// function
import { useEffect, useState } from "react";
import axios from "axios";

export function Buyurtmalar() {
  const [view, setView] = useState<"Charts" | "Lists">("Lists");
  //@ts-ignore
  const [selectedStatus, setSelectedStatus] = useState<string>("Yangi");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mijozData, setMijozData] = useState([]);
  const [filialData, setFilialData] = useState([]);

  useEffect(() => {
    buyurtmalarRender();
    mijozlarRender();
    filialRender();
  }, [selectedStatus]);
  const buyurtmalarRender = async () => {
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
  const buyurtmalarRenderTest = async (selectedStatus: string) => {
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
  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await axios.patch(
        `https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar/${id}`,
        { status: newStatus }
      );
      await buyurtmalarRender();
      message.success("Status o'zgartirildi.");
    } catch (error) {
      message.error("Statusni o'zgartirishda xatolik.");
    }
  };

  const changeStatus = async (id: number, direction: "next" | "previous") => {
    const statuses = ["Yangi", "Qabul qilingan", "Jo'natilgan", "Yopilgan"];
    try {
      const response = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar/${id}`
      );
      const currentStatus = response.data.status;
      const currentIndex = statuses.indexOf(currentStatus);

      let newIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % statuses.length; // Keyingi status
      } else {
        newIndex = (currentIndex - 1 + statuses.length) % statuses.length; // Oldingi status
      }

      const newStatus = statuses[newIndex];
      await updateStatus(id, newStatus);
    } catch (error) {
      message.error("Buyurtma ma'lumotlarini olishda xatolik.");
    }
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
            justifyContent: "center",
            gap: 8,
            background: "white",
            width: "300px",
          }}
        >
          <Button
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
              padding: 0,
            }}
          >
            <AiFillPlusCircle
              style={{ fontSize: 33, background: "white", color: "#20D472" }}
            />
          </Button>
          <Typography style={{ fontSize: 12, fontWeight: 600 }}>
            Yangi buyurtma <br /> qo’shish
          </Typography>
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
              buyurtmalarRenderTest(value);
            }}
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
                icon: <TbLayoutList style={{ marginTop: 7 }} />,
              },
              {
                value: "Charts",
                icon: <BsBarChart style={{ marginTop: 7 }} />,
              },
            ]}
            // value={view}
            onChange={(value: "Charts" | "Lists") => {
              setView(value);
            }}
          />
        </div>
      </Header>
      <Content
        style={{
          margin: "24px 120px 0px 34px",
        }}
      >
        <>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spin size="default" />
            </div>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((item: any) => (
              <div>
                {/* list ko'rinishda */}
                {view === `Lists` && (
                  <div
                    key={item.id}
                    css={css`
                      display: flex;
                      width: 100%;
                      gap: 3px;
                      margin-bottom: 15px;
                    `}
                  >
                    <div css={CardStyle}>
                      <div
                        css={css`
                          display: flex;
                          justify-content: center;
                        `}
                      >
                        <div className="flex gap-8">
                          <div>
                            <div
                              css={css`
                                background-color: #20d472;
                                color: white;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                padding: 5px 30px;
                                border-radius: 40px;
                                font-size: 18px;
                              `}
                            >
                              8549
                            </div>
                            <div
                              style={{
                                background: "#9797973e",
                                height: "1px",
                                marginTop: 27,
                              }}
                            ></div>
                            <div
                              style={{
                                display: "flex",
                                marginTop: 20,
                                gap: 15,
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <BsClock size={20} color="grey" />
                              </div>
                              <div
                                style={{
                                  fontWeight: 600,
                                  fontSize: 20,
                                  color: "#3b4650",
                                }}
                              >
                                {" "}
                                00:24
                              </div>
                            </div>
                          </div>

                          <div>
                            {" "}
                            <Button
                              style={{
                                padding: "20px 10px ",
                                borderRadius: "50%",
                                background: "#EDEFF3",
                                border: "none",
                                outline: "none",
                              }}
                            >
                              <BiBookmark
                                style={{ fontSize: 20, color: "#4e5458b0" }}
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div css={CardStyle}>
                      {" "}
                      <div
                        css={css`
                          justify-content: center;
                        `}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 15,
                            alignItems: "start",
                          }}
                        >
                          <div>
                            <FiUser
                              size={22}
                              style={{ marginTop: 5 }}
                              color="grey"
                            />
                          </div>
                          <Typography.Title level={4}>
                            {
                              //@ts-ignore
                              mijozData.find(
                                (item1: any) => item1.id === item.mijozId
                              ).name
                            }{" "}
                            <br />
                            {
                              //@ts-ignore
                              mijozData.find(
                                (item1: any) => item1.id === item.mijozId
                              ).lastName
                            }
                          </Typography.Title>
                        </div>

                        <div
                          style={{ display: "flex", marginTop: 20, gap: 15 }}
                        >
                          <div>
                            <FiPhone size={20} color="grey" />
                          </div>
                          <Typography.Title level={5}>
                            {
                              //@ts-ignore
                              mijozData.find(
                                (item1: any) => item1.id === item.mijozId
                              ).phone
                            }
                          </Typography.Title>
                        </div>
                      </div>
                    </div>
                    <div css={CardStyle}>
                      <div style={{ display: "flex" }}>
                        <div>
                          <div className="flex gap-2">
                            <div>
                              <RxClipboard size={20} color="grey" />
                            </div>
                            <div style={{ fontWeight: 500 }}>35,400 UZS</div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <div>
                              <CiDeliveryTruck size={23} color="grey" />
                            </div>
                            <div style={{ fontWeight: 500 }}>5,000 UZS</div>
                          </div>
                          <div className="mt-5" style={{ color: "grey" }}>
                            Umumiy summa
                          </div>
                          <div className="flex ">
                            <Typography.Title
                              level={4}
                              style={{ fontWeight: 700 }}
                            >
                              40,400
                            </Typography.Title>
                            <Typography.Title
                              level={4}
                              style={{
                                margin: "0px 50px 0px 10px",
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
                                background: "#14E5E4",
                                borderRadius: "50%",
                                height: "10px",
                                width: "10px",
                              }}
                            ></div>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                              Payme
                            </Typography.Title>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div css={CardStyle}>
                      <div
                        css={css`
                          position: absolute;
                        `}
                      >
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
                          Komilova M
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

                        <div
                          css={css`
                            position: relative;
                            top: -120px;
                            right: -227px;
                          `}
                        >
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
                            `}
                          >
                            <CgClose
                              size={24}
                              onClick={() => changeStatus(item.id, "previous")}
                            />
                          </button>
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
                            `}
                          >
                            <LuCheck
                              size={24}
                              onClick={() => changeStatus(item.id, "next")}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* card ko'rinishda */}
                {view === `Charts` && (
                  <div>
                    <div css={CardStyle1}>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          {" "}
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
                            8549
                          </div>
                          <div>
                            {" "}
                            <Button
                              style={{
                                padding: "15px 7px ",
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
                            {" "}
                            00:24
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
                        <div
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <div>
                            <FiUser
                              size={22}
                              style={{ marginTop: 3 }}
                              color="grey"
                            />
                          </div>
                          <Typography.Title level={4}>
                            {
                              //@ts-ignore
                              mijozData.find(
                                (item1: any) => item1.id === item.mijozId
                              ).name
                            }{" "}
                            {
                              //@ts-ignore
                              mijozData.find(
                                (item1: any) => item1.id === item.mijozId
                              ).lastName
                            }
                          </Typography.Title>
                        </div>

                        <div
                          style={{
                            marginLeft: 40,
                            marginTop: "-7px",
                          }}
                        >
                          <Typography.Title
                            level={5}
                            style={{ color: "#6f7070" }}
                          >
                            {
                              //@ts-ignore
                              mijozData.find(
                                (item1: any) => item1.id === item.mijozId
                              ).phone
                            }
                          </Typography.Title>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: 4,
                        }}
                      >
                        <div>
                          <div className="mt-3 " style={{ color: "grey" }}>
                            Umumiy summa
                          </div>
                          <div className="flex ">
                            <Typography.Title
                              level={4}
                              style={{ fontWeight: 700 }}
                            >
                              40,400
                            </Typography.Title>
                            <Typography.Title
                              level={4}
                              style={{
                                margin: "0px 50px 0px 10px",
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
                                background: "#14E5E4",
                                borderRadius: "50%",
                                height: "10px",
                                width: "10px",
                              }}
                            ></div>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                              Payme
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
                            Komilova M
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
                            `}
                          >
                            <CgClose
                              size={24}
                              onClick={() => changeStatus(item.id, "previous")}
                            />
                          </button>
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
                            `}
                          >
                            <LuCheck
                              size={24}
                              onClick={() => changeStatus(item.id, "next")}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>Ma'lumot mavjud emas.</div>
          )}
        </>
      </Content>
    </>
  );
}
const CardStyle = css`
  padding: 25px 25px;
  width: calc(100% / 4);
  border-radius: 8px 8px 8px 8px;
  background-color: white;
  height: 26vh;
`;
const CardStyle1 = css`
  padding: 15px;
  width: calc(100% / 4);
  border-radius: 8px 8px 8px 8px;
  background-color: white;
`;
