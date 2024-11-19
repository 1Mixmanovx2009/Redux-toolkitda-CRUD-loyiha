import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'transparent',
  borderRadius: '15px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
  p: 0,
  background: 'linear-gradient(145deg, #6e7dff, #4f5bd5)',
  backdropFilter: 'blur(10px)',
};

export default function CustomModal({ open, setOpen, children }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="overflow-hidden">
          {/* Modal Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-white text-black rounded-t-xl shadow-md">
            <Typography variant="h6" component="h2" className="font-bold text-lg">
              Modal Title
            </Typography>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="error"
              sx={{
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                minWidth: '35px',
                padding: 0,
                '&:hover': { backgroundColor: '#ff6161' },
              }}
            >
              X
            </Button>
          </div>

          {/* Modal Content */}
          <div className="p-6 bg-white text-black rounded-b-xl">
            {children}
          </div>

          {/* Modal Footer with Action Buttons */}
          <div className="flex justify-end px-6 py-4 bg-white rounded-b-xl">
            <Button
              onClick={handleClose}
              variant="contained"
              color="success"
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                padding: '8px 24px',
                '&:hover': { backgroundColor: '#4caf50' },
              }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
