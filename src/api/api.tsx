import { message } from "antd";
import axios from "axios";

export const filterStatusRender = async (
  selectedStatus: string,
  setData: (data: any) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    const res = await axios.get(
      `https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar?status=${selectedStatus}`
    );
    setData(res.data);
    setLoading(false);
  } catch (error) {
    message.error("Failed to buyurtma Api.");
    setLoading(false);
  }
};
export const updateStatus = async (
  id: number,
  newStatus: string,
  filterStatusRender: () => Promise<void>
) => {
  try {
    await axios.patch(`https://46d4deb0e08aaad2.mokky.dev/Buyurtmalar/${id}`, {
      status: newStatus,
    });
    await filterStatusRender();
    message.success("Status o'zgartirildi.");
  } catch (error) {
    message.error("Statusni o'zgartirishda xatolik.");
  }
};

// Mijozlarni olish
export const mijozlarRender = async (setMijozlarData: (data: any) => void) => {
  try {
    const res = await axios.get(`https://api_endpoint/mijozlar`);
    setMijozlarData(res.data);
  } catch (error) {
    message.error("Failed to fetch mijozlar data.");
  }
};

// Filiallarni olish
export const filialRender = async (setFilialData: (data: any) => void) => {
  try {
    const res = await axios.get(`https://api_endpoint/filial`);
    setFilialData(res.data);
  } catch (error) {
    message.error("Failed to fetch filial data.");
  }
};
