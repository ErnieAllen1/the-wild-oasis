import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const pageParam = searchParams.get("page");
  const parsedPage = pageParam ? parseInt(pageParam, 10) : NaN;
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  //QUERY
  const {
    isLoading,
    data: result = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  const bookings = result?.data ?? [];
  const count = result?.count ?? 0;

  //PRE FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (currentPage < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
    });

  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
    });

  return { isLoading, bookings, error, count };
}
