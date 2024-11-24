import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Fab,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function HomeworkDialog({ open, onClose, homeworks, setHomeworks }) {
  const [newHomework, setNewHomework] = useState({ subject: "", task: "" });

  const handleAddHomework = () => {
    if (newHomework.subject && newHomework.task) {
      setHomeworks((prev) => [...prev, { ...newHomework, id: Date.now() }]);
      setNewHomework({ subject: "", task: "" });
    }
  };

  const handleDeleteHomework = (id) => {
    setHomeworks((prev) => prev.filter((hw) => hw.id !== id));
  };

  const handleEditHomework = (id) => {
    const updatedTask = prompt("Введите новое задание:");
    if (updatedTask) {
      setHomeworks((prev) =>
        prev.map((hw) => (hw.id === id ? { ...hw, task: updatedTask } : hw))
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Домашние задания</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Предмет</TableCell>
                <TableCell>Задание</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homeworks.map((hw) => (
                <TableRow key={hw.id}>
                  <TableCell>{hw.subject}</TableCell>
                  <TableCell>{hw.task}</TableCell>
                  <TableCell>
                    <Fab
                      color="secondary"
                      size="small"
                      onClick={() => handleEditHomework(hw.id)}
                      style={{ marginRight: "10px" }}
                    >
                      <EditIcon />
                    </Fab>
                    <Fab
                      color="error"
                      size="small"
                      onClick={() => handleDeleteHomework(hw.id)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: "20px" }}>
          <TextField
            label="Предмет"
            variant="outlined"
            size="small"
            value={newHomework.subject}
            onChange={(e) =>
              setNewHomework({ ...newHomework, subject: e.target.value })
            }
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Задание"
            variant="outlined"
            size="small"
            value={newHomework.task}
            onChange={(e) =>
              setNewHomework({ ...newHomework, task: e.target.value })
            }
          />
          <Fab
            color="primary"
            size="small"
            onClick={handleAddHomework}
            style={{ marginLeft: "10px" }}
          >
            <AddIcon />
          </Fab>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HomeworkDialog;
