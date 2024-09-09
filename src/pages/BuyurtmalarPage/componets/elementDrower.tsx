/** @jsxImportSource @emotion/react */

import { Drawer, Typography } from "antd";
import { BsClock } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { RxClipboard } from "react-icons/rx";
import { CiDeliveryTruck } from "react-icons/ci";
import { css } from "@emotion/react";
type MijozDrawerProps = {
  open: boolean;
  onClose: () => void;
  slecDrower: any;
  mijozData: any[];
  filialData: any[];
  products: any[];
  OrginalData: any[];
  xodimlarData: any[];
};
export const ElementsDrower: React.FC<MijozDrawerProps> = ({
  open,
  onClose,
  slecDrower,
  mijozData,
  filialData,
  products,
  OrginalData,
  xodimlarData,
}) => {
  return (
    <Drawer
      title="Element ma'lumotlari"
      placement="right"
      onClose={onClose}
      open={open}
    >
      {slecDrower && (
        <div>
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
                8549
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
                00:24
              </div>
            </div>
          </div>
          <div
            css={css`
              margin-top: 25px;
              padding: 15px;
              border-radius: 5px;
              background: #edeff3;
            `}
          >
            <div style={{ display: "flex", gap: 15 }}>
              <div>
                <FiUser size={22} style={{ marginTop: 3 }} color="grey" />
              </div>
              <Typography.Title style={{ fontSize: 19 }}>
                {
                  //@ts-ignore
                  mijozData?.find((item) => item.id === slecDrower.mijozId).name
                }{" "}
                {
                  //@ts-ignore
                  mijozData?.find((item) => item.id === slecDrower.mijozId)
                    .lastName
                }
              </Typography.Title>
            </div>
            <div style={{ marginLeft: 40, marginTop: "-7px" }}>
              <Typography.Title level={5} style={{ color: "#6f7070" }}>
                {
                  //@ts-ignore
                  mijozData?.find((item) => item.id === slecDrower.mijozId)
                    .phone
                }
              </Typography.Title>
            </div>
          </div>
          <div className="flex justify-between mt-5">
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
                    item1.id === slecDrower.filialId
                )?.name || "Nasriddin"}
              </Typography.Title>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                  color: "grey",
                  fontSize: 12,
                }}
              >
                Filial
              </div>
              <Typography.Title level={5}>
                {
                  //@ts-ignore
                  filialData.find(
                    (item1: any) => item1.id === slecDrower.filialId
                  ).nameUz
                }
              </Typography.Title>
            </div>
          </div>
          <div
            style={{
              background: "#9797973e",
              height: "2px",
              marginTop: 18,
            }}
          ></div>
          <div style={{ height: "18vh" }}>
            <div className="flex gap-32 bg-[#F9FAFB] mt-8 p-2 text-[#8D9BA8]">
              <div>Maxsulotlar</div>
              <div>Soni | Narxi</div>
            </div>
            <div className="flex justify-between p-2">
              <div>
                {products.map((product: any, index: any) => (
                  <Typography
                    key={index}
                    style={{ fontWeight: 500, fontSize: 14 }}
                  >
                    {product.name}
                  </Typography>
                ))}
              </div>
              <div>
                {products.map((product: any, index: any) => (
                  <Typography
                    key={index}
                    style={{ fontWeight: 500, fontSize: 14, marginTop: 4 }}
                  >
                    {product.counter} * {product.price} UZS
                  </Typography>
                ))}
              </div>
            </div>
          </div>
          <div
            css={css`
              margin-top: 25px;
              padding: 20px;
              border-radius: 5px;
              background: #edeff3;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              height: 15vh;
            `}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div>
                <RxClipboard size={21} style={{ marginTop: 3 }} color="grey" />
              </div>
              <Typography.Title level={5}>
                {" "}
                {
                  //@ts-ignore
                  OrginalData.find((item1: any) => item1.id === slecDrower.id)
                    ?.price
                }{" "}
                UZS
              </Typography.Title>
            </div>
            <div>
              <div style={{ display: "flex", gap: 8 }}>
                <div>
                  <CiDeliveryTruck
                    size={22}
                    style={{ marginTop: 2 }}
                    color="grey"
                  />
                </div>
                <Typography.Title level={5}>5,000 UZS</Typography.Title>
              </div>
              <div className="flex items-center justify-start gap-2 mt-2">
                <div
                  style={{
                    background: "#14E5E4",
                    borderRadius: "50%",
                    height: "10px",
                    width: "10px",
                  }}
                ></div>
                <Typography.Title
                  level={5}
                  style={{ margin: 0, fontWeight: 500 }}
                >
                  {
                    //@ts-ignore
                    OrginalData.find((i: any) => i.id === slecDrower.id)
                      ?.tolovTuri
                  }
                </Typography.Title>
              </div>
            </div>
          </div>

          <div className="flex gap-7 mt-7">
            <button
              css={css`
                display: flex;
                border-radius: 10px;
                font-weight: 600;
                justify-content: center;
                align-items: center;
                background: #20d472;
                color: white;
                height: 40px;
                width: 75px;
                padding: 0;
                box-shadow: none;
              `}
              onClick={onClose}
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
};
