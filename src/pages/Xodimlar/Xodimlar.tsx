/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Card, Col, message, Row, Spin, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AddDrawer } from "./componets/addDrawer";
import { EditDrawer } from "./componets/editDrawer";
import { FilterComponent } from "./componets/filterModal";

export default function Xodimlar() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [EditdrawerOpen, setEditDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    XodimlarRender();
  }, []);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  const XodimlarRender = async () => {
    try {
      const res = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/xodimlar"
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      message.error("apida xato");
      setLoading(false);
    }
  };
  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const delteXodim = async (id: number) => {
    try {
      const res = await axios.delete(
        `https://46d4deb0e08aaad2.mokky.dev/xodimlar/${id}`
      );
      setData(res.data);
      setLoading(false);
      XodimlarRender();
      message.success("ochirildi");
    } catch (error) {
      message.error("ochishir xato");
      setLoading(false);
    }
  };
  const showEditDrawer = (data: any) => {
    setEditData(data);
    setEditDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditData(null);
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
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
              Yangi xodim
              <br /> qo’shish
            </Typography>
          </div>
        </div>
        <div
          style={{
            background: "white",
            display: "flex",
            width: "100%",
            alignItems: "center ",
            justifyContent: "end",
            gap: 25,
            paddingInline: 60,
          }}
        >
          <div
            style={{
              background: "#EDEFF3",
              padding: 4,
              borderRadius: "50px 50px 50px 50px",
            }}
          >
            <Button
              style={{
                display: "flex",
                background: "#ffffff",
                color: "#000000",
                fontWeight: 500,
                padding: "0px 15px ",
                fontSize: 14,
                border: "none",
                borderRadius: "50px 50px 50px 50px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onClick={showModal}
            >
              FILTER
            </Button>
          </div>
        </div>
      </Header>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          width: "100%",
          height: "auto",
          padding: "15px 15px 15px 95px",
          background: "white",
          display: "flex",
          justifyContent: "start",
          textAlign: "end",
          gap: "145px",
          alignContent: "center",
          fontWeight: "bolder",
          boxShadow: "5px 5px 5px rgba(124, 124, 124, 0.3)",
        }}
      >
        <div>
          <Typography>F.I</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div>
          <Typography>Telefon Raqami</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>
        <div>
          <Typography>Lavozim</Typography>
        </div>
        <div style={{ borderRight: "1px solid grey" }}></div>

        <div>
          <Typography>Actions</Typography>
        </div>
      </div>
      <Content style={{ margin: "10px 20px 0" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="default" />
          </div>
        ) : filteredData.length === 0 ? (
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
                          font-weight: 600;
                        `}
                      >
                        {f.name} {f.lastName}
                      </Typography>
                    </div>
                    <div style={{ width: `calc(100% / 4)` }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.phone}
                      </Typography>
                    </div>

                    <div style={{ width: `calc(100% / 4)`, paddingLeft: 50 }}>
                      <Typography
                        css={css`
                          font-size: 14px !important;
                          font-weight: 500;
                        `}
                      >
                        {f.lavozim}
                      </Typography>
                    </div>

                    <div className="flex ">
                      <div style={{ marginTop: "-15px" }}>
                        <Button
                          type="text"
                          style={{
                            background: "white",
                            borderRadius: "50%",
                            padding: 18,
                            marginLeft: "10px",
                            border: "4px solid #EDEFF3",
                          }}
                          icon={<FiEdit2 fontSize={17} />}
                          onClick={() => showEditDrawer(f)}
                        />
                      </div>
                      <div style={{ marginTop: "-15px" }}>
                        <Button
                          type="text"
                          style={{
                            background: "white",
                            borderRadius: "50%",
                            padding: 18,
                            marginLeft: "10px",
                            border: "4px solid #EDEFF3",
                          }}
                          onClick={() => delteXodim(f.id)}
                          icon={<FaRegTrashAlt fontSize={17} />}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>
      <AddDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        render={XodimlarRender}
      />
      <EditDrawer
        open={EditdrawerOpen}
        onClose={closeEditDrawer}
        render={XodimlarRender}
        editData={editData}
      />
      <FilterComponent
        data={data}
        setFilteredData={setFilteredData}
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
      />
    </>
  );
}
