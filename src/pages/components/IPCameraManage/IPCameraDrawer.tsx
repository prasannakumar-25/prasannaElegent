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
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon";
// import { IPCamera, Machine } from "./IPCameraRegister"; // Import types from Parent
import { IPCamera, Machine } from "pages/RegisterManagement/IPCameraRegister/IPCameraRegister";

interface IPCameraDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: IPCamera) => void;
  initialData: IPCamera | null;
  machines: Machine[];
}

const IPCameraDrawer: React.FC<IPCameraDrawerProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  machines,
}) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const drawerWidth = isMdUp ? Math.min(700, Math.round(window.innerWidth * 0.55)) : window.innerWidth;

  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Default Form State
  const defaultForm: IPCamera = {
    id: 0,
    machineId: 0,
    cameraName: "",
    ipAddress: "",
    rtspUrl: "",
    httpUrl: "",
    username: "",
    password: "",
    macAddress: "",
    status: "Offline",
    location: "",
    installedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  };

  const [form, setForm] = useState<IPCamera>(defaultForm);

  // Reset or Populate form when Drawer opens
  useEffect(() => {
    if (open) {
      setFormError(null);
      if (initialData) {
        setForm({ ...initialData });
      } else {
        setForm({ ...defaultForm });
      }
    }
  }, [open, initialData]);

  const setField = (key: keyof IPCamera, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): boolean => {
    if (!form.cameraName?.trim()) {
      setFormError("Camera name is required.");
      return false;
    }
    if (!form.ipAddress?.trim()) {
      setFormError("IP Address is required.");
      return false;
    }
    if (!form.machineId || form.machineId <= 0) {
      setFormError("Please associate a Machine.");
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          {initialData ? "Edit Camera" : "Add New Camera"}
        </Typography>
        <IconButton onClick={onClose}>
          <IconifyIcon icon="material-symbols:close-rounded" />
        </IconButton>
      </Box>

      <Stack spacing={2.5}>
        {formError && <Alert severity="error">{formError}</Alert>}

        {/* Basic Info */}
        <TextField
          label="Camera Name"
          placeholder="Enter camera name"
          fullWidth
          value={form.cameraName}
          onChange={(e) => setField("cameraName", e.target.value)}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Associated Machine"
            select
            fullWidth
            value={form.machineId || ""}
            onChange={(e) => setField("machineId", Number(e.target.value))}
          >
            <MenuItem value={0}><em>None</em></MenuItem>
            {machines.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.machineName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Status"
            select
            fullWidth
            value={form.status}
            onChange={(e) => setField("status", e.target.value)}
          >
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
            <MenuItem value="Error">Error</MenuItem>
          </TextField>
        </Stack>

        {/* Network Info */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="IP Address"
            placeholder="e.g., 192.168.1.100"
            fullWidth
            value={form.ipAddress}
            onChange={(e) => setField("ipAddress", e.target.value)}
          />
          <TextField
            label="MAC Address"
            placeholder="e.g., AA:BB:CC:DD:EE:FF"
            fullWidth
            value={form.macAddress || ""}
            onChange={(e) => setField("macAddress", e.target.value)}
          />
        </Stack>

        {/* URLs */}
        <TextField
          label="RTSP URL"
          placeholder="rtsp://..."
          fullWidth
          value={form.rtspUrl || ""}
          onChange={(e) => setField("rtspUrl", e.target.value)}
        />
        <TextField
          label="HTTP URL"
          placeholder="http://..."
          fullWidth
          value={form.httpUrl || ""}
          onChange={(e) => setField("httpUrl", e.target.value)}
        />

        {/* Credentials */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Username"
            placeholder="Camera username"
            fullWidth
            value={form.username || ""}
            onChange={(e) => setField("username", e.target.value)}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Camera password"
            fullWidth
            value={form.password || ""}
            onChange={(e) => setField("password", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <IconifyIcon icon={showPassword ? "ic:baseline-key-off" : "ic:baseline-key"} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* Location & Date */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Location"
            placeholder="e.g., Main Entrance"
            fullWidth
            value={form.location || ""}
            onChange={(e) => setField("location", e.target.value)}
          />
          <TextField
            label="Installed Date"
            type="date"
            fullWidth
            value={form.installedDate || ""}
            onChange={(e) => setField("installedDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        {/* Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" pt={2}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default IPCameraDrawer;