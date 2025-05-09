const StatusColumn = ({ status }: { status: string }) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return (
        <span className="bg-green-700 px-2 py-1 text-sm text-white lg:bg-transparent lg:text-base lg:text-green-700 capitalize">
          {status}
        </span>
      );
    case "cancelled":
      return (
        <span className="bg-red-600 px-2 py-1 text-sm text-white lg:bg-transparent lg:text-base lg:text-red-600 capitalize">
         {status}
        </span>
      );
    case "pending":
      return (
        <span className="bg-orange-500 px-2 py-1 text-sm text-white lg:bg-transparent lg:text-base lg:text-orange-400 capitalize">
         {status}
        </span>
      );
    default:
      return;
  }
};

export default StatusColumn;
