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

import ReactToPrint from 'react-to-print';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';
import { format, parseISO } from 'date-fns';

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

import React, { useEffect, useState, useRef } from "react";

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
import logo from "assets/images/logos/logo.jpeg";



export default function data() {
  const receiptRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });
  
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

  const dateChangeWithTime = (timestamp) => {
    // Parse the timestamp into a Date object
    const date = new Date(timestamp);
    
    // Extract the year, month, and day
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    // Extract the hours, minutes, and seconds
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    
    // Format the hours, minutes, and seconds with AM/PM
    const formattedHours = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    // Format the future date with options for day, month, year, and weekday
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);
    
    // Add the formatted time to the formatted date
    formattedDate += ` ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    
    return formattedDate;
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
        {/* <MDTypography variant="caption">{email}</MDTypography> */}
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
  
  const ReceiptComponent = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'monospace', fontSize: '15px' }}>
        <div style={{ textAlign: 'center' }}>
          <img src={logo} alt="logo" width="400"/>
          {/* <h4>Top Up Pharmacy Ltd</h4> */}
          <p>ASYLUM DOWN</p>
          <p>Tel: {medicines[0]?.sales?.customers?.tel}</p>
        </div>
        <div>
          <p>Customer: {medicines[0]?.sales?.customers?.name}</p>
          <p>Invoice ID: INV-FAX-{medicines[0]?.sales?.id}</p>
          <p>Attendant: MARGARET AMEDZAH</p>
          <p>Payment Mode: {medicines[0]?.sales?.payment_mode}</p>
          <p>Date: {dateChangeWithTime(medicines[0]?.sales?.created_at)}</p>
          <p>No of Print: 1 Original</p>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Qty</th>
              <th>Description</th>
              <th>Price</th>
              <th>Form</th>
              <th>Tax</th>
              <th>Disc</th>
              <th>Size</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>MARK II INHALER </td>
              <td>15.6</td>
              <td>Single</td>
              <td>-</td>
              <td>-</td>
              <td>1</td>
              <td>15</td>
            </tr>
            <tr>
              <td>10</td>
              <td>CETRIZAN TABS 10MG EXIFER</td>
              <td>0.7</td>
              <td>Tab</td>
              <td>-</td>
              <td>-</td>
              <td>1</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p></p>
          <p>Invoice Status: Completed</p>
          <p>Cash Customer: {medicines[0]?.sales?.customers?.name}</p>
          <p>Subtotal: {medicines[0]?.sales?.total_amount.toLocaleString('en-US')}</p>
          <p>TaxTotal: {medicines[0]?.sales?.tax.toLocaleString('en-US')}</p>
          <p>Total To Pay: GHS {(medicines[0]?.sales?.total_amount + medicines[0]?.sales?.tax).toLocaleString('en-US')}</p>
          <p>Tendered: {medicines[0]?.sales?.paid.toLocaleString('en-US')}</p>
          <p>Amount Due: {(medicines[0]?.sales?.total_amount- medicines[0]?.sales?.paid).toLocaleString("en-US")}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>Software by Lavama.com</p>
          <p>+233 592 596 180</p>
        </div>
      </div>
    );
  });

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
    console.log(sales_detail)
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
      { Header: "Sub Total (GHc)", accessor: "amount", align: "center" },
      { Header: "Tax (GHc)", accessor: "tax", align: "center" },
      { Header: "Discount (GHc)", accessor: "discount", align: "center" },
      { Header: "Paid (GHc)", accessor: "paid", align: "center" },
      { Header: "balance (GHc)", accessor: "balance", align: "center" },
      { Header: "Payment Mode", accessor: "status", align: "center" },
      { Header: "date", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: sales?.map(item => ({ 
      author: <Author image={item?.customers?.image} name={item?.customers?.name} email={item?.customers?.email} />,
      medicine: (
        <MDTypography component="a" href="#"  color="text" fontWeight="medium">
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
        <MDTypography component="h5" color="text" fontWeight="medium">
          {item?.total_amount.toLocaleString('en-US')}
        </MDTypography>
      ),
      paid: (
        <MDTypography component="h5" color="text" fontWeight="medium">
          {item?.paid.toLocaleString('en-US')}
        </MDTypography>
      ),
      tax: (
        <MDTypography component="h6" color="text" fontWeight="medium">
          {item?.tax.toLocaleString('en-US')}
        </MDTypography>
      ),
      discount: (
        <MDTypography component="h6" color="text" fontWeight="medium">
          {item?.discount.toLocaleString('en-US')}
        </MDTypography>
      ),
      balance: (
        <Typography component="h6"  color="text" fontWeight="medium">
          {(item?.total_amount - item?.paid).toLocaleString('en-US')}
        </Typography>
      ),
      action: (
        <>
          <MDBox>
            <MDTypography className="btn btn-outline-primary btn-sm" variant="caption" color="text" fontWeight="medium" onClick={()=> handleView(item)} data-bs-toggle="modal" data-bs-target="#view" sx={{width: '70px'}}>
              View
              <VisibilityIcon />
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
                  <ReceiptComponent ref={receiptRef}/>
                  {/* <Grid container spacing={1}>
                    <Grid item xs={12} md={5}>
                      <div className="mb-3">
                        <Typography variant="h5" gutterBottom component="div"> 
                          Customer Information
                        </Typography>

                        <Grid container spacing={1}>
                          <Grid item xs={12} md={5}>
                            <img src={invoice?.customers?.image} className="img-thumbnail" alt="customer image"/>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="h6" component="div"> 
                              Name
                            </Typography>
                            <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                              {invoice?.customers?.name}
                            </MDTypography>

                            <Typography variant="h6" component="div"> 
                              Phone
                            </Typography>
                            <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                              {invoice?.customers?.tel}
                            </MDTypography>

                          </Grid>
                        </Grid>
                        <Typography variant="h6" component="div"> 
                          Email
                        </Typography>
                        <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                          {invoice?.customers?.email}
                        </MDTypography>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Typography variant="h5" gutterBottom component="div"> 
                        Billing Information
                      </Typography>
                      <div className="mb-3">
                        <Typography variant="h6" component="div"> 
                          Mode of Payment
                        </Typography>
                        <MDBadge badgeContent={invoice?.payment_mode} color={invoice?.payment_mode === 'cash' ? 'info' : 'warning'} variant="gradient" size="lg" />
                      </div>
                      { invoice?.payment_mode === "momo" ? (
                        <div className="mb-3">
                          <Typography variant="h6" component="div"> 
                            Installment Duration 
                          </Typography>
                          <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                            {invoice?.installment} weeks
                          </MDTypography>

                          <Typography variant="h6" component="div"> 
                            Due Date
                          </Typography>
                          <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                            {calculateInstallmentDate(invoice?.created_at, invoice?.installment)}
                          </MDTypography>

                        </div>
                      ) : (
                        " "
                      ) }
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <div className="mb-3">
                        <Typography variant="h5" gutterBottom component="div"> 
                          Invoice Information
                        </Typography>
                        <Typography variant="h6" component="div"> 
                          Date
                        </Typography>
                        <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                          {dateChange(invoice?.created_at)}
                        </MDTypography>
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
                      </Grid>
                      </Grid> */}
                      <div className="text-end">
                        <Button variant="text" startIcon={<DeleteIcon />} onClick={()=> handleDelete(invoice?.id)}>
                          Delete invoice
                        </Button>
                        <Button variant="text" startIcon={<LocalPrintshopIcon />} onClick={handlePrint}>
                          Print Invoice
                        </Button>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    }))     
  };
}
