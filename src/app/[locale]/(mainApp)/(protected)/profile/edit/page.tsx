import { ArrowLeft } from "lucide-react";

import BackButton from "@/components/BackButton";

import ProfileEdit from "./_components/ProfileEdit";

const ProfileEditPage = () => {
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-5">
      <div className="flex gap-2">
        <BackButton>
          <ArrowLeft />
        </BackButton>
        <div>
          <div>
            <h2 className="text-3xl font-bold">Edit Your Profile</h2>
            <p className="text-muted-foreground mt-2">
              Make changes to your personal details and account information
              below.
            </p>
          </div>
        </div>
      </div>
      <ProfileEdit />
    </div>
  );
};

export default ProfileEditPage;
