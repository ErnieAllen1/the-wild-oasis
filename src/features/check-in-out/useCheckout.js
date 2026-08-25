import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data, bookingId) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: () => toast.error("There was an error while checking out."),
  });
  return { checkout, isCheckingOut };
}
