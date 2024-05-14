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
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import MDButton from "components/MDButton"; 
import TextField from '@mui/material/TextField';

function Tables() {
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
                  Invoice Table
                </MDTypography>

                <Grid container spacing={1} mt={2}>
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
                    <MDButton variant="contained" color="warning" size="medium">
                      search
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>

              <MDBox >
                <Grid container spacing={1} mx={2} my={2}>
                  <MDButton variant="contained" color="secondary" size="medium">
                    create invoice
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
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
