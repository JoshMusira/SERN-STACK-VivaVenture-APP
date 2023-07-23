import "./widgetSm.css";
import { DataGrid } from "@mui/x-data-grid";

export default function WidgetSm() {

  const data = [
    {
      id: 2,
      username: "user1",
      email: "user1@exa.com",
      tellNo: "123-456-7890",
      address: "123 Country",
    },
    {
      id: 3,
      username: "user2",
      email: "user2@ee.com",
      tellNo: "987-654-3210",
      address: "456  Country",
    },
    // Add more data as needed
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "username", headerName: "Username", width: 100 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "tellNo", headerName: "Tell NO.", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
  ];

  return (
    <div style={{ height: 300, width: "50%" }}>
      <h3 className="dashboadNmaes">New Join Members</h3>
      <DataGrid rows={data} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
