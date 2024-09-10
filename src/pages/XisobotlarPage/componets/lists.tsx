/** @jsxImportSource @emotion/react */

import { Row, Col, Card, Typography, Button, Spin, Modal } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { css } from "@emotion/react";
import { Content } from "antd/es/layout/layout";

export const TableHeader = () => (
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
      gap: "110px",
      alignContent: "center",
      fontWeight: "bolder",
      boxShadow: "5px 5px 5px rgba(124, 124, 124, 0.3)",
    }}
  >
    <div>
      <Typography>Filial</Typography>
    </div>
    <div style={{ borderRight: "1px solid grey" }}></div>
    <div>
      <Typography>Payme</Typography>
    </div>
    <div style={{ borderRight: "1px solid grey" }}></div>
    <div>
      <Typography>Naqd</Typography>
    </div>
    <div style={{ borderRight: "1px solid grey" }}></div>
    <div>
      <Typography>Terminal</Typography>
    </div>
    <div style={{ borderRight: "1px solid grey" }}></div>
    <div>
      <Typography>Actions</Typography>
    </div>
  </div>
);

type TableContentType = {
  data: any[];
  loading: boolean;
  filialData: any[];
  buyurtmaData: any[];
  onDelete: (id: number) => void;
};

export const ListTableContent: React.FC<TableContentType> = ({
  data,
  loading,
  filialData,
  buyurtmaData,
  onDelete,
}) => (
  <Content style={{ margin: "10px 20px 0" }}>
    {loading ? (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 15 }}>
        <Spin size="default" />
      </div>
    ) : data.length === 0 ? (
      <Typography.Title level={5}>Apida Malumot qolmadi !!!</Typography.Title>
    ) : (
      <Row>
        {data.map((f: any) => {
          const paymeCount = buyurtmaData.filter(
            (order: any) =>
              order.filialId === f.filialId && order.tolovTuri === "Payme"
          ).length;
          const somdaCount = buyurtmaData.filter(
            (order: any) =>
              order.filialId === f.filialId && order.tolovTuri === "Naqd"
          ).length;
          const TerminalCount = buyurtmaData.filter(
            (order: any) =>
              order.filialId === f.filialId && order.tolovTuri === "Terminal"
          ).length;

          const handleDelete = (id: number) => {
            Modal.confirm({
              title: "Rostan xam xisobotni ochirmoqchimisz ?",
              onOk: () => onDelete(id),
            });
          };

          return (
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
                      {
                        filialData.find((item: any) => item.id === f.filialId)
                          ?.nameUz
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
                      {paymeCount} ta
                    </Typography>
                  </div>
                  <div style={{ width: `calc(100% / 5)`, paddingLeft: 50 }}>
                    <Typography
                      css={css`
                        font-size: 14px !important;
                        font-weight: 500;
                        margin-left: -50px;
                      `}
                    >
                      {somdaCount} ta
                    </Typography>
                  </div>
                  <div style={{ width: `calc(100% / 5)`, paddingLeft: 50 }}>
                    <Typography
                      css={css`
                        font-size: 14px !important;
                        font-weight: 500;
                        margin-left: -50px;
                      `}
                    >
                      {TerminalCount} ta
                    </Typography>
                  </div>

                  <div style={{ marginTop: "-15px", paddingRight: "25px" }}>
                    <Button
                      type="text"
                      style={{
                        background: "white",
                        borderRadius: "50%",
                        padding: 18,
                        marginLeft: "10px",
                        border: "4px solid #EDEFF3",
                      }}
                      onClick={() => handleDelete(f.id)}
                      icon={<FaRegTrashAlt fontSize={17} />}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    )}
  </Content>
);
