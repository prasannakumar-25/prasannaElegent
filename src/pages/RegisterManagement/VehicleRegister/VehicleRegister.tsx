


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
//   useMediaQuery,
//   useTheme,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// import IconifyIcon from "components/base/IconifyIcon";
// import '../VendorRegister/VendorRegister.css'

// // ---------------------- TYPES ----------------------

// type Vendor = {
//   Vendor_Id: number;
//   Vendor_name: string;
// };

// type Customer = {
//   Customer_Id: number;
//   Customer_name: string;
// };

// type Vehicle = {
//   Vehicle_Id: number;
//   Vehicle_type?: string;
//   Vendor_Id?: number;
//   Customer_Id?: number;
//   Tare_weight?: number;
//   Status: "Active" | "Inactive";
//   Created_at?: string;
//   Updated_at?: string;
// };

// // ---------------------- MOCK DATA ----------------------

// const initialVendors: Vendor[] = [
//   { Vendor_Id: 1, Vendor_name: "TechCorp" },
//   { Vendor_Id: 2, Vendor_name: "Global Logistics" },
//   { Vendor_Id: 3, Vendor_name: "Express Cargo" },
// ];

// const initialCustomers: Customer[] = [
//   { Customer_Id: 1, Customer_name: "TATA Steel" },
//   { Customer_Id: 2, Customer_name: "Reliance Retail" },
//   { Customer_Id: 3, Customer_name: "Aditya Birla Group" },
// ];

// const initialVehicles: Vehicle[] = [
//   {
//     Vehicle_Id: 1,
//     Vehicle_type: "Truck",
//     Vendor_Id: 1,
//     Customer_Id: 1,
//     Tare_weight: 5.5,
//     Status: "Active",
//     Created_at: "2024-01-10",
//     Updated_at: "2024-03-12",
//   },
//   {
//     Vehicle_Id: 2,
//     Vehicle_type: "Van",
//     Vendor_Id: 2,
//     Customer_Id: 2,
//     Tare_weight: 3.2,
//     Status: "Inactive",
//     Created_at: "2024-02-20",
//     Updated_at: "2024-05-15",
//   },
// ];

// // ---------------------- MAIN COMPONENT ----------------------

// const VehicleRegister: React.FC = () => { 
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);  
//   const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
//   const [formError, setFormError] = useState<string | null>(null);

//   const theme = useTheme();
//   const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

//   // Form state
//   const [form, setForm] = useState<Vehicle>({
//     Vehicle_Id: 0,
//     Vehicle_type: "",
//     Vendor_Id: undefined,
//     Customer_Id: undefined,
//     Tare_weight: undefined,
//     Status: "Active",
//   });

//   useEffect(() => {
//     setVehicles(initialVehicles);
//     setVendors(initialVendors);
//     setCustomers(initialCustomers);
//   }, []);

//   // ---------------------- DRAWER HANDLERS ----------------------

//   const handleOpenAdd = () => {
//     setEditingVehicle(null);
//     setForm({
//       Vehicle_Id: 0,
//       Vehicle_type: "",
//       Vendor_Id: undefined,
//       Customer_Id: undefined,
//       Tare_weight: undefined,
//       Status: "Active",
//     });
//     setFormError(null);
//     setDrawerOpen(true);
//   };

//   const handleOpenEdit = (v: Vehicle) => {
//     setEditingVehicle(v);
//     setForm({ ...v });
//     setFormError(null);
//     setDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     setEditingVehicle(null);
//     setFormError(null);
//   };

//   // ---------------------- VALIDATION ----------------------

//   const validate = () => {
//     if (!form.Vehicle_type || form.Vehicle_type.trim() === "") {
//       setFormError("Vehicle Type is required.");
//       return false;
//     }
//     if (!form.Vendor_Id) {
//       setFormError("Please select a Vendor.");
//       return false;
//     }
//     if (!form.Customer_Id) {
//       setFormError("Please select a Customer.");
//       return false;
//     }
//     setFormError(null);
//     return true;
//   };

//   // ---------------------- SAVE HANDLER ----------------------

