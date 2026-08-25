import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const {
    isLoading: isLoading1,
    bookings,
    error: bookingsError,
  } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoading2,
    numDays,
    error: staysError,
  } = useRecentStays();
  const {
    isLoading: isLoadingCabins,
    cabins,
    error: cabinsError,
  } = useCabins();

  if (isLoading1 || isLoading2 || isLoadingCabins) return <Spinner />;

  const error = bookingsError || staysError || cabinsError;
  if (error) return <p>Dashboard could not be loaded: {error.message}</p>;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
