import React from "react";
import Searchbar from "./Searchbar";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

function Sidebar() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full">
      <Searchbar />
      <div className="divider px-3"></div>
      <div className="flex-grow overflow-y-auto">
        <Conversations />
      </div>
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