//   const handleSave = () => {
//     if (!validate()) return;

//     if (editingVehicle) {
//       // Update existing vehicle
//       setVehicles((prev) =>
//         prev.map((p) =>
//           p.Vehicle_Id === editingVehicle.Vehicle_Id
//             ? { ...form, Vehicle_Id: editingVehicle.Vehicle_Id }
//             : p
//         )
//       );
//     } else {
//       // Add new
//       const newVehicle: Vehicle = {
//         ...form,
//         Vehicle_Id: vehicles.length + 1,
//         Status: form.Status || "Active",
//         Created_at: new Date().toISOString(),
//         Updated_at: new Date().toISOString(),
//       };
//       setVehicles((prev) => [...prev, newVehicle]);
//     }

//     handleCloseDrawer();
//   };

//   // ---------------------- DELETE HANDLER ----------------------

//   const handleDelete = (id: number) => {
//     setVehicles((prev) => prev.filter((v) => v.Vehicle_Id !== id));
//   };

//   // ---------------------- RENDER ----------------------

//   return (
//     <Stack
//     className="vm-root"
//     bgcolor="common.white"
//     borderRadius={5}
//     minHeight={460}
//     padding={26}
//     height={1}
//     mx="auto"
//     boxShadow={theme.shadows[4]}
//     >
//       <Box className="header">
//         <Typography variant="h5">Vehicle Register</Typography>

//         <Button
//           variant="contained"
//           onClick={handleOpenAdd}
//           className="add-btn"
//           startIcon={<IconifyIcon icon="material-symbols:add" />}
//         >
//           Add Vehicle
//         </Button>
//       </Box>

//       {/* ------------ TABLE ------------ */}

//       <TableContainer className="vehicle-table">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Vehicle Type</TableCell>
//               <TableCell>Vendor</TableCell>
//               <TableCell>Customer</TableCell>
//               <TableCell>Tare Weight</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="right">Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {vehicles.map((v) => {
//               const vendor = vendors.find((x) => x.Vendor_Id === v.Vendor_Id);
//               const customer = customers.find(
//                 (c) => c.Customer_Id === v.Customer_Id
//               );

//               return (
//                 <TableRow key={v.Vehicle_Id}>
//                   <TableCell>{v.Vehicle_type}</TableCell>
//                   <TableCell>{vendor?.Vendor_name}</TableCell>
//                   <TableCell>{customer?.Customer_name}</TableCell>
//                   <TableCell>{v.Tare_weight}</TableCell>
//                   <TableCell>{v.Status}</TableCell>

//                   <TableCell align="right">
//                     <Button
//                       onClick={() => handleOpenEdit(v)}
//                       className="edit-btn"
//                       title="Edit"
//                     >
//                       Edit <IconifyIcon icon="fluent:notepad-edit-16-regular" />
//                     </Button>

//                     <Button
//                       onClick={() => handleDelete(v.Vehicle_Id)}
//                       className="delete-btn"
//                       title="Delete"
//                     >
//                       Delete <IconifyIcon icon="wpf:delete" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* ------------ DRAWER FORM ------------ */}

//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={handleCloseDrawer}
//         PaperProps={{
//           sx: { width: isMdUp ? 450 : "100%", padding: "25px" },
//         }}
//       >
//         <Box className="drawer-header">
//           <Typography variant="h6">
//             {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
//           </Typography>

//           <IconButton onClick={handleCloseDrawer}>
//             <IconifyIcon icon="material-symbols:close-rounded" />
//           </IconButton>
//         </Box>

//         <Box className="drawer-form">
//           {formError && <Box className="form-error">{formError}</Box>}

//           <Stack spacing={2}>
//             {/* Vehicle Type */}
//             <TextField
//               fullWidth
//               label="Vehicle Type"
//               value={form.Vehicle_type || ""}
//               onChange={(e) =>
//                 setForm({ ...form, Vehicle_type: e.target.value })
//               }
//             />

