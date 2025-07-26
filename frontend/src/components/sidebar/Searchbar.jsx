import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

function Searchbar() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found with that name");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-5">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full w-full pr-10" // Added w-full and pr-10
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button 
        type="submit" 
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <IoSearchSharp className="h-5 w-5 text-gray-400" />
      </button>
    </form>
  );
}

export default Searchbar;
