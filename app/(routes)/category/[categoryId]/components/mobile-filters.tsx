"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
  colors: Color[];
  sizes: Size[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ colors, sizes }) => {
  const [isOpen, setIsOpen] = useState(false); // Whether the filters are open or not

  const toggle = () => setIsOpen(!isOpen); // Toggle the filters

  return (
    <>
      <Button onClick={toggle} className="flex items-center gap-x-2 lg:hidden">
        Filters
        <Plus size={20} />
      </Button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={toggle}
      >
        {/* Dimmed Background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        {/* Dialog Position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Inside the modal, add the "Close" button and render the filters  */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={toggle} />
            </div>
            {/* Filters */}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
