// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   MenuItem,
//   Stack,
//   TextField,
//   Typography,
//   Alert,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import IconifyIcon from "components/base/IconifyIcon";
// // import { User } from "./UserRegister"; // Import types from Parent
// import { User } from "pages/RegisterManagement/UserRegistration/UserRegister";

// import "../../RegisterManagement/MachineRegister/MachineRegister.css"

// interface UserDrawerProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: (data: User) => void;
//   initialData: User | null;
//   loading?: boolean;
// }

// const UserDrawer: React.FC<UserDrawerProps> = ({
//   open,
//   onClose,
//   onSave,
//   initialData,
//   loading = false,
// }) => {
//   const theme = useTheme();
//   const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
//   const drawerWidth = isMdUp ? Math.min(700, Math.round(window.innerWidth * 0.55)) : window.innerWidth;

//   const [formError, setFormError] = useState<string | null>(null);

//   // Default Form State
//   const defaultForm: User = {
//     id: 0,
//     username: "",
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     role: "Operator",
//     status: "Active",
//     createdDate: new Date().toISOString(),
//   };

//   const [form, setForm] = useState<User>(defaultForm);

//   // Reset or Populate form when Drawer opens
//   useEffect(() => {
//     if (open) {
//       setFormError(null);
//       if (initialData) {
//         setForm({ ...initialData });
//       } else {
//         setForm({ ...defaultForm, createdDate: new Date().toISOString() });
//       }
//     }
//   }, [open, initialData]);

//   const setField = (key: keyof User, value: any) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const validate = (): boolean => {
//     if (!form.fullName?.trim()) {
//       setFormError("Full Name is required.");
//       return false;
//     }
//     if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
//       setFormError("Valid Email is required.");
//       return false;
//     }
//     if (!form.phoneNumber?.trim()) {
//       setFormError("Phone Number is required.");
//       return false;
//     }
//     setFormError(null);
//     return true;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       onSave(form);
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: drawerWidth,
//           p: 3,
//           borderTopLeftRadius: { xs: 0, md: 12 },
//           borderBottomLeftRadius: { xs: 0, md: 12 },
//         },
//       }}
//     >
//       {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h6" fontWeight="bold">
//           {initialData ? "Edit User" : "Add New User"}
//         </Typography>
//         <IconButton onClick={onClose} aria-label="close">
//           <IconifyIcon icon="material-symbols:close-rounded" />
//         </IconButton>
//       </Box> */}
//       <Box className="drawer-header">
//         <Typography variant="h6">{initialData ? "Edit Machine" : "Add New Machine"}</Typography>
//         <IconButton onClick={onClose} aria-label="close">
//             <IconifyIcon icon="material-symbols:close-rounded" />
//         </IconButton>
//         </Box>

//       <Stack spacing={2.5}>
//         {formError && <Alert severity="error">{formError}</Alert>}

//         <TextField
//           label="Full Name"
//           className="input-bg-color label-black" 
//           placeholder="e.g., John Doe"
//           fullWidth
//           value={form.fullName}
//           onChange={(e) => setField("fullName", e.target.value)}
//           disabled={loading}
//         />

//         <TextField
//           label="Email Address"
//           className="input-bg-color label-black" 
//           placeholder="e.g., john@example.com"
//           fullWidth
//           value={form.email}
//           onChange={(e) => setField("email", e.target.value)}
//           disabled={loading}
//         />

//         <TextField
//           label="Phone Number"
//           className="input-bg-color label-black" 
//           placeholder="e.g., +91 98765 43210"
//           fullWidth
//           value={form.phoneNumber}
//           onChange={(e) => setField("phoneNumber", e.target.value)}
//           disabled={loading}
//         />

//         <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//           <TextField
//             label="Role"
//             className="input-bg-color label-black" 
//             select
//             fullWidth
//             value={form.role}
//             onChange={(e) => setField("role", e.target.value)}
//             disabled={loading}
//           >
//             <MenuItem value="Admin">Admin</MenuItem>
//             <MenuItem value="Operator">Operator</MenuItem>
//             <MenuItem value="Viewer">Viewer</MenuItem>
//           </TextField>

