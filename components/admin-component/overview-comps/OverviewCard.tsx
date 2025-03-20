import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsArrowUpShort } from "react-icons/bs";

const OverviewCard = ({ data }: any) => {
  return (
    <Card className="w-full border-0 bg-brand-100 md:w-[400px] xl:w-full">
      <CardHeader className="pb-0">
        <CardTitle>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-200 text-brand-100">
            <data.icon />
          </span>
          <p className="mt-3 text-lg text-brand-200">{data?.title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 flex h-auto items-center gap-3 pb-0">
        <div className="text-2xl font-bold text-brand-200">
          {data.isPrice && <span>&euro;</span>}
          {data?.value?.toLocaleString()}
        </div>
        <div className="flex items-center font-medium text-green-800">
          <span>{data?.increaseRate}%</span>
          <span className="text-green-800">
            <BsArrowUpShort size={24} />
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-brand-200">
          Compared to ({data?.isPrice && <span>&euro;</span>}
          {data?.lastValue?.toLocaleString()} yesterday){" "}
        </p>
      </CardFooter>
    </Card>
  );
};

export default OverviewCard;
