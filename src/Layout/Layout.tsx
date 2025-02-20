/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { Menu, Layout as AntLayout, Typography, Button } from "antd";

// photo
import menuPhoto from "../Photos/07d88f294f383dd96f307e6436c2f55e.jpg";

// icons
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiArchive, FiLogIn } from "react-icons/fi";
import { FiLayers } from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import { LuBarChart2 } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { RiMapPinLine } from "react-icons/ri";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Sider } = AntLayout;

const pages: {
  id: number;
  name: string;
  icon: React.ReactNode;
  text: string;
  path: string;
}[] = [
  {
    id: 1,
    name: "Buyurtmalar",
    icon: <IoMdCheckmarkCircleOutline style={{ fontSize: "21px" }} />,
    text: "Buyurtmalar",
    path: "/buyurtmalar",
  },
  {
    id: 2,
    name: "Maxsulotlar",
    icon: <FiArchive style={{ fontSize: "21px" }} />,
    text: "Maxsulotlar",
    path: "/maxsulotlar",
  },
  {
    id: 3,
    name: "Kategoriyalar",
    icon: <FiLayers style={{ fontSize: "21px" }} />,
    text: "Kategoriyalar",
    path: "/kategoriyalar",
  },
  {
    id: 4,
    name: "Filiallar",
    icon: <HiOutlineMapPin style={{ fontSize: "21px" }} />,
    text: "Filiallar",
    path: "/filiallar",
  },
  {
    id: 5,
    name: "Mijozlar",
    icon: <LuUsers style={{ fontSize: "21px" }} />,
    text: "Mijozlar",
    path: "/mijozlar",
  },

  {
    id: 6,
    name: "Xisobot",
    icon: <LuBarChart2 style={{ fontSize: "21px" }} />,
    text: "Xisobot",
    path: "/Xisobotlar",
  },
  {
    id: 7,
    name: "Xodimlar",
    icon: <IoSettingsOutline style={{ fontSize: "21px" }} />,
    text: "Xodimlar",
    path: "/Xodimlar",
  },
  {
    id: 8,
    name: "Xarita",
    icon: <RiMapPinLine style={{ fontSize: "21px" }} />,
    text: "Xarita",
    path: "/Xaritalar",
  },
];

export const Layout = () => {
  const [activePage, setActivePage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPage = pages.find((page) =>
      location.pathname.includes(page.path)
    );
    if (currentPage) {
      setActivePage(currentPage.name);
    }
  }, [location]);

  const handleMenuClick = (pagePath: string, pageName: string) => {
    setActivePage(pageName);
    navigate(pagePath);
  };

  return (
    <AntLayout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => console.log(broken)}
        onCollapse={(collapsed, type) => console.log(collapsed, type)}
        theme="light"
        width={235}
      >
        <div
          className="mt-2"
          style={{
            display: "flex",
            gap: 10,
            alignItems: "start",
            padding: 10,
          }}
        >
          <div>
            <img
              src={menuPhoto}
              alt="img"
              className="rounded-full !h-[60px] !w-[60px] "
            />
          </div>
          <div>
            <Typography.Title level={4} style={{ margin: 0, marginTop: 6 }}>
              Fast Food
            </Typography.Title>
            <Typography style={{ fontSize: 12, color: "#2d3a45b2" }}>
              Online maxsulot sotuvi
            </Typography>
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activePage]}
          onClick={({ key }) => setActivePage(key)}
          style={{ marginTop: 20 }}
        >
          <div className="flex">
            <div className="bg-[#FCB600] w-[5px] h-[348px] mt-1 rounded-b-sm"></div>
            <div style={{ width: "90%", padding: 0 }}>
              {pages.map((page) => (
                <Menu.Item
                  key={page.name}
                  icon={page.icon}
                  onClick={() => handleMenuClick(page.path, page.text)}
                  style={{
                    width: "100%",
                    paddingLeft: 20,
                    marginLeft: "-0px",
                    fontSize: 17,
                    borderRadius: "0px 5px 5px 0px",
                    backgroundColor:
                      activePage === page.text ? "#FCB600" : "transparent",
                    color: activePage === page.text ? "white" : "#000",
                  }}
                >
                  {page.text}
                </Menu.Item>
              ))}
            </div>
          </div>
        </Menu>
        <div
          className="p-5"
          style={{
            display: "flex",
            justifyContent: "start",
            height: "35vh",
            alignItems: "end",
          }}
        >
          <Button
            type="text"
            className="flex items-center gap-2"
            style={{
              boxShadow: "none",
              border: "none",
              outline: "none",
            }}
            onClick={() => navigate("/")}
          >
            <FiLogIn size={20} />
            <Typography.Title level={5} className="mt-2">
              Chiqish
            </Typography.Title>
          </Button>
        </div>
      </Sider>
      <AntLayout className="overflow-y-auto scroll-smooth overscroll-contain">
        <Outlet />
      </AntLayout>
    </AntLayout>
  );
};
