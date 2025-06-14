import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Sidebar />
      <div className=" w-[calc(100%_-_240px)] relative min-h-[100vh] left-60">
        <Header />
        {children}
      </div>
    </>
  );
}
