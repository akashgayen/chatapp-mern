import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto pt-2">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <div 
          className="flex items-center space-x-2 text-white cursor-pointer hover:bg-red-700 transition-colors border border-red-500 rounded-lg p-2"
          onClick={logout}
        >
          <BiLogOut className="w-6 h-6" />
          <span>Logout</span>
        </div>
      )}
    </div>
  );
}

export default LogoutButton;
