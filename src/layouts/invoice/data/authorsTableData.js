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
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
  
  const [invoice, setInvoice] = useState([]);
  const [medicines, setMedicines] = useState([]);

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
      }

      getMedicine();
    };

    return ()=> {
      controller.abort();
    }
  }, [])


  const handleView = async (item) => {
    setInvoice(item)

    let { data: sales_detail, error } = await supabase
    .from('sales_detail')
    .select(`*,
      medicine(*)`
    )
    // Filters
    .eq('sales_id', item?.sales_id)

    setMedicines(sales_detail)
    console.log(sales_detail)
  }
        

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
            <MDTypography className="btn btn-outline-primary btn-sm" variant="caption" color="text" fontWeight="medium" onClick={()=> handleView(item)} data-bs-toggle="modal" data-bs-target="#view" sx={{width: '70px'}}>
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
  
          <div className="modal fade" id="view"data-bs-toggle="modal"  data-bs-target="#view" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Invoice</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-start">
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={5}>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Customer Information</label>
                        {/* <img src={invoice?.sales?.customers?.image} width='100' height="100" className="img-thumbnail" alt="customer image"/> */}
                        
                        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                          Name
                        </MDTypography>

                        <MDTypography component="h6" mb={1} variant="subtitle2" color="text" fontWeight="medium">
                            {invoice?.sales?.customers?.name}
                        </MDTypography>

                        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                          Phone
                        </MDTypography>

                        <MDTypography component="h6" mb={1} variant="subtitle2" color="text" fontWeight="medium">
                          {invoice?.sales?.customers?.tel}
                        </MDTypography>

                        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                          Email
                        </MDTypography>

                        <MDTypography component="h6" mb={1} variant="subtitle2" color="text" fontWeight="medium">
                          {invoice?.sales?.customers?.email}
                        </MDTypography>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Billing Information</label>
                        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                          Mode of Payment
                        </MDTypography>
                        <MDBadge badgeContent={invoice?.sales?.payment_mode} color={invoice?.sales?.payment_mode === 'cash' ? 'info' : 'warning'} variant="gradient" size="lg" />
                      </div>
                      { invoice?.sales?.payment_mode === "momo" ? (
                        <div className="mb-3">
                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            Duration
                          </MDTypography>
                          <MDTypography component="h6" variant="body2" color="text" fontWeight="medium">
                            Duration
                          </MDTypography>
                        </div>
                      ) : (
                        " "
                      ) }
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Billing Information</label>
                        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                          Mode of Payment
                        </MDTypography>
                        <MDBadge badgeContent={invoice?.sales?.payment_mode} color={invoice?.sales?.payment_mode === 'cash' ? 'info' : 'warning'} variant="gradient" size="lg" />
                      </div>
                      <div className="mb-3">
                        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                          Date
                        </MDTypography>
                      </div>
                    </Grid>
                  </Grid>
                  <hr/>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Items Information</label>
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
                          {medicines?.map((medicine)=> 
                            <tr key={medicine.id}>
                              <th scope="row">{medicine.id}</th>
                              <td>{medicine.medicine.name}</td>
                              <td>{medicine.quantity}</td>
                              <td>{medicine.unit_price}</td>
                              <td>{medicine.total_price.toLocaleString('en-US')}</td>
                            </tr>
                          )}
                          <tr>
                            <td colSpan="4" className="text-end"><strong>Total</strong></td>
                            <td><strong> {invoice?.sales?.total_amount.toLocaleString('en-US')}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid>
                  </Grid>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{width: '100px'}}>Close</button>
                  <button type="button" className="btn btn-primary" style={{width: '100px'}}>Print</button>
                </div>
              </div>
            </div>
          </div>
  
  
        </>
      ),
    }))     
  };
}
