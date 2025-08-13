"use client";
import { Edit } from "lucide-react";

import CustomLink from "@/components/CustomLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

import PersonalInfoSkeleton from "./PersonalInfoSkeleton";

const gender = ["male", "female", "other"];
const PersonalInfo = () => {
  const { user } = useAuth();

  if (user)
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">My Profile </h2>
          <p className="text-muted-foreground mt-2">
            Manage your personal details and preferences.
          </p>
        </div>
        <div className="space-y-6">
          <Card className="p-0 shadow-none">
            <CardContent className="flex items-center justify-between px-6 py-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.profile_file} />
                <AvatarFallback className="text-lg">
                  {user.first_name[0] + user.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="lg" asChild>
                <CustomLink href={"/profile/edit"}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </CustomLink>
              </Button>
            </CardContent>
          </Card>
          <Card className="p-6 py-6 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-lg">Profile Information.</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-7 px-0 py-0 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">First Name</p>
                <p className="font-medium">{user.first_name || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Last Name</p>
                <p className="font-medium">{user.last_name || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Gender</p>
                <p className="font-medium">{gender[user.gender] || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Date of Birth</p>
                <p className="font-medium">{user.date_of_birth || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="font-medium">{user.email || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Phone Number</p>
                <p className="font-medium">
                  {user.contact_no
                    ? `${user.country_code}${user.contact_no}`
                    : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  return <PersonalInfoSkeleton />;
};

export default PersonalInfo;
