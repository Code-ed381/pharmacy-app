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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Supabase Client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pedlcwbxzcjuzwdupgwk.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGxjd2J4emNqdXp3ZHVwZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEwNzQsImV4cCI6MjAyOTAwNzA3NH0.7GZC7LjXsoUgSHXLHDvblNPoC0y_v9UjDBYiAwLywAw";
const supabase = createClient(supabaseUrl, supabaseKey)

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
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [img, setImg] = useState('');

  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  let isMounted = false
  
  useEffect(() => {
      const controller = new AbortController();

      if(!isMounted) {
          isMounted = true
          const getStaff = async ()=> {
            let { data: staff, error } = await supabase
            .from('staff')
            .select('*')
                    
            setData(staff)
            console.log(staff)
          }
          getStaff()
      }

      return ()=> {
          controller.abort();
      }
  }, [])

  const handleStaff = async ()=> {
    const { data, error } = await supabase
    .from('staff')
    .insert([
      { 
        name: name, 
        phone: phone,
        email: email,
        address: address,
        salary: salary,
        image: img
      }
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

                <MDBox>
                  <Grid container spacing={1}>
                    {data?.map((staff)=> 
                      <Grid key={staff.id} item xs={12} md={3} xl={2}>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea data-bs-toggle="modal" data-bs-target="#staff" >
                            <CardMedia
                              component="img"
                              height="140"
                              image={staff.image}
                              alt={staff.name}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {staff.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {staff.address}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                        
                      </Grid>
                    )}
                  </Grid>
                </MDBox>

              </MDBox>
            </Card>
          </Grid>
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
              <div className="mb-3">
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
                  id="email"
                  onChange={(e)=> {setEmail(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Phone Number</h6>
                <input 
                  type="number" 
                  className="form-control" 
                  id="phone"
                  onChange={(e)=> {setPhone(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Address</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="address"
                  onChange={(e)=> {setAddress(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Salary</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="salary"
                  onChange={(e)=> {setSalary(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Image URL</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="image"
                  onChange={(e)=> {setImg(e.target.value)}}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleStaff}>Save</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="staff" tabIndex="-1" aria-labelledby="staff" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staff">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Grid container spacing={1}>
                <Grid item md={5} xs={12}>
                  <img src={data.image} className="img-thumbnail" alt="staff image"/>
                </Grid>
                <Grid item md={7} xs={12}>
                  
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
    </DashboardLayout>
  );
}

export default Employees;
