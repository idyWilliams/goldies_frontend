export function getOrderColor(status: string) {
  switch (status?.toLowerCase()) {
    case "pending":
      return "text-orange-500";
    case "completed":
      return "text-green-500";
    case "cancelled":
      return "text-red-600";
    default:
      return "";
  }
}
