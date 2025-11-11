import { Link } from "react-router";
import Layout from "./Layout";
import StyledLink from "../components/StyledLink";
import { useAuthContext } from "../providers/AuthProvider";
import NavBar from "../components/Navbar";

const Home = () => {
  const { user } = useAuthContext();
  return (
    <main className="bg-white max-w-screen h-screen overflow-hidden">
      <NavBar />
      <Layout>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              Manage Your Leads, Effortlessly{" "}
              {!user && (
                <Link to={"/register"} className="font-semibold text-indigo-600">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Register <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              Data to enrich your online business
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Track prospects, automate follow-ups, and close more deals — all in one simple dashboard.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <StyledLink to={user ? "/crm" : "/demo"} className={"text-white "}>
                {user ? "Get started" : " Demo"}
              </StyledLink>
              {!user && (
                <Link to={"/login"} className="text-sm/6 font-semibold">
                  Login <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Home;
