import Layout from "../Layout";
import { KanbanBoard } from "../../components/KanbanBoard";
import NavBar from "../../components/Navbar";
import { KanbanDemoData } from "../../mock/data";

const Demo = () => {
  return (
    <main className="max-w-screen h-screen overflow-x-hidden">
      <NavBar />
      <Layout>
        <KanbanBoard title={"Marketing"} data={KanbanDemoData} boardId={"demo-marketing"} isDemo={true} />
      </Layout>
    </main>
  );
};

export default Demo;
