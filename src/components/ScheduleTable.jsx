import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Pagination,
  CircularProgress,
} from "@mui/material";
import "../styles/ScheduleTable.css";

function ScheduleTable() {
  const [schedule, setSchedule] = useState([]);
  const [filters, setFilters] = useState({ subject: "", teacher: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    fetch("/data/schedule.json")
      .then((response) => response.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((err) => console.error("Ошибка загрузки данных:", err));
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredSchedule = schedule.filter((row) =>
    Object.keys(filters).every(
      (key) =>
        filters[key] === "" ||
        row[key]?.toLowerCase().includes(filters[key].toLowerCase())
    )
  );

  const paginatedSchedule = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="schedule-table-container">
      <div className="filters">
        <TextField
          label="Фильтр по предмету"
          variant="outlined"
          size="small"
          name="subject"
          value={filters.subject}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Фильтр по преподавателю"
          variant="outlined"
          size="small"
          name="teacher"
          value={filters.teacher}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Фильтр по дате"
          variant="outlined"
          size="small"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <Button variant="outlined" color="secondary">
          Сбросить фильтры
        </Button>
      </div>
  
      {loading ? (
        <CircularProgress style={{ margin: "20px auto", display: "block" }} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Предмет</TableCell>
                <TableCell>Преподаватель</TableCell>
                <TableCell>Аудитория</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSchedule.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.teacher}</TableCell>
                  <TableCell>{row.room}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
  
      <Pagination
        count={Math.ceil(filteredSchedule.length / rowsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        className="pagination"
      />
    </div>
  );
}

export default ScheduleTable;
