import CanvasJSReact from "@canvasjs/react-charts";
const { CanvasJSChart } = CanvasJSReact;

const ClosedOrdersChart = ({ data }: { data: any[] }) => {
  const dataPoints = data.map((data) => ({
    x: new Date(data.date), //
    y: data.amount,
  }));

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Yopilgan zakazlar | Barcha filial",
    },
    axisX: {
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e: any) {
          return "€" + CanvasJSReact.formatNumber(e.value, "#000");
        },
      },
    },
    data: [
      {
        type: "area",
        xValueFormatString: "DD MMM",
        yValueFormatString: "€##0.00",
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div style={{ width: "48%" }}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ClosedOrdersChart;