//             {/* Vendor */}
//             <TextField
//               select
//               fullWidth
//               label="Vendor"
//               value={form.Vendor_Id || ""}
//               onChange={(e) =>
//                 setForm({ ...form, Vendor_Id: Number(e.target.value) })
//               }
//             >
//               {vendors.map((v) => (
//                 <MenuItem key={v.Vendor_Id} value={v.Vendor_Id}>
//                   {v.Vendor_name}
//                 </MenuItem>
//               ))}
//             </TextField>

//             {/* Customer */}
//             <TextField
//               select
//               fullWidth
//               label="Customer"
//               value={form.Customer_Id || ""}
//               onChange={(e) =>
//                 setForm({ ...form, Customer_Id: Number(e.target.value) })
//               }
//             >
//               {customers.map((c) => (
//                 <MenuItem key={c.Customer_Id} value={c.Customer_Id}>
//                   {c.Customer_name}
//                 </MenuItem>
//               ))}
//             </TextField>

//             {/* Tare Weight */}
//             <TextField
//               type="number"
//               fullWidth
//               label="Tare Weight"
//               value={form.Tare_weight || ""}
//               onChange={(e) =>
//                 setForm({ ...form, Tare_weight: Number(e.target.value) })
//               }
//             />

//             {/* Status */}
//             <TextField
//               select
//               fullWidth
//               label="Status"
//               value={form.Status}
//               onChange={(e) =>
//                 setForm({ ...form, Status: e.target.value as any })
//               }
//             >
//               <MenuItem value="Active">Active</MenuItem>
//               <MenuItem value="Inactive">Inactive</MenuItem>
//             </TextField>
//           </Stack>

//           <Button
//             fullWidth
//             variant="contained"
//             className="save-btn"
//             onClick={handleSave}
//           >
//             Save
//           </Button>
//         </Box>
//       </Drawer>
//     </Stack>
//   );
// };

// export default VehicleRegister;







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
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import IconifyIcon from "components/base/IconifyIcon";



// Vendor type (for linking)
type Vendor = {
  id: number;
  vendorName: string;
  category?: string;
  phone?: string;
  email?: string;
  website?: string;
  gstNumber?: string;
  address?: string;
  location?: string;
  status?: "Active" | "Inactive";
};

// Machine type (for linking)
type Machine = {
  id: number;
  vendorId: number;
  machineName: string;
  password: string;
  machineMac?: string;
  machineModel?: string;
  capacityTon?: number;
  lastServiceDate?: string;
  machineType: "Company" | "ThirdParty" | "Estate";
  machineLocation?: string;
};

// Vehicle type
type Vehicle = {
  id: number;
  vehicleType: string;
  vendorId?: number;
  customerId?: number;
  tareWeight?: number;
  status?: "Active" | "Inactive";
};

const initialVendors: Vendor[] = [
  {
    id: 1,
    vendorName: "TechCorp Industries",
    category: "Electronics",
    phone: "9876543210",
    email: "tech@corp.com",
    website: "https://techcorp.com",
    gstNumber: "GST123456",
    address: "12 Marine Drive, Mumbai",
    location: "Mumbai, Maharashtra",
    status: "Active",
  },
  {
    id: 2,
    vendorName: "Global Logistics",
    category: "Logistics",
    phone: "9876543211",
    email: "global@log.com",
    website: "https://globallog.com",
    gstNumber: "GST123457",
    address: "45 Industrial Estate, Delhi",
    location: "New Delhi, Delhi",
    status: "Active",
  },
  {
    id: 3,
    vendorName: "ExpressCargo Solutions",
    category: "Transport",
    phone: "9876543212",
    email: "express@cargo.com",
    website: "https://expresscargo.com",
    gstNumber: "GST123458",
    address: "99 Tech Park, Bangalore",
    location: "Bengaluru, Karnataka",
    status: "Inactive",
  },
];

