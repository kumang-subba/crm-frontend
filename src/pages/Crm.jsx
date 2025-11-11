import { Navigate } from "react-router";
import { KanbanBoard } from "../components/KanbanBoard";
import NavBar from "../components/Navbar";
import { useAuthContext } from "../providers/AuthProvider";
import Layout from "./Layout";
import axiosInstance from "../lib/axiosInstance";
import { useEffect, useState } from "react";
import AddBoard from "../components/AddBoard";
import { useNotificationContext } from "../providers/NotificationProvider";

const Crm = () => {
  const { user } = useAuthContext();
  const { addNotification } = useNotificationContext();
  const [boardsData, setBoardsData] = useState([]);
  const fetchData = async () => {
    const { data } = await axiosInstance.get("/board");
    setBoardsData(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addBoard = async (payload) => {
    try {
      const { data } = await axiosInstance.post("/board/create", payload);
      console.log(data.data);
      addNotification("Board added successfully", "success");
    } catch (error) {
      console.error(error);
      addNotification("Could not add Board at this moment. Please try again", "error");
    }
  };

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <main className="max-w-screen h-screen overflow-x-hidden">
      <NavBar />
      <Layout>
        <AddBoard addBoard={addBoard} />
        {boardsData.length > 0 &&
          boardsData.map((bd) => <KanbanBoard key={bd.id} title={bd.name} data={bd.columns} boardId={bd.id} />)}
      </Layout>
    </main>
  );
};
export default Crm;
