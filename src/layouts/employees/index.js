/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import BillingInformation from "layouts/billing/components/BillingInformation";

// Data
import authorsTableData from "layouts/employees/data/authorsTableData";
import projectsTableData from "layouts/employees/data/projectsTableData";

import MDButton from "components/MDButton"; 
import TextField from '@mui/material/TextField';

function Employees() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* <Grid container spacing={1}>
          <MDBox mb={3} pt={3} px={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <MDButton variant="contained" color="info" size="medium">
                  add invoice
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Grid> */}

        {/* <MDBox mb={3} pt={3} px={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              <select className="form-select" aria-label="Default select example">
                <option selected>Companies</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Grid>
            <Grid item xs={12} md={2}>
              <select className="form-select" aria-label="Default select example">
                <option selected>Medicine</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Grid>
            <Grid item xs={12} md={2}>
              <select className="form-select" aria-label="Default select example">
                <option selected>Invoice ID</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Grid>
            <Grid item xs={12} md={2}>
              <select className="form-select" aria-label="Default select example">
                <option selected >Customer type</option>
                <option value="1">Wholesale</option>
                <option value="2">Retail</option>
              </select>
            </Grid>
            <Grid item xs={12} md={3}>
              <MDButton variant="contained" color="info" size="medium">
                search
              </MDButton>
            </Grid>
          </Grid>
        </MDBox> */}
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Employees Table
                </MDTypography>

                <Grid container spacing={1} mt={2}>
                  <Grid item xs={12} md={6}>
                  <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Employee"
                      inputProps={{ 'aria-label': 'search employee' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  </Grid>
                </Grid> 
              </MDBox>

              <MDBox >
                <Grid container spacing={1} mx={2} my={2}>
                  <MDButton variant="contained" color="secondary" size="medium" data-bs-toggle="modal" data-bs-target="#customer">
                    add employee
                  </MDButton>
                </Grid>

                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  
                />  
              </MDBox>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>


      <div className="modal fade" id="customer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New Employee</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* <div className="mb-3">
                <h6>Full Name</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1" 
                  placeholder="eg. John Doe"
                  onChange={(e)=> {setName(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Email</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  onChange={(e)=> {setEmail(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Phone Number</h6>
                <input 
                  type="number" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  onChange={(e)=> {setPhone(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Address</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  onChange={(e)=> {setAddress(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Image URL</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  onChange={(e)=> {setImage(e.target.value)}}
                />
              </div> */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" >Save</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Employees;
