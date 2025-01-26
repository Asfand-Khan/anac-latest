import DataTableFilters from "@/components/data-table/data-table-filters";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface SubNavProps {
    title: string;
    showDatePicker: boolean;
    showDataTableFilters: boolean;
}

const SubNav: React.FC<SubNavProps> = ({ title, showDatePicker, showDataTableFilters }) => {
    return (
        <div className="flex md:flex-row flex-col gap-2 md:justify-between md:items-center">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="flex md:flex-row flex-col gap-4">
                {showDataTableFilters && <DataTableFilters />}
                {showDatePicker && <DateRangePicker />}
            </div>
        </div>
    )
}

export default SubNav