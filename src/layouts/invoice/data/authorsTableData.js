/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";

// Material Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium" fontSize="15px">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "customer", accessor: "author", align: "left" },
      { Header: "Invoice ID", accessor: "medicine", align: "left" },
      { Header: "total amount (GHc)", accessor: "amount", align: "center" },
      { Header: "Paid (GHc)", accessor: "paid", align: "center" },
      { Header: "balance (GHc)", accessor: "balance", align: "center" },
      { Header: "Payment Mode", accessor: "status", align: "center" },
      { Header: "date", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [ 
      {
        author: <Author image={team2} name="John Michael" email="Jim-Beck Pharmacy" />,
        medicine: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
           31238374
          </MDTypography>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="wholesale" color="info" variant="gradient" size="lg" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        amount: (
          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
            4000
          </MDTypography>
        ),
        paid: (
          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
            1000
          </MDTypography>
        ),
        balance: (
          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
            3000
          </MDTypography>
        ),
        action: (
          <>
            <MDBox>
              <MDTypography className="btn btn-outline-primary btn-sm" variant="caption" color="text" fontWeight="medium" data-bs-toggle="modal" data-bs-target="#view">
                View
                <VisibilityIcon />
              </MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography className="btn btn-outline-success btn-sm" variant="caption" color="text" fontWeight="medium">
                Print
              <PrintIcon />
              </MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography className="btn btn-outline-secondary btn-sm" variant="caption" color="text" fontWeight="medium">
                Edit
               <EditIcon />
              </MDTypography>
            </MDBox>

            <div className="modal fade" id="view" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4}>
                        <div className="mb-3">
                          <label htmlFor="exampleFormControlInput1" className="form-label">Invoice Header Information</label>
                          <h6>Invoice ID</h6>
                            <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                              3000
                            </MDTypography>
                        </div>
                        <div className="mb-3">
                          <h6>Invoice Date</h6>
                            <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                              3000
                            </MDTypography>
                        </div>
                        <div className="mb-3">
                          <h6>Due Date</h6>
                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            3000
                          </MDTypography>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <div className="mb-3">
                          <label htmlFor="exampleFormControlInput1" className="form-label">Customer Information</label>
                          <h6>Company</h6>
                          {/* <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/> */}
                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            3000
                          </MDTypography>
                        </div>
                        <div className="mb-3">
                          <h6>Customer Name</h6>
                          {/* <input type="text" className="form-control" id="exampleFormControlInput1" /> */}

                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            3000
                          </MDTypography>
                        </div>
                        <div className="mb-3">
                          <h6>Phone</h6>
                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            3000
                          </MDTypography>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <div className="mb-3">
                          <label htmlFor="exampleFormControlInput1" className="form-label">Billing Information</label>
                          <h6>Mode of Payment</h6>
                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            3000
                          </MDTypography>
                        </div>
                        <div className="mb-3">
                          <h6>Payment Option</h6>
                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            3000
                          </MDTypography>
                        </div>
                      </Grid>
                    </Grid>
                    <hr/>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Items Information</label>
                    {/* <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Medicine"/>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Quantity"/>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <button type="button" className="btn btn-primary">Add medicine</button>
                      </Grid>
                    </Grid> */}
                    <Grid container spacing={1}>
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
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ),
      },
    ],
  };
}
