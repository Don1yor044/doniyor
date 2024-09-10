import { Area } from "@ant-design/plots";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Typography } from "antd";
import { DemoSunburst } from "./priceCharts/price";

export const OrdersChartByDate = ({ loading }: { loading: boolean }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar"
        );

        const orders = response.data;

        const orderCountByDate: { [key: string]: number } = {};

        orders.forEach((order: any) => {
          const orderDate = new Date(order.zakazSanasi)
            .toISOString()
            .split("T")[0];

          if (orderCountByDate[orderDate]) {
            orderCountByDate[orderDate] += 1;
          } else {
            orderCountByDate[orderDate] = 1;
          }
        });

        const formattedData = Object.keys(orderCountByDate).map((date) => ({
          date,
          zakaz: orderCountByDate[date],
        }));
        console.log("Formatted Data:", formattedData);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchData();
  }, []);

  const config = {
    data,
    xField: "date",
    yField: "zakaz",
    smooth: true,
    height: 450,
    xAxis: {
      type: "timeCat",
      tickCount: 5,
      label: {
        style: {
          fill: "#8c8c8c",
          fontSize: 12,
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v: number) => `${v} ta`,
        style: {
          fill: "#8c8c8c",
          fontSize: 12,
        },
      },
    },
    areaStyle: {
      fill: "l(270) 0:rgba(255, 255, 255, 0.2) 1:rgba(0,123,255,0.6)",
    },
    line: {
      color: "#1eff00",
      size: 2,
    },

    state: {
      active: {
        style: {
          shadowColor: "rgba(0,0,0,0.4)",
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
  };

  return (
    <>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 15 }}
        >
          <Spin size="default" />
        </div>
      ) : data.length === 0 ? (
        <Typography.Title level={5}>Apidan malumot kelmadi</Typography.Title>
      ) : (
        <div
          className="flex gap-5 items-center"
          style={{ width: "100%", padding: 20 }}
        >
          <div
            className="bg-white rounded-xl p-4 shadow-lg"
            style={{ width: "49%", height: 500 }}
          >
            <Typography.Title level={5} className="flex justify-center">
              Buyurtmalar Sanalari boyicha Xisobot
            </Typography.Title>
            <Area {...config} />
          </div>
          <div
            className="bg-white rounded-xl p-4 shadow-lg"
            style={{ width: "49%", height: 500 }}
          >
            <Typography.Title level={5} className="flex justify-center">
              Buyurtmalardan Tolov Turlari boyicha Xisobot
            </Typography.Title>
            <div>
              <DemoSunburst />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
