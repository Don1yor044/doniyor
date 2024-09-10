import { Column } from "@ant-design/plots";
import axios from "axios";
import { useEffect, useState } from "react";

interface Order {
  tolovTuri: string;
}

export const DemoSunburst = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Order[]>(
          "https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar"
        );

        const orders = response.data;
        const countByPaymentType: { [key: string]: number } = {};

        orders.forEach((order) => {
          const paymentType = order.tolovTuri;

          if (!countByPaymentType[paymentType]) {
            countByPaymentType[paymentType] = 0;
          }
          countByPaymentType[paymentType] += 1;
        });

        const transformedData = Object.keys(countByPaymentType).map((type) => ({
          type,
          value: countByPaymentType[type],
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchData();
  }, []);

  const config = {
    data,
    xField: "type",
    yField: "value",
    colorField: "type",
    axis: {
      x: {
        size: 40,
        labelFormatter: (datum: any) => {
          return datum;
        },
      },
    },
    color: (datum: any) => {
      const colors: { [key: string]: string } = {
        Payme: "#14E5E4",
        Naqd: "#093",
        Terminal: "#FCB600",
      };
      return colors[datum.type] || "#000000";
    },
  };

  return <Column {...config} />;
};
