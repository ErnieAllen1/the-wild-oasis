import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: async (data, variables) => {
      toast.success(`Booking #${data.id} successfully checked in`);

      queryClient.setQueryData(["booking", variables.bookingId], data);
      queryClient.setQueriesData({ queryKey: ["stays"] }, (stays) =>
        stays?.map((stay) =>
          stay.id === data.id ? { ...stay, ...data } : stay,
        ),
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["booking", variables.bookingId],
        }),
        queryClient.refetchQueries({ queryKey: ["stays"], type: "all" }),
        queryClient.invalidateQueries({ queryKey: ["today-activity"] }),
        queryClient.invalidateQueries({ queryKey: ["bookings"] }),
      ]);
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in."),
  });
  return { checkin, isCheckingIn };
}
