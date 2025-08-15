import React, { PropsWithChildren } from "react";

import ProfileSidebar from "./_components/ProfileSidebar";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="content-container flex min-h-dvh pt-32 max-lg:flex-col lg:pt-24">
      <ProfileSidebar />
      {children}
    </div>
  );
};

export default ProfileLayout;
