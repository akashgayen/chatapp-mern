import React from "react";
import Searchbar from "./Searchbar";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

function Sidebar() {
  return (
    <div className="border-r border-slate-500 px-4 pb-2 flex flex-col">
      <Searchbar />
      <div className="divider mb-0"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
