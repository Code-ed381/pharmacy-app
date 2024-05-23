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

import { useEffect, useState } from "react";

// Supabase Client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pedlcwbxzcjuzwdupgwk.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGxjd2J4emNqdXp3ZHVwZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEwNzQsImV4cCI6MjAyOTAwNzA3NH0.7GZC7LjXsoUgSHXLHDvblNPoC0y_v9UjDBYiAwLywAw";
const supabase = createClient(supabaseUrl, supabaseKey)

// Material UI components
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
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
import authorsTableData from "layouts/medicine/data/authorsTableData";

import MDButton from "components/MDButton"; 
import TextField from '@mui/material/TextField';

function Medicine() {
  const { columns, rows } = authorsTableData();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [expiry, setExpiry] = useState(new Date());

  const handleAddMedicine = async ()=> {
    const { data, error } = await supabase
    .from('medicine')
    .insert([
      { 
        name: name, 
        description: description,
        price: price,
        quantity: quantity,
        expiry_date: expiry, 
      },
    ])
    .select()
    
    console.log(data || error)
  }

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
                  Medicines
                </MDTypography>

                <Grid container spacing={1} mt={2}>
                  <Grid item xs={12} md={6}>
                  <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Medicines"
                      inputProps={{ 'aria-label': 'search medicines' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  </Grid>
                  {/* <Grid item xs={12} md={3}>

                  </Grid> */}
                </Grid> 
              </MDBox>

              <MDBox >
                <Grid container spacing={1} mx={2} my={2}>
                  <MDButton variant="contained" color="secondary" size="medium" data-bs-toggle="modal" data-bs-target="#add_medicine">
                    add medicine
                  </MDButton>
                </Grid>

                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  
                />  

                <div className="modal fade" id="add_medicine" tabIndex="-1" aria-labelledby="add_medicine" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add medicine</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-3">
                          <h6>Name of Medicine</h6>
                          <input 
                            type="email" 
                            className="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="eg. Flucocassilin"
                            onChange={(e)=> {setName(e.target.value)}}
                          />
                        </div>
                        <div className="mb-3">
                          <h6>Quantity</h6>
                          <input 
                            type="number" 
                            className="form-control" 
                            id="exampleFormControlInput1"
                            onChange={(e)=> {setQuantity(e.target.value)}}
                          />
                        </div>
                        <div className="mb-3">
                          <h6>Unit Price</h6>
                          <input 
                            type="number" 
                            className="form-control" 
                            id="exampleFormControlInput1"
                            onChange={(e)=> {setPrice(e.target.value)}}
                          />
                        </div>
                        <div className="mb-3">
                          <h6>Expiry Date</h6>
                          <input 
                            type="date" 
                            className="form-control" 
                            id="exampleFormControlInput1"
                            onChange={(e)=> {setExpiry(e.target.value)}}
                          />
                        </div>
                        <div className="mb-3">
                          <h6>Description</h6>
                          <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3"
                            onChange={(e)=> {setDescription(e.target.value)}}
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleAddMedicine}>Save</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Medicine;
