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
import authorsTableData from "layouts/invoice/data/authorsTableData";
import projectsTableData from "layouts/invoice/data/projectsTableData";

import MDButton from "components/MDButton"; 
import TextField from '@mui/material/TextField';

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
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
                  <Grid item xs={12} md={5}>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search Invoice"/>
                  </Grid>
                  {/* <Grid item xs={12} md={3}>
                    <MDButton variant="contained" color="warning" size="medium">
                      search
                    </MDButton>
                  </Grid> */}
                </Grid>
              </MDBox>

              <MDBox >
                <Grid container spacing={1} mx={2} my={2}>
                  <MDButton variant="contained" color="secondary" size="medium" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
        </Grid>
      </MDBox>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{maxHeight: "700px", marginTop: "100px"}}>
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Invoice</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>  
            <div className="modal-body">
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Invoice Header Information</label>
                  <h6>Invoice ID</h6>
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" disabled readOnly/>
                </div>
                <div className="mb-3">
                  <h6>Invoice Date</h6>
                  <input type="date" className="form-control" id="exampleFormControlInput1" />
                </div>
                <div className="mb-3">
                  <h6>Due Date</h6>
                  <input type="date" className="form-control" id="exampleFormControlInput1"/>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Customer Information</label>
                  <h6>Company</h6>
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                  <h6>Name</h6>
                  <input type="text" className="form-control" id="exampleFormControlInput1" />
                </div>
                <div className="mb-3">
                  <h6>Phone</h6>
                  <input type="text" className="form-control" id="exampleFormControlInput1"/>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Billing Information</label>
                  <h6>Mode of Payment</h6>
                  <select className="form-select" aria-label="Default select example">
                    <option selected>Mode of Payment</option>
                    <option value="1">Cash</option>
                    <option value="2">Momo</option>
                    <option value="3">Credit/Debit Card</option>
                    <option value="3">Bank Transfer</option>
                  </select>
                </div>
                <div className="mb-3">
                  <h6>Payment Option</h6>
                  <select className="form-select" aria-label="Default select example">
                    <option selected>Payment option</option>
                    <option value="1">Full payment</option>
                    <option value="2">1 months</option>
                    <option value="3">2 months</option>
                    <option value="3">4 months</option>
                  </select>
                </div>
              </Grid>
            </Grid>
            <hr/>
            <label htmlFor="exampleFormControlInput1" className="form-label">Items Information</label>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Medicine"/>
              </Grid>
              <Grid item xs={12} md={3}>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Quantity"/>
              </Grid>
              <Grid item xs={12} md={2}>
                <button type="button" className="btn btn-primary">Add medicine</button>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={3}>
              <Grid item xs={12} md={12}>
                <table className="table table-sm table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>John</td>
                      <td>Thornton</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      {/* <th scope="row">3</th> */}
                      <td colSpan="4">Total</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
                <a href="#" style={{fontSize: "15px"}}>Clear table</a>
              </Grid>
            </Grid>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success ">Print</button>
              <button type="button" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Tables;
