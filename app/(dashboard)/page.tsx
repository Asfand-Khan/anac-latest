import StaticsOne from "@/components/dashboard/statics-one";
import StaticsThree from "@/components/dashboard/statics-three";
import StaticsTwo from "@/components/dashboard/statics-two";
import SubNav from "@/components/ui/global/SubNav";

export default function Home() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <SubNav title="Admin Dashboard" showDatePicker={true} showDataTableFilters={false} />
        <StaticsOne />
        <StaticsTwo />
        <StaticsThree />
      </div>
    </>
  );
}
