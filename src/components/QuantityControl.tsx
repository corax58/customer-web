import React from "react";

import { Minus, Plus } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface QuantityControlProps {
  itemQuantity: number;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityControl = ({
  itemQuantity,
  setItemQuantity,
}: QuantityControlProps) => {
  return (
    <div className="flex items-center">
      <Button
        variant="secondary"
        type="button"
        onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
        className="bg-card aspect-square rounded-lg border-2"
        size={"icon"}
      >
        <Minus />
      </Button>
      <Input
        className="bg-secondary text-foreground -z-10 -ms-1 -me-4 h-8 w-14 rounded-none border-0 ps-2 text-center"
        type="number"
        min={1}
        max={10}
        value={itemQuantity}
        onChange={(e) => setItemQuantity(parseInt(e.target.value))}
      />
      <Button
        variant="secondary"
        type="button"
        onClick={() => setItemQuantity(Math.min(10, itemQuantity + 1))}
        className="bg-card aspect-square rounded-lg border-2"
        size={"icon"}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityControl;
