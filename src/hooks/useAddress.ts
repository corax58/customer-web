import { useCallback, useEffect, useState, useTransition } from "react";

import { getAddressList } from "@/actions/profile.actions";
import { useAuth } from "@/contexts/AuthContext";
import { Address } from "@/types/profile.types";

export default function useAddress() {
  const { isAuthenticated } = useAuth();

  const [addressList, setAddressList] = useState<Address[] | null>(null);
  const [noDefaultAddress, setNoDefaultAddress] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [isChecking, startChecking] = useTransition();

  const fetchLocations = useCallback(async () => {
    const { data, error } = await getAddressList();
    if (data) {
      setAddressList(data);
    }
    if (error) {
      setAddressError(error);
    }
  }, []);

  const setCurrentAddress = useCallback(() => {
    const hasNoDefaultAddress = localStorage.getItem("noDefaultAddress");
    if (hasNoDefaultAddress) {
      setNoDefaultAddress(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentAddress();
    }
  }, [setCurrentAddress, isAuthenticated]);

  useEffect(() => {
    if (!addressList) return;

    startChecking(() => {
      const backendDefault = addressList.find((item) => item.is_default == 1);
      if (!backendDefault) {
        setNoDefaultAddress(true);
        localStorage.setItem("noDefaultAddress", "true");
      }
    });
  }, [addressList]);

  return {
    addressList,
    fetchLocations,
    addressError,
    isChecking,
    noDefaultAddress,
    setNoDefaultAddress,
  };
}
