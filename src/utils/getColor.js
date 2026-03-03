export const getColor = (status) => {
    switch (status.toLowerCase()) {
      case "planning":
        return " bg-blue-500 ";
      case "scheduled":
        return "bg-green-500";
      case "ongoing":
        return "bg-purple-500";
      case "completed":
        return "bg-indigo-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };