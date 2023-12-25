import { useUser } from "@/store/store";
import React from "react";

const Profile = () => {
  const user = useUser((state) => state.user);
  //   console.log(user);

  return (
    <div className="flex items-center gap-2">
      <p>{user?.user_metadata.role}</p>
      <img
        src={user?.user_metadata.avatar_url}
        className="rounded-full"
        width="40"
        height="40"
      />
      <h1>{user?.user_metadata.user_name}</h1>
    </div>
  );
};

export default Profile;