const initialMachines: Machine[] = [
  {
    id: 1,
    vendorId: 1,
    machineName: "Machine A",
    password: "pass123",
    machineMac: "AA:BB:CC:DD:EE:FF",
    machineModel: "Model X",
    capacityTon: 5.5,
    lastServiceDate: "2024-01-15",
    machineType: "Company",
    machineLocation: "Mumbai, Maharashtra",
  },
  {
    id: 2,
    vendorId: 2,
    machineName: "Machine B",
    password: "secure456",
    machineMac: "11:22:33:44:55:66",
    machineModel: "Model Y",
    capacityTon: 10.0,
    lastServiceDate: "2024-06-20",
    machineType: "ThirdParty",
    machineLocation: "New Delhi, Delhi",
  },
  {
    id: 3,
    vendorId: 1,
    machineName: "Machine C",
    password: "estate789",
    machineMac: "99:88:77:66:55:44",
    machineModel: "Model Z",
    capacityTon: 2.25,
    lastServiceDate: "2024-03-10",
    machineType: "Estate",
    machineLocation: "Bengaluru, Karnataka",
  },
];

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    vehicleType: "Truck",
    vendorId: 1,
    customerId: 101,
    tareWeight: 2500.50,
    status: "Active",
  },
  {
    id: 2,
    vehicleType: "Van",
    vendorId: 2,
    customerId: 102,
    tareWeight: 1800.00,
    status: "Active",
  },
  {
    id: 3,
    vehicleType: "Lorry",
    vendorId: 3,
    customerId: 103,
    tareWeight: 3200.75,
    status: "Inactive",
  },
];

