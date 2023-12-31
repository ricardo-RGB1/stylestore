"use client";
import Button from "@/components/ui/button";
import { Color, Size } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey); // Get the selected value from the query string

  /**
   * Handles the click event for a filter option.
   * Updates the query string parameters based on the selected filter.
   * Navigates to the new URL using the router.
   *
   * @param id - The ID of the selected filter option.
   */
  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString()); // Parse the query string

    // Create a new query object
    const query = { 
      ...current,
      [valueKey]: id, // Set the value of the selected filter
    };

    // Check if the selected filter is already selected in the query string 
    // If it is, set the value to null to remove it from the query string
    if (current[valueKey] === id) {
      query[valueKey] = null; 
    }

    // Stringify the query object to create a new URL 
    const url = qs.stringifyUrl( 
      {
        url: window.location.href,
        query,
      },
      { skipNull: true } // Skip null values
    ); 

    // Navigate to the new URL
    router.push(url); 
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {/* Map over the filter options */}
        {data.map((filter) => (
          <div key={filter.id} className="flex item-center">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
