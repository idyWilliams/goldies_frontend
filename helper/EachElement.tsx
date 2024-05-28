import { Children } from "react";

const EachElement = ({ render, of }: { render: any; of: any[] }) => {
  return Children?.toArray(
    of?.map((item: any, index: number) => render(item, index)),
  );
};

export default EachElement;