const VehicleRegister: React.FC<{ onLogout?: () => void }> = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // form state (single object)
  const [form, setForm] = useState<Vehicle>({
    id: 0,
    vehicleType: "",
    vendorId: undefined,
    customerId: undefined,
    tareWeight: undefined,
    status: "Active",
  });

  useEffect(() => {
    // Load mock vehicles, vendors and machines on first render
    setVehicles(initialVehicles);
    setVendors(initialVendors);
    setMachines(initialMachines);
  }, []);

  // open drawer for add
  const handleOpenAdd = () => {
    setEditingVehicle(null);
    setForm({
      id: 0,
      vehicleType: "",
      vendorId: undefined,
      customerId: undefined,
      tareWeight: undefined,
      status: "Active",
    });
    setFormError(null);
    setDrawerOpen(true);
  };

  // open drawer for edit
  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setForm({ ...v });
    setFormError(null);
    setDrawerOpen(true);
  };

  // close drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingVehicle(null);
    setFormError(null);
  };

  // validate basic fields
  const validate = (): boolean => {
    if (!form.vehicleType || !form.vehicleType.trim()) {
      setFormError("Vehicle type is required.");
      return false;
    }
    if (form.tareWeight && form.tareWeight < 0) {
      setFormError("Tare weight cannot be negative.");
      return false;
    }
    setFormError(null);
    return true;
  };

  // save vehicle (add or update)
  const handleSave = () => {
    if (!validate()) return;

    if (editingVehicle) {
      // update
      setVehicles((prev) => prev.map((p) => (p.id === editingVehicle.id ? { ...form, id: editingVehicle.id } : p)));
    } else {
      // add
      const newVehicle: Vehicle = { ...form, id: Date.now() };
      setVehicles((prev) => [newVehicle, ...prev]);
    }

    handleCloseDrawer();
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  // update form field helper
  const setField = (key: keyof Vehicle, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Get machines filtered by selected vendor
  const getVendorMachines = () => {
    if (!form.vendorId) return [];
    return machines.filter(m => m.vendorId === form.vendorId);
  };

  // drawer width responsive:
  const drawerWidth = isMdUp ? Math.min(700, Math.round(window.innerWidth * 0.55)) : window.innerWidth;

  return (
    <Stack
      className="vm-root"
      bgcolor="common.white"
      boxShadow={theme.shadows[4]}
    >
      
      <main className="vm-content">
        <Box className="vm-header">
          <Typography variant="h4">Vehicle Register</Typography>

          <div className="vm-actions">
            <Button
              variant="contained"
              onClick={handleOpenAdd}
              className="add-vendor-btn"
            >
              Add Vehicle
            </Button>
          </div>
        </Box>

        {/* TABLE VERSION */}
        <TableContainer className="vm-table-container">
          <Table className="vm-table">
            <TableHead className="vm-table-header">
              <TableRow className="vm-table-row">
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Tare Weight (kg)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Available Machines</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {vehicles.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <Typography variant="subtitle1" className="vm-row-title">
                      {v.vehicleType}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {v.vendorId ? vendors.find(vendor => vendor.id === v.vendorId)?.vendorName || "—" : "—"}
                  </TableCell>
                  <TableCell>{v.customerId || "—"}</TableCell>
                  <TableCell>
                    {v.tareWeight ? `${v.tareWeight.toFixed(2)} kg` : "—"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`status-badge ${
                        v.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {v.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    {v.vendorId ? (
                      machines.filter(m => m.vendorId === v.vendorId).length > 0 ? (
                        <Typography variant="body2">
                          {machines.filter(m => m.vendorId === v.vendorId).length} machine(s)
                        </Typography>
                      ) : (
                        "No machines"
                      )
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  <TableCell align="right" className="vm-action-cell">
                    <Button
                      onClick={() => handleOpenEdit(v)}
                      className="vm-btn vm-action-btn-edit"
                    >
                      <IconifyIcon icon="fluent:notepad-edit-16-regular" />
                    </Button>

                    <Button
                      onClick={() => handleDelete(v.id)}
                      className="vm-btn vm-action-btn-delete"
                    >
                      <IconifyIcon icon="wpf:delete" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </main>

      {/* Right drawer - slides in from right; full width on small screens */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
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
          <Typography variant="h6">
            {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
          </Typography>
          <IconButton onClick={handleCloseDrawer} aria-label="close">
            <IconifyIcon icon="material-symbols:close-rounded" />
          </IconButton>
        </Box>

        <Box className="drawer-content">
          {formError && <Box className="form-error">{formError}</Box>}

          <Stack spacing={2}>
            <TextField
              label="Vehicle Type"
              placeholder="e.g., Truck, Van, Lorry"
              fullWidth
              value={form.vehicleType}
              onChange={(e) => setField("vehicleType", e.target.value)}
              helperText="Specify the type of vehicle"
            />

            <TextField
              label="Vendor"
              select
              fullWidth
              value={form.vendorId || ""}
              onChange={(e) => setField("vendorId", e.target.value ? Number(e.target.value) : undefined)}
              helperText="Select vendor (optional)"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {vendors.map((v) => (
                <MenuItem key={v.id} value={v.id}>
                  {v.vendorName}
                </MenuItem>
              ))}
            </TextField>

            {form.vendorId && getVendorMachines().length > 0 && (
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: 'action.hover', 
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Available Machines from Selected Vendor:
                </Typography>
                {getVendorMachines().map((machine) => (
                  <Typography key={machine.id} variant="body2" sx={{ ml: 1 }}>
                    • {machine.machineName} ({machine.machineType})
                  </Typography>
                ))}
              </Box>
            )}

            <TextField
              label="Customer ID"
              type="number"
              placeholder="Enter customer ID"
              fullWidth
              value={form.customerId ?? ""}
              onChange={(e) => setField("customerId", e.target.value ? Number(e.target.value) : undefined)}
              helperText="Optional customer identifier"
            />

            <TextField
              label="Tare Weight (kg)"
              type="number"
              placeholder="e.g., 2500.50"
              fullWidth
              value={form.tareWeight ?? ""}
              onChange={(e) => setField("tareWeight", e.target.value ? parseFloat(e.target.value) : undefined)}
              helperText="Weight in kilograms (optional)"
            />

            <TextField
              label="Status"
              select
              value={form.status}
              onChange={(e) => setField("status", e.target.value as "Active" | "Inactive")}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={1}>
              <Button 
                variant="text" 
                className="cancel-button" 
                onClick={handleCloseDrawer}
              >
                Cancel
              </Button>

              <Button 
                variant="contained" 
                className="edit-button" 
                onClick={handleSave}
              >
                {editingVehicle ? "Update Vehicle" : "Save Vehicle"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </Stack>
  );
};

export default VehicleRegister;