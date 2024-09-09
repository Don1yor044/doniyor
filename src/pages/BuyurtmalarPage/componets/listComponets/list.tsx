/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Typography, Button } from "antd";
import { FiUser, FiPhone } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";
import { RxClipboard } from "react-icons/rx";
import { CiDeliveryTruck } from "react-icons/ci";
import { CgClose } from "react-icons/cg";
import { LuCheck } from "react-icons/lu";
import { BsClock } from "react-icons/bs";
const CardStyle = css`
  padding: 25px 25px;
  width: 100%;
  border-radius: 8px 8px 8px 8px;
  background-color: white;
  height: 26vh;
`;

interface Listtype {
  item: any;
  mijozData: any[];
  xodimlarData: any[];
  filialData: any[];
  changeStatus: (id: number, status: "next" | "previous" | "otkaz") => void;
  showDrawer: (id: number) => void;
}

export const Listcomponet: React.FC<Listtype> = ({
  item,
  mijozData,
  xodimlarData,
  filialData,
  changeStatus,
  showDrawer,
}) => {
  const mijoz = mijozData.find((mijoz) => mijoz.id === item.mijozId);
  const filial = filialData.find((filial) => filial.id === item.filialId);
  const operator = xodimlarData.find(
    (xodim) => xodim.lavozim === "operator" && xodim.id === item.filialId
  );

  return (
    <div
      key={item.id}
      css={css`
        display: flex;
        width: 100%;
        gap: 3px;
        margin-bottom: 15px;
        cursor: pointer;
      `}
      onClick={() => showDrawer(item.id)}
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
                {item.id}
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
                <BsClock size={20} color="grey" />
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: "#3b4650",
                  }}
                >
                  {item.zakazVaqti}
                </div>
              </div>
            </div>
            <Button
              style={{
                padding: "20px 10px ",
                borderRadius: "50%",
                background: "#EDEFF3",
                border: "none",
                outline: "none",
              }}
            >
              <BiBookmark style={{ fontSize: 20, color: "#4e5458b0" }} />
            </Button>
          </div>
        </div>
      </div>
      <div css={CardStyle}>
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
            <FiUser size={22} style={{ marginTop: 5 }} color="grey" />
            <Typography.Title level={4}>
              {mijoz?.name} <br />
              {mijoz?.lastName}
            </Typography.Title>
          </div>
          <div style={{ display: "flex", marginTop: 20, gap: 15 }}>
            <FiPhone size={20} color="grey" />
            <Typography.Title level={5}>{mijoz?.phone}</Typography.Title>
          </div>
        </div>
      </div>
      <div css={CardStyle}>
        <div style={{ display: "flex", gap: 35 }}>
          <div>
            <div className="flex gap-2">
              <RxClipboard size={20} color="grey" />
              <div style={{ fontWeight: 500 }}>{item.price} UZS</div>
            </div>
            <div className="flex gap-2 mt-3">
              <CiDeliveryTruck size={23} color="grey" />
              <div style={{ fontWeight: 500 }}>5,000 UZS</div>
            </div>
            <div className="mt-5" style={{ color: "grey" }}>
              Umumiy summa
            </div>
            <div className="flex">
              <Typography.Title level={4} style={{ fontWeight: 700 }}>
                {(parseInt(item.price) + 5).toLocaleString("UZ-uz")},000
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
          <div className="flex items-start gap-2">
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
                {item.tolovTuri}
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
          <div style={{ fontWeight: 500, color: "grey", fontSize: 12 }}>
            Operator
          </div>
          <Typography.Title level={5}>
            {operator?.name || "Nasriddin"}
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
            {filial?.nameUz}
          </Typography.Title>
          {/* Status Change Buttons */}
          <div
            css={css`
              position: relative;
              top: -120px;
              right: -227px;
            `}
          >
            {item.status === "Yangi" ? (
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
                  event.stopPropagation();
                  changeStatus(item.id, "previous");
                }}
              >
                <CgClose size={24} />
              </button>
            )}
            {item.status === "Yopilgan" ? (
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
    </div>
  );
};
