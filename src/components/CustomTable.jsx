import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from '../redtool/slices/crudSlice';

export default function CustomTable({ tHead, rows, setEditModal, setUpdateValue, setEditId }) {
    const todos = useSelector((state) => state.crud.todos);
    const dispatch = useDispatch();

    function handleEditClick(id) {
        setEditModal(true);
        setEditId(id);
        const updateFind = todos.find(item => item.id === id);
        setUpdateValue(updateFind.title);
    }

    return (
        <TableContainer component={Paper} className="shadow-xl rounded-2xl overflow-hidden">
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                    <TableRow className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                        {tHead.map(item => (
                            <TableCell
                                align='center'
                                key={item.id}
                                className="font-semibold text-lg text-white"
                            >
                                {item.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="hover:bg-gray-200 transition-colors"
                        >
                            <TableCell component="th" scope="row" align='center' className="py-4">
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center' className="py-4">
                                {row.title}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                <div className="flex justify-center gap-4">
                                    <IconButton
                                        onClick={() => dispatch(deleteTodo(row.id))}
                                        size="large"
                                        color="error"
                                        aria-label="delete"
                                        sx={{
                                            borderRadius: '50%',
                                            padding: 1.5,
                                            '&:hover': { backgroundColor: '#f8d7da' }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleEditClick(row.id)}
                                        size="large"
                                        color="success"
                                        aria-label="edit"
                                        sx={{
                                            borderRadius: '50%',
                                            padding: 1.5,
                                            '&:hover': { backgroundColor: '#d4edda' }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
