import { Button, Input, message, Typography, Segmented } from "antd";
import { Header } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
// icons
import { CiSearch } from "react-icons/ci";
import { FiRefreshCcw } from "react-icons/fi";
import { PiBoxArrowDown, PiBoxArrowDownFill } from "react-icons/pi";
import { RiPieChartFill, RiPieChartLine } from "react-icons/ri";
import styled from "@emotion/styled";
import { ListTableContent, TableHeader } from "./componets/lists";
import { OrdersChartByDate } from "./componets/charts/charts";

export function Xisobotlar() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filialData, setFilialData] = useState<any[]>([]);
  const [buyurtmaData, setBuyurtmaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState("Charts");

  useEffect(() => {
    XisobotRender();
    FilialRender();
    BuyurtmalarRender();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (searchText) {
      const searchResult = data.filter((item: any) => {
        const filialName =
          filialData
            .find((filial: any) => filial.id === item.filialId)
            ?.nameUz?.toLowerCase() || "";
        return filialName.includes(searchText.toLowerCase());
      });
      setFilteredData(searchResult);
    } else {
      setFilteredData(data);
    }
  }, [searchText, data, filialData]);

  const XisobotRender = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Xisobot"
      );
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch data.");
      setLoading(false);
    }
  };

  const FilialRender = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Filiallar"
      );
      setFilialData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch filial data.");
      setLoading(false);
    }
  };

  const BuyurtmalarRender = async () => {
    try {
      const response = await axios.get(
        "https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar"
      );
      setBuyurtmaData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch buyurtma data.");
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setActive(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://46d4deb0e08aaad2.mokky.dev/Xisobot/${id}`);
      const updatedData = data.filter((item: any) => item.id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
      message.success("Xisobot o'childi");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

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
                padding: 1,
                borderRadius: "50%",
                background: "#20D472",
                height: 35,
                width: 35,
              }}
              onClick={() => message.success("Ma'lumot yangilandi")}
            >
              <FiRefreshCcw
                style={{ fontSize: 16, marginLeft: 1, color: "#ffffff" }}
              />
            </Button>
          </div>
          <div>
            <Typography style={{ fontSize: 13, fontWeight: 600 }}>
              Ma’lumotlarni <br />
              yangilash
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
            {active == "Charts" ? (
              <Input
                disabled
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
            ) : (
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
            )}

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
            style={{
              borderRadius: "30px",
              padding: "5px 15px",
              display: "flex",
              justifyItems: "center",
            }}
            options={[
              {
                value: "Charts",
                icon:
                  active === "Charts" ? (
                    <RiPieChartFill
                      style={{
                        marginTop: 10,
                        fontSize: 16,
                        color: active === "Charts" ? "inherit" : "#888888",
                      }}
                    />
                  ) : (
                    <RiPieChartLine
                      style={{
                        fontSize: 16,
                        marginTop: 10,
                        color: active === "Charts" ? "inherit" : "#888888",
                      }}
                    />
                  ),
              },
              {
                value: "Lists",
                icon:
                  active === "Lists" ? (
                    <PiBoxArrowDownFill
                      style={{
                        fontSize: 16,
                        marginTop: 10,
                        color: active === "Lists" ? "inherit" : "#888888",
                      }}
                    />
                  ) : (
                    <PiBoxArrowDown
                      style={{
                        fontSize: 16,
                        marginTop: 10,
                        color: active === "Lists" ? "inherit" : "#888888",
                      }}
                    />
                  ),
              },
            ]}
            value={active}
            onChange={handleChange}
          />
        </div>
      </Header>
      {active === "Charts" ? (
        <OrdersChartByDate loading={loading} />
      ) : (
        <>
          <TableHeader />
          <ListTableContent
            data={filteredData}
            loading={loading}
            filialData={filialData}
            buyurtmaData={buyurtmaData}
            onDelete={handleDelete}
          />
        </>
      )}
    </StyledSegmentOption>
  );
}

const StyledSegmentOption = styled("div")`
  .ant-segmented-item {
    border-radius: 50% !important;
    height: 35px;
    width: 35px;
    transition: all 0.3s ease;
  }
  .ant-segmented-item:hover,
  .ant-segmented-item:focus {
    border-radius: 50% !important;
    height: 35px;
    width: 35px;
  }
`;
