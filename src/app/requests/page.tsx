import { getAllRequestStatus } from "@/serverActions/db-request-status";
import { getAllRequests } from "@/serverActions/db-requests";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { RequestsTable } from "./RequestsTable";

export default async function RequestsPage() {
  const requests = await getAllRequests();
  const allRequestStatus = await getAllRequestStatus();

  return (
    <Box className='p-1 h-full w-full overflow-auto'>
      <RequestsTable requests={requests} statuses={allRequestStatus} />
    </Box>
  );
}
