/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  Segmented,
  Select,
  Space,
  TimePicker,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import moment from "moment";
import { BiTrash } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { RxMinus } from "react-icons/rx";

type Product = {
  id: number;
  name: string;
  price: number;
  photo: string;
  qoshimcha?: string;
};

type Mijoz = {
  id: number;
  name: string;
};

type Filial = {
  id: number;
  nameUz: string;
};

type AddDrawersProps = {
  AddClose: () => void;
  addOpen: boolean;
  selectedMaxsulotlar: any[] | number;
  categoriesData: Record<string, any>;
  setSelectedMaxsulotlar: (value: number) => void;
  loading: boolean;
  filterMaxsulotlarData: Product[];
  buttonGroups: { [key: string]: number };
  handleChange: (id: string, amount: number) => void;
  handleAddClick: (id: string) => void;
  deleteChek: () => void;
  maxsulotlarData: Product[];
  calculateTotal: () => number;
  form: any;
  handleSave: (value: any) => void;
  mijozData: Mijoz[];
  filialData: Filial[];
};

export const AddDrowers: React.FC<AddDrawersProps> = ({
  AddClose,
  addOpen,
  categoriesData,
  selectedMaxsulotlar,
  setSelectedMaxsulotlar,
  loading,
  filterMaxsulotlarData,
  buttonGroups,
  handleChange,
  handleAddClick,
  deleteChek,
  maxsulotlarData,
  calculateTotal,
  form,
  handleSave,
  mijozData,
  filialData,
}) => {
  console.log(categoriesData);

  return (
    <Drawer width={1115} onClose={AddClose} open={addOpen}>
      <div className="flex gap-10">
        <div style={{ width: "60%" }}>
          <div>
            <Typography.Title level={4}>
              Yangi buyurtmalar qo'shish
            </Typography.Title>
            <Segmented
              size="large"
              style={{
                padding: "5px 20px",
                borderRadius: 50,
                width: "100%",
              }}
              css={css`
                .ant-segmented-item {
                  border-radius: 15px 15px 15px 15px !important;
                }
              `}
              value={selectedMaxsulotlar}
              options={categoriesData.map((item: any) => ({
                label: item.nameUz,
                value: item.id,
              }))}
              block
              onChange={(value) => setSelectedMaxsulotlar(Number(value))}
            />
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div
                className="flex gap-10 flex-wrap py-5 "
                style={{ overflow: "hidden" }}
              >
                {filterMaxsulotlarData.map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      height: "29vh",
                      width: "45%",
                      borderRadius: "4px",
                    }}
                    css={css`
                      -webkit-box-shadow: -1px 14px 19px -11px rgba(34, 60, 80, 0.2);
                      -moz-box-shadow: -1px 14px 19px -11px rgba(34, 60, 80, 0.2);
                      box-shadow: -1px 14px 19px -11px rgba(34, 60, 80, 0.2);
                    `}
                  >
                    <Image
                      src={item.photo}
                      style={{
                        borderRadius: "10px 10px 0px 0px ",
                        width: "400px",
                        height: "110px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ padding: "0px 10px" }}>
                      <Typography style={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                      <Typography>{item.qoshimcha}</Typography>
                      <div className="flex justify-between mt-2">
                        <div className="flex gap-1 items-center">
                          <Typography style={{ fontWeight: 500, fontSize: 18 }}>
                            {item.price}
                          </Typography>
                          UZS
                        </div>
                        <div>
                          {buttonGroups[item.id] === 0 ||
                          !buttonGroups[item.id] ? (
                            <Button
                              type="primary"
                              style={{ background: "#20D472", padding: 10 }}
                              onClick={() => handleAddClick(item.id)}
                            >
                              <GoPlus fontSize={18} />
                              Qo'shish
                            </Button>
                          ) : (
                            <div
                              style={{
                                border: "1px solid #949494",
                                borderRadius: "5px",
                                padding: 0,
                              }}
                            >
                              <Space style={{ padding: "0px", height: "25px" }}>
                                <Button
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    padding: 0,
                                    height: 15,
                                    margin: 5,
                                  }}
                                  onClick={() => handleChange(item.id, -1)}
                                >
                                  <RxMinus fontSize={15} />
                                </Button>
                                <span style={{ fontSize: 17, fontWeight: 600 }}>
                                  {buttonGroups[item.id]}
                                </span>
                                <Button
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    padding: 0,
                                    height: 15,
                                    margin: 5,
                                  }}
                                  onClick={() => handleChange(item.id, 1)}
                                >
                                  <GoPlus fontSize={15} />
                                </Button>
                              </Space>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ width: "34%" }}>
          <div className="flex justify-between">
            <Typography.Title level={4}>Buyurtmalar ro'yxati</Typography.Title>
            <button
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                background: #edeff3;
                border-radius: 50%;
                height: 30px;
                width: 30px;
                padding: 0;
                box-shadow: none;
              `}
            >
              <BiTrash size={20} color="grey" onClick={deleteChek} />
            </button>
          </div>

          {/* cheak  */}
          <div
            style={{
              border: "1px solid #9a9a9a2c",
              padding: "10px 15px",
              borderRadius: 5,
            }}
          >
            <div>
              {maxsulotlarData.map(
                (item: any) =>
                  buttonGroups[item.id] > 0 && (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <Typography.Title
                        level={5}
                        style={{ fontWeight: 500, margin: 0 }}
                      >
                        {item.name}
                      </Typography.Title>

                      <Typography.Title
                        level={5}
                        style={{ fontWeight: 500, marginTop: 5 }}
                      >
                        {buttonGroups[item.id]} x {item.price} UZS
                      </Typography.Title>
                    </div>
                  )
              )}
            </div>

            <div
              style={{
                background: "#EDEFF3",
                padding: "0px 15px",
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <Typography.Title level={5} style={{ margin: 0 }}>
                Umumiy summa
              </Typography.Title>
              <Typography.Title level={5} style={{ fontWeight: 700 }}>
                {calculateTotal().toLocaleString()},000 UZS
              </Typography.Title>
            </div>
          </div>
          <Form
            form={form}
            onFinish={handleSave}
            layout="vertical"
            hideRequiredMark
          >
            <div style={{ maxWidth: "100%", margin: "auto", marginTop: 5 }}>
              <div className="flex gap-2">
                <Form.Item
                  name="mijoz"
                  label="Mijoz ismi"
                  rules={[{ required: true, message: "Mijoz ismini tanlang!" }]}
                  style={{ marginBottom: 10, width: "100%" }}
                >
                  <Select
                    placeholder="Mijozlar isimlari"
                    style={{ width: "100%", fontWeight: 600 }}
                    size="middle"
                  >
                    {mijozData
                      .filter((item: any) => item.status === "Activ")
                      .map((item: any) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="filial"
                  label="Filial Nomi"
                  rules={[
                    { required: true, message: "Filial nomini tanlang!" },
                  ]}
                  style={{ marginBottom: 10, width: "100% " }}
                >
                  <Select
                    placeholder="Filiallar"
                    style={{ width: "100%", fontWeight: 600 }}
                    size="middle"
                  >
                    {filialData.map((item: any) => (
                      <Option key={item.id} value={item.id}>
                        {item.nameUz}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="flex gap-2">
                <Form.Item
                  name="tolovTuri"
                  label="To'lov turi"
                  rules={[
                    { required: true, message: "To'lov turini tanlang!" },
                  ]}
                  style={{ marginBottom: 10, width: "100% " }}
                >
                  <Select
                    placeholder="To'lov turi"
                    style={{ width: "100%", fontWeight: 600 }}
                    size="middle"
                  >
                    <Option value="Naqd">Naqd</Option>
                    <Option value="Payme">Payme</Option>
                    <Option value="Terminal">Terminal</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="zakazVaqti"
                  label="Zakaz vaqti"
                  style={{ marginBottom: 10, width: "100%" }}
                >
                  <TimePicker
                    //@ts-ignore
                    defaultValue={moment()}
                    disabled
                    format="HH:mm"
                    style={{ width: "100%", fontWeight: 600 }}
                    size="middle"
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="address"
                label="Manzil"
                style={{ marginBottom: 10 }}
              >
                <Input type="text" placeholder="Abu daby kochasi 42A" />
              </Form.Item>
              <div>
                <iframe
                  width="100%"
                  height="150"
                  style={{ borderRadius: 15 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2511.604305474078!2d69.22900996647314!3d41.32532870196679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bb7a0ebbae3%3A0xf9e01b5d45fc68cd!2sPDP%20Academy!5e0!3m2!1sru!2s!4v1717676235070!5m2!1sru!2s"
                ></iframe>
              </div>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginTop: 20,
                    backgroundColor: "#20D472",
                    color: "white",
                    width: "100px",
                  }}
                >
                  Saqlash
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Drawer>
  );
};
