import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide,Zoom,Flip } from "react-toastify";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export const toastWarnNotify = (msg) => {
  toast.warn(msg, {
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { backgroundColor: "#CE987F70", color: "black" },
    icon: <WarningIcon sx={{color:"brown"}} />,
    position: "bottom-right",
    transition: Slide,
    progressStyle: {
      background: "brown" 
    }
  });
};

export const toastSuccessNotify = (msg) => {
  toast.success(msg, {
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { backgroundColor: "#CE987F70", color: "black" },
    icon: <CheckCircleOutlineIcon sx={{color:"green"}} />,
    position: "bottom-right",
    transition: Zoom,
    progressStyle: {
      background: "green" 
    }
  });
};

export const toastErrorNotify = (msg) => {
  toast.error(msg, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { backgroundColor: "#CE987F70", color: "black" },
    icon: <ErrorOutlineIcon sx={{color:"red"}} />,
    position: "bottom-right",
    transition: Flip,
    progressStyle: {
      background: "red" 
    }
  });
};
