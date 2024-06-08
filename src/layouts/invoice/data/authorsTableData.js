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

import { useEffect, useState } from "react";

// Supabase Client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pedlcwbxzcjuzwdupgwk.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGxjd2J4emNqdXp3ZHVwZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEwNzQsImV4cCI6MjAyOTAwNzA3NH0.7GZC7LjXsoUgSHXLHDvblNPoC0y_v9UjDBYiAwLywAw";
const supabase = createClient(supabaseUrl, supabaseKey)

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
  const [data, setData] = useState([]);

  const dateChange = (timestamp)=> {
  
    // Parse the timestamp into a Date object
    const date = new Date(timestamp);
  
    // Extract the year, month, and day
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
  
    // Format the date as YYYY-MM-DD
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate; // Output: "2024-05-26"

  }


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

  let isMounted = false
  
  useEffect(() => {
    const controller = new AbortController();

    if(!isMounted) {
      isMounted = true
      const getMedicine = async ()=> {
        let { data: sales_detail, error } = await supabase
        .from('sales_detail')
        .select(`
          *,
          sales (
            *,
            customers(
              *
            )
          ),
          medicine (
            *
          )
        `)

        setData(sales_detail)

        console.log(sales_detail)
      }

      getMedicine();
    };

    return ()=> {
      controller.abort();
    }
  }, [])


        

  return {
    columns: [
      { Header: "customer", accessor: "author", align: "left" },
      { Header: "Invoice ID", accessor: "medicine", align: "center" },
      { Header: "total amount (GHc)", accessor: "amount", align: "center" },
      { Header: "Paid (GHc)", accessor: "paid", align: "center" },
      { Header: "balance (GHc)", accessor: "balance", align: "center" },
      { Header: "Payment Mode", accessor: "status", align: "center" },
      { Header: "date", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: data?.map(item => ({ 
      author: <Author image={item?.sales?.customers?.image} name={item?.sales?.customers?.name} email={item?.sales?.customers?.email} />,
      medicine: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
         {item?.id}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={item?.sales?.payment_mode} color={item?.sales?.payment_mode === 'cash' ? 'info' : 'warning'} variant="gradient" size="lg" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {dateChange(item?.created_at)}
        </MDTypography>
      ),
      amount: (
        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
          {item?.sales?.total_amount}
        </MDTypography>
      ),
      paid: (
        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
          {item?.sales?.paid}
        </MDTypography>
      ),
      balance: (
        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
          {item?.sales?.total_amount - item?.sales?.paid}
        </MDTypography>
      ),
      action: (
        <>
          <MDBox>
            <MDTypography className="btn btn-outline-primary btn-sm" variant="caption" color="text" fontWeight="medium" data-bs-toggle="modal" data-bs-target="#view" sx={{width: '70px'}}>
              View
              <VisibilityIcon />
            </MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography className="btn btn-outline-success btn-sm" variant="caption" color="text" fontWeight="medium" sx={{width: '70px'}}>
              Print
            <PrintIcon />
            </MDTypography>
          </MDBox>
          {/* <MDBox>
            <MDTypography className="btn btn-outline-secondary btn-sm" variant="caption" color="text" fontWeight="medium" sx={{width: '70px'}}>
              Edit
             <EditIcon />
            </MDTypography>
          </MDBox> */}
  
          <div className="modal fade" id="view"data-bs-toggle="modal"  data-bs-target="#view" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    }))     
  };
}
