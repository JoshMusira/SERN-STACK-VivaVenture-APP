import { useContext, useEffect, useState } from "react";
import "./widgetSm.css";
import { DataGrid } from "@mui/x-data-grid";
import { Context } from "../../../context/userContext/Context";
import axios from "axios";
import { apiDomain } from "../../../utils/utilsDomain";
import { CirclesWithBar } from 'react-loader-spinner';

export default function WidgetSm() {

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { user } = useContext(Context);
  const [id, setId] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiDomain}/user`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });

      const rowsWithId = response.data.map((row) => ({
        id: row.user_id,
        username: row.username,
        email: row.email,
        date: row.date,
      }));

      setRows(rowsWithId);
      setIsLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "username", headerName: "Username", width: 100 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
  ];

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <CirclesWithBar
            height="100"
            width="100"
            color="teal"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor="gray"
            barColor="gray"
            ariaLabel='circles-with-bar-loading'
          />
        </div>
      ) : (
        <div style={{ height: 300, width: "50%" }}>
          <h3 className="dashboadNmaes">New Join Members</h3>
          <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
      )}
    </>
  );
}