//           <TextField
//             label="Status"
//             className="input-bg-color label-black" 
//             select
//             fullWidth
//             value={form.status}
//             onChange={(e) => setField("status", e.target.value)}
//             disabled={loading}
//           >
//             <MenuItem value="Active">Active</MenuItem>
//             <MenuItem value="Inactive">Inactive</MenuItem>
//           </TextField>
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" pt={2}>
//           <Button variant="text" className="cancel-button" onClick={onClose} 
//           >
//               Cancel
//           </Button>

//           <Button variant="contained" className="edit-button" onClick={handleSubmit} 
//           >
//               {initialData ? "Update Machine" : "Save Machine"}
//           </Button>
//           </Stack>

//         {/* <Stack direction="row" spacing={2} justifyContent="flex-end" pt={2}>
//           <Button onClick={onClose} variant="text" className="cancel-button">
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={loading} className="edit-button">
//             {initialData ? "Update" : "Save"}
//           </Button>
//         </Stack> */}
//       </Stack>
//     </Drawer>
//   );
// };

// export default UserDrawer;










import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon";
import { User } from "pages/RegisterManagement/UserRegistration/UserRegister";

import "../../RegisterManagement/MachineRegister/MachineRegister.css";

interface UserDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: User) => void;
  initialData: User | null;
  loading?: boolean;
}

const UserDrawer: React.FC<UserDrawerProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  loading = false,
}) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const drawerWidth = isMdUp ? Math.min(700, Math.round(window.innerWidth * 0.55)) : window.innerWidth;

  const [formError, setFormError] = useState<string | null>(null);

  // Default Form State
  const defaultForm: User = {
    id: 0,
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "Operator",
    status: "Active",
    createdDate: new Date().toISOString(),
  };

  const [form, setForm] = useState<User>(defaultForm);

  // Reset or Populate form when Drawer opens
  useEffect(() => {
    if (open) {
      setFormError(null);
      if (initialData) {
        setForm({ ...initialData });
      } else {
        setForm({ ...defaultForm, createdDate: new Date().toISOString() });
      }
    }
  }, [open, initialData]);

  const setField = (key: keyof User, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): boolean => {
    if (!form.fullName?.trim()) {
      setFormError("Full Name is required.");
      return false;
    }
    if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      setFormError("Valid Email is required.");
      return false;
    }
    if (!form.phoneNumber?.trim()) {
      setFormError("Phone Number is required.");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(form);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: drawerWidth,
          p: 3,
          borderTopLeftRadius: { xs: 0, md: 12 },
          borderBottomLeftRadius: { xs: 0, md: 12 },
        },
      }}
    >
      <Box className="drawer-header" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
            {initialData ? "Edit User" : "Add New User"}
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
            <IconifyIcon icon="material-symbols:close-rounded" />
        </IconButton>
      </Box>

      <Stack spacing={2.5}>
        {formError && <Alert severity="error">{formError}</Alert>}

        <TextField
          label="Full Name"
          className="input-bg-color label-black" 
          placeholder="e.g., John Doe"
          fullWidth
          value={form.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          disabled={loading}
        />

        <TextField
          label="Email Address"
          className="input-bg-color label-black" 
          placeholder="e.g., john@example.com"
          fullWidth
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          disabled={loading}
        />

        <TextField
          label="Phone Number"
          className="input-bg-color label-black" 
          placeholder="e.g., +91 98765 43210"
          fullWidth
          value={form.phoneNumber}
          onChange={(e) => setField("phoneNumber", e.target.value)}
          disabled={loading}
        />

        {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}> */}
          <TextField
            label="Role"
            className="input-bg-color label-black" 
            select
            fullWidth
            value={form.role}
            onChange={(e) => setField("role", e.target.value)}
            disabled={loading}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Operator">Operator</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </TextField>

          <TextField
            label="Status"
            className="input-bg-color label-black" 
            select
            fullWidth
            value={form.status}
            onChange={(e) => setField("status", e.target.value)}
            disabled={loading}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        {/* </Stack> */}

        <Stack direction="row" spacing={2} justifyContent="flex-end" pt={2}>
          <Button variant="text" className="cancel-button" onClick={onClose}>
              Cancel
          </Button>

          <Button variant="contained" className="edit-button" onClick={handleSubmit} disabled={loading}>
              {initialData ? "Update User" : "Save User"}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default UserDrawer;