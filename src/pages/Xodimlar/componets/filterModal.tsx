import { SetStateAction, useState } from "react";
import { Modal, Checkbox } from "antd";
export const FilterComponent = ({
  data,
  setFilteredData,
  handleCancel,
  isModalVisible,
}: {
  data: any[];
  //@ts-ignore
  setFilteredData: Dispatch<SetStateAction<any[]>>;
  handleCancel: () => void;
  isModalVisible: boolean;
}) => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const handleCheckboxChange = (checkedValues: string[]) => {
    setSelectedPositions(checkedValues);

    if (checkedValues.length === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        checkedValues.includes(item.lavozim)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      {/* Modal component */}
      <Modal
        title="Xodimlarni Filtrlash"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={300}
      >
        <Checkbox.Group
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
          options={[
            { label: "Operator", value: "operator" },
            { label: "Zavzal", value: "Zav zal" },
            { label: "Bosh Oshpaz", value: "Bosh Oshpaz" },
            { label: "Ofisant", value: "Ofisant" },
            { label: "Xisobchi", value: "Xisobchi" },
            { label: "Sotuvchi", value: "Sotuvchi" },
          ]}
          value={selectedPositions}
          onChange={handleCheckboxChange}
        />
      </Modal>
    </>
  );
};
