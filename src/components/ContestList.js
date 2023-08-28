import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell , {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import moment from 'moment/moment';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  

const ContestList = ({filteredData}) => {
    // console.log(filteredData);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function createData(name , start_time , end_time , duration , site) {
        return { name , start_time , end_time , duration , site };
    }

    const rows = filteredData.map((contest)=>{
        return createData(contest.name , contest.start_time , contest.end_time , contest.duration , contest.site);
    })
    // console.log(rows);

    const utcTimestamp = (val) => new Date(val);

    // Convert to IST (UTC+5:30)
    const istTimestamp = new Date(utcTimestamp().getTime() + (5.5 * 60 * 60 * 1000));

    // Months array for formatting
    const months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
    ];

    const time = (val) => {
        return (val.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
            }))
    }
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    return (!filteredData) ? <div className="flex justify-center items-center"><Loader/></div>  : (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table ">
            <TableHead> 
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Start-Time</StyledTableCell>
                    <StyledTableCell align="right">End-Time</StyledTableCell>
                    <StyledTableCell align="right">Duration</StyledTableCell>
                    <StyledTableCell align="right">Site</StyledTableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row) => (
                    <>
                    {console.log(row)} 
                    <TableRow key={row.name} className='overscroll-auto'>
                    <TableCell style={{ width: "fit-content" }} component="th" scope="row">
                    <button className='flex justify-center items-center gap-4'>
                        <a className='rounded-md bg-cyan-500 shadow-lg shadow-cyan-500/50 flex justify-center items-center font-md p-2 hover:bg-cyan-700 text-white duration-300' href={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${row.start_time.replace(/[-:.]/g, '')}/${row.end_time.replace(/[-:.]/g, '')}&text=${row.name}&location=${row.url}`}>
                                reminder
                        </a>
                        {row.name}
                    </button>
                    </TableCell>
                    <TableCell style={{ width: "fit-content" }} align="right">
                        {/* {utcTimestamp(row.start_time)} */}
                        {`${new Date(new Date(row.start_time).getTime() + (5.5 * 60 * 60 * 1000)).getDate()} ${months[new Date(new Date(row.start_time).getTime() + (5.5 * 60 * 60 * 1000)).getMonth()]} ${new Date(new Date(row.start_time).getTime() + (5.5 * 60 * 60 * 1000)).getFullYear()}`}
                        <br/>
                        {`${new Date(new Date(row.start_time).getTime() + (5.5 * 60 * 60 * 1000)).getHours()}:${new Date(new Date(row.start_time).getTime() + (5.5 * 60 * 60 * 1000)).getMinutes()}:${new Date(new Date(row.start_time).getTime() + (5.5 * 60 * 60 * 1000)).getSeconds()}`}
                    </TableCell>
                    <TableCell style={{ width: "fit-content" }} align="right">
                    {`${new Date(new Date(row.end_time).getTime() + (5.5 * 60 * 60 * 1000)).getDate()} ${months[new Date(new Date(row.end_time).getTime() + (5.5 * 60 * 60 * 1000)).getMonth()]} ${new Date(new Date(row.end_time).getTime() + (5.5 * 60 * 60 * 1000)).getFullYear()}`}
                        <br/>
                        {`${new Date(new Date(row.end_time).getTime() + (5.5 * 60 * 60 * 1000)).getHours()}:${new Date(new Date(row.end_time).getTime() + (5.5 * 60 * 60 * 1000)).getMinutes()}:${new Date(new Date(row.end_time).getTime() + (5.5 * 60 * 60 * 1000)).getSeconds()}`}
                    </TableCell>
                    <TableCell style={{ width: "fit-content" }} align="right">
                        {(row.duration/3600).toFixed(1)} hours
                    </TableCell>
                    <TableCell style={{ width: "fit-content" }} align="right">
                        {row.site}
                    </TableCell>
                    </TableRow>
                    </>
                ))}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={4}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                        'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default ContestList;