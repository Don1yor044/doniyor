import { Flex, Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import LoginPoto from "../../Photos/7e031162571d409fd768a6460b131b3b.png";

export function LoginPage() {
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    if (values.username === "admin" && values.password === "1234") {
      navigate("/buyurtmalar");
      message.success("Xush kelibsiz admin");
    } else {
      message.error("name yoki parol xato !");
    }
  };

  return (
    <Flex style={{ padding: 0, background: "#EDEFF3", height: "100vh" }}>
      <div style={{ width: "60%", height: "100vh" }}>
        <img
          src={LoginPoto}
          style={{
            minHeight: "100vh",
            width: "100%",
            transform: "scaleX(-1) ",
          }}
          alt="photo not found"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "60%" }}>
          <div style={{ padding: 20 }}>
            <Typography.Title level={3}>
              Tizimga xush kelibsiz !
            </Typography.Title>
            <Typography style={{ color: "#8D9BA8" }}>
              Tizimga kirish uchun, login va parol orqali autentifikatsiya
              jarayonidan o’ting
            </Typography>
            <Form
              name="wrap"
              labelCol={{ flex: "110px" }}
              labelAlign="left"
              labelWrap
              wrapperCol={{ flex: 1 }}
              colon={false}
              style={{ maxWidth: 600, marginTop: 25 }}
              onFinish={onFinish}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: 10,
                  padding: 1,
                }}
              >
                <Form.Item
                  name="username"
                  style={{
                    height: "30px",
                  }}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      marginTop: 10,
                      paddingInline: 20,
                    }}
                    placeholder="Name"
                  />
                </Form.Item>
                <hr
                  style={{
                    width: "92%",
                    margin: 0,
                    marginLeft: 10,
                  }}
                />
                <Form.Item
                  name="password"
                  style={{
                    height: "30px",
                  }}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input
                    type="password"
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      marginTop: 10,
                      paddingInline: 20,
                    }}
                    placeholder="Parol"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  style={{
                    background: "#2D3A45",
                    color: "white",
                    padding: 30,
                    width: "100%",
                    marginTop: 20,
                  }}
                  htmlType="submit"
                >
                  Tizimga kirish
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Flex>
  );
}
