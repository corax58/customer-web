import React, { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AddAddressModal from "./AddAddressModal";
import AddressList from "./AddressList";
import AddressListSkeleton from "./AddressListSkeleton";

const DeliveryInfo = () => {
  return (
    <Card className="p-6 py-6 shadow-none" id="delivery-info">
      <CardHeader className="px-0">
        <CardTitle className="text-lg">Delivery Address</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-7 px-0 py-0 md:grid-cols-2">
        <div className="space-y-4">
          <div className="text-muted-foreground">
            Select default address or add other Delivery location
          </div>
          <AddAddressModal />
        </div>

        <Suspense fallback={<AddressListSkeleton />}>
          <AddressList />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default DeliveryInfo;
