import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, updateTodo } from '../redtool/slices/crudSlice'
import CustomTable from './CustomTable'
import CustomModal from './CustomModal'

function Todos() {
    const todos = useSelector((state) => state.crud.todos)
    const dispatch = useDispatch()
    const [todoValue, setTodoValue] = useState("")
    const [editModal, setEditModal] = useState(false)
    const [updateValue, setUpdateValue] = useState("")
    const [editId, setEditId] = useState(null)
    const [filterTodo, setFilterTodo] = useState(todos)

    const tableHeadValue = [
        { id: 1, title: "ID" },
        { id: 2, title: "Task" },
        { id: 3, title: "Action" }
    ]

    // Add Todo
    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            id: todos.length ? todos[todos.length - 1].id + 1 : 1,
            title: todoValue
        }
        dispatch(addTodo(data))
        setTodoValue("")
    }

    // Update Todo
    function handleUpdateBtn(e) {
        e.preventDefault()
        setEditModal(false)
        dispatch(updateTodo({ id: editId, title: updateValue }))
    }

    // Search Todo
    function handleSearch(e) {
        const filteredInput = todos.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilterTodo(filteredInput)
    }

    useEffect(() => {
        setFilterTodo(todos)
    }, [todos])

    return (
        <>
            {/* Add Todo Form */}
            <form onSubmit={handleSubmit} autoComplete='off' className='w-[400px] mx-auto mt-8 flex gap-4 items-center'>
                <TextField
                    size='small'
                    className='w-full'
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                    variant='outlined'
                    type='text'
                    label='Add Todo'
                    InputLabelProps={{
                        style: { color: '#333' },
                    }}
                    sx={{
                        borderRadius: '12px',
                        backgroundColor: '#F7F7F7',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#ccc',
                            },
                            '&:hover fieldset': {
                                borderColor: '#4CAF50',
                            },
                        }
                    }}
                />
                <Button
                    size='medium'
                    className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-8 rounded-xl shadow-lg'
                    type='submit'
                    variant='contained'
                >
                    Add
                </Button>
            </form>

            {/* Search Todo */}
            <div className="w-[350px] mx-auto mt-5">
                <TextField
                    autoComplete='off'
                    onInput={handleSearch}
                    size='small'
                    className='w-full'
                    variant='outlined'
                    type='text'
                    label='Search'
                    sx={{
                        borderRadius: '12px',
                        backgroundColor: '#F7F7F7',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#ccc',
                            },
                            '&:hover fieldset': {
                                borderColor: '#4CAF50',
                            },
                        }
                    }}
                />
            </div>

            {/* Todo Table */}
            <div className="w-[500px] mx-auto mt-10">
                <CustomTable
                    tHead={tableHeadValue}
                    rows={filterTodo}
                    setUpdateValue={setUpdateValue}
                    setEditId={setEditId}
                    setEditModal={setEditModal}
                />
            </div>

            {/* Update Todo Modal */}
            <CustomModal open={editModal} setOpen={setEditModal}>
                <form onSubmit={handleUpdateBtn} autoComplete='off' className='flex items-center gap-4 py-4'>
                    <TextField
                        value={updateValue || ""}
                        onChange={(e) => setUpdateValue(e.target.value)}
                        variant='outlined'
                        size='small'
                        sx={{ width: "100%" }}
                        id="update-todo"
                        type='text'
                        label="Update Todo"
                        InputLabelProps={{
                            style: { color: '#333' },
                        }}
                    />
                    <Button
                        size='medium'
                        className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-8 rounded-xl shadow-lg'
                        type='submit'
                        variant='contained'
                    >
                        Update
                    </Button>
                </form>
            </CustomModal>
        </>
    )
}

export default Todos
