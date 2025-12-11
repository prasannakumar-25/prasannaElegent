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
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon";
import { Machine, Vendor } from "pages/RegisterManagement/MachineRegister/MachineRegister";

import "../../RegisterManagement/MachineRegister/MachineRegister.css";

interface MachineDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Machine) => void;
  initialData: Machine | null;
  vendors: Vendor[];
  loading: boolean;
}

const MachineDrawer: React.FC<MachineDrawerProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  vendors,
  loading,
}) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const drawerWidth = isMdUp ? Math.min(700, Math.round(window.innerWidth * 0.55)) : window.innerWidth;

  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Default Form
  const defaultForm: Machine = {
    id: 0,
    vendorId: 0,
    machineName: "",
    password: "",
    machineMac: "",
    machineModel: "",
    capacityTon: undefined,
    lastServiceDate: "",
    machineType: "Company",
    machineLocation: "",
  };

  const [form, setForm] = useState<Machine>(defaultForm);

  useEffect(() => {
    if (open) {
      setFormError(null);
      if (initialData) {
        setForm({ ...initialData });
      } else {
        setForm(defaultForm);
      }
    }
  }, [open, initialData]);

  const setField = (key: keyof Machine, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validate = (): boolean => {
    if (!form.machineName || !form.machineName.trim()) {
      setFormError("Machine name is required.");
      return false;
    }
    if (!form.password || !form.password.trim()) {
      setFormError("Password is required.");
      return false;
    }
    if (!form.vendorId || form.vendorId <= 0) {
      setFormError("Please select a vendor.");
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          maxWidth: "100%",
          borderTopLeftRadius: { xs: 0, md: 12 },
          borderBottomLeftRadius: { xs: 0, md: 12 },
          height: { xs: "100vh", md: "100vh" },
        },
      }}
      ModalProps={{ keepMounted: true }}
    >
      <Box className="drawer-header">
        <Typography variant="h6">{initialData ? "Edit Machine" : "Add New Machine"}</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <IconifyIcon icon="material-symbols:close-rounded" />
        </IconButton>
      </Box>

      <Box className="drawer-content">
        {formError && <Box className="form-error">{formError}</Box>}
        
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Machine Name"
              className="input-bg-color"
              placeholder="Enter machine name"
              fullWidth
              value={form.machineName}
              disabled={loading}
              onChange={(e) => setField("machineName", e.target.value)}
            />
            <TextField
              label="Password"
              className="input-bg-color"
              type={showPassword ? 'text' : "password"}
              placeholder="*********"
              fullWidth
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? (
                        <IconifyIcon icon="ic:baseline-key-off" />
                      ) : (
                        <IconifyIcon icon="ic:baseline-key" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <TextField
            label="Asscoiated Vendor"
            className="input-bg-color"
            select
            fullWidth
            value={form.vendorId || ""}
            onChange={(e) => setField("vendorId", Number(e.target.value))}
          >
            <MenuItem value={0}><em>None</em></MenuItem>
            {vendors.map((v) => (
              <MenuItem key={v.id} value={v.id}>
                {v.vendorName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="MAC Address"
            className="input-bg-color"
            placeholder="e.g., AA:BB:CC:DD:EE:FF"
            fullWidth
            value={form.machineMac || ""}
            onChange={(e) => setField("machineMac", e.target.value)}
          />
          <TextField
            label="Machine Model"
            className="input-bg-color"
            placeholder="e.g., Model X"
            fullWidth
            value={form.machineModel || ""}
            onChange={(e) => setField("machineModel", e.target.value)}
          />

          <TextField
            label="Capacity (tons)"
            className="input-bg-color"
            type="number"
            placeholder="e.g., 5.5"
            fullWidth
            value={form.capacityTon ?? ""}
            onChange={(e) => setField("capacityTon", e.target.value ? parseFloat(e.target.value) : undefined)}
          />

          <TextField
            label="Machine Type"
            className="input-bg-color"
            select
            fullWidth
            value={form.machineType}
            onChange={(e) => setField("machineType", e.target.value as "Company" | "ThirdParty" | "Estate")}
          >
            <MenuItem value="Company">Company</MenuItem>
            <MenuItem value="ThirdParty">ThirdParty</MenuItem> 
            <MenuItem value="Estate">Estate</MenuItem>
          </TextField>

          <TextField
            label="Machine Location"
            className="input-bg-color"
            placeholder="e.g., City, State"
            fullWidth
            value={form.machineLocation || ""}
            onChange={(e) => setField("machineLocation", e.target.value)}
          />
          
          <TextField
            label="Last Service Date"
            className="input-bg-color"
            type="date"
            fullWidth
            value={form.lastServiceDate || ""}
            onChange={(e) => setField("lastServiceDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={1}>
            <Button variant="text" className="cancel-button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" className="edit-button" onClick={handleSubmit}>
              {initialData ? "Update Machine" : "Save Machine"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default MachineDrawer;