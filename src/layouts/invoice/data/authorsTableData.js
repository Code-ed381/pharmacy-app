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
import Swal from 'sweetalert2';

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
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

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
  
  const dateChange = (timestamp)=> {
  
    // Parse the timestamp into a Date object
    const date = new Date(timestamp);
  
    // Extract the year, month, and day
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');

    // Format the future date with options for day, month, year, and weekday
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);
    
    // Format the date as YYYY-MM-DD
    // const formattedDate = `${day}-${month}-${year}`;
    
    return formattedDate; // Output: "2024-05-26"
    
  }

  function calculateInstallmentDate(purchaseDate, weeks) {
    // Convert the purchase date to a Date object
    let date = new Date(purchaseDate);
    
    // Calculate the number of days to add (weeks * 7)
    let daysToAdd = weeks * 7;
  
    // Add the days to the date
    date.setDate(date.getDate() + daysToAdd);

    // Format the future date with options for day, month, year, and weekday
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let futureDate = date.toLocaleDateString('en-US', options);

    return futureDate;
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
  const [data, setData] = useState([]);
  const [sales, setSales] = useState([]);
  
  const getSalesDetail = async ()=> {
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

  const getSales = async ()=> {
    let { data: sales, error } = await supabase
    .from('sales')
    .select(`
      *,
      customers(*)
    `)

    setSales(sales)
  }

  useEffect(() => {
    const controller = new AbortController();

    if(!isMounted) {
      isMounted = true

      getSalesDetail();
      getSales();
    };

    return ()=> {
      controller.abort();
    }
  }, [])

  const handleView = async (item) => {
    setInvoice(item)

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
    // Filters
    .eq('sales_id', item?.id)

    setMedicines(sales_detail)
    console.log(item)
  }

  const handleDelete = async (invoice) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {  // Make this function async
      if (result.isConfirmed) {
        const { error } = await supabase
          .from('sales')
          .delete()
          .eq('id', invoice);
  
        if (error) {
          Swal.fire({
            title: "Error!",
            text: `There was an error deleting the invoice: ${error.message}`,
            icon: "error"
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Invoice has been deleted.",
            icon: "success"
          });
          getSalesDetail();
        }
      }
    });
  };
        

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

    rows: sales?.map(item => ({ 
      author: <Author image={item?.customers?.image} name={item?.customers?.name} email={item?.customers?.email} />,
      medicine: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
         {item?.id}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={item?.payment_mode} color={item?.payment_mode === 'cash' ? 'info' : 'warning'} variant="gradient" size="lg" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {dateChange(item?.created_at)}
        </MDTypography>
      ),
      amount: (
        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
          {item?.total_amount.toLocaleString('en-US')}
        </MDTypography>
      ),
      paid: (
        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
          {item?.paid.toLocaleString('en-US')}
        </MDTypography>
      ),
      balance: (
        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
          {(item?.total_amount - item?.paid).toLocaleString('en-US')}
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
  
          {/* Modal for view invoice */}
          <div className="modal fade" id="view"data-bs-toggle="modal"  data-bs-target="#view" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Invoice</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-start">
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <div className="mb-3">
                        <MDTypography component="h6" mb={1} variant="subtitle2" color="text" fontWeight="medium">
                          Customer Information
                        </MDTypography>

                        <Grid container spacing={1}>
                          <Grid item xs={12} md={5}>
                            <img src={invoice?.customers?.image} className="img-thumbnail" alt="customer image"/>
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                              Name
                            </MDTypography>
                            <label className="form-label">{invoice?.customers?.name}</label>

                            <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                              Phone
                            </MDTypography>
                            <label className="form-label">{invoice?.customers?.tel}</label>

                            <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                              Email
                            </MDTypography>
                            <label className="form-label">{invoice?.customers?.email}</label>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <MDTypography component="h6" variant="body2" color="text" fontWeight="medium">
                        Billing Information
                      </MDTypography>
                      <div className="mb-3">
                        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                          Mode of Payment
                        </MDTypography>
                        <MDBadge badgeContent={invoice?.payment_mode} color={invoice?.payment_mode === 'cash' ? 'info' : 'warning'} variant="gradient" size="lg" />
                      </div>
                      { invoice?.payment_mode === "momo" ? (
                        <div className="mb-3">
                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            Installment Duration 
                          </MDTypography>
                          <label className="form-label">{invoice?.installment} weeks</label>

                          <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                            Due Date
                          </MDTypography>
                          <label className="form-label">{calculateInstallmentDate(invoice?.created_at, invoice?.installment)}</label>
                        </div>
                      ) : (
                        " "
                      ) }
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <div className="mb-3">
                        <MDTypography component="h6" variant="body2" color="text" fontWeight="medium">
                          Invoice Information
                        </MDTypography>
                        <MDTypography component="h6" variant="caption" color="text" fontWeight="medium">
                          Date
                        </MDTypography>
                        <label htmlFor="exampleFormControlInput1" className="form-label">{dateChange(invoice?.created_at)}</label>
                        <MDBadge badgeContent={invoice?.sales?.payment_mode} color={invoice?.sales?.payment_mode === 'cash' ? 'info' : 'warning'} variant="gradient" size="lg" />
                      </div>
                    </Grid>
                  </Grid>
                  <hr/>
                  <MDTypography component="h6" variant="body2" color="text" fontWeight="medium">
                    Items
                  </MDTypography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                      <table className="table table-sm table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit Price (Ghc)</th>
                            <th scope="col">Total Price (Ghc)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicines?.map((medicine)=> 
                            <tr key={medicine.id}>
                              <th scope="row">{medicine.id}</th>
                              <td>{medicine.medicine.name}</td>
                              <td>{medicine.quantity}</td>
                              <td>{medicine.unit_price}</td>
                              <td>{medicine.total_price}</td>
                            </tr>
                          )}
                          <tr>
                            <td colSpan="4" className="text-end"><strong>Total</strong></td>
                            <td><strong> {(invoice?.total_amount)}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="text-end">
                        <Button variant="text" startIcon={<DeleteIcon />} onClick={()=> handleDelete(invoice?.id)}>
                          Delete invoice
                        </Button>
                        <Button variant="text" startIcon={<LocalPrintshopIcon />}>
                          Print Invoice
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    }))     
  };
}
