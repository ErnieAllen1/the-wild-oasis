import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashBoardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashBoardLayout />
    </>
  );
}

export default Dashboard;
