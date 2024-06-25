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
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  let isMounted = false
  
  const getStaff = async ()=> {
    let { data: staff, error } = await supabase
    .from('staff')
    .select('*')
            
    setData(staff)
    console.log(staff)
  }

  useEffect(() => {
      const controller = new AbortController();

      if(!isMounted) {
          isMounted = true
          getStaff()
      }

      return ()=> {
          controller.abort();
      }
  }, [])

  useEffect(() => {
    const filterData = () => {
      if (search === '') {
        setFilteredData(data); // If no input, use the main array
      } else {
        const filteredArray = data.filter((item) => {
          // Get an array of all values in the item object
          const values = Object.values(item);
  
          // Check if any value includes the search term
          const found = values.some((value) => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(search.toLowerCase());
            }
            return false;
          });
  
          return found;
        });
  
        setFilteredData(filteredArray);
      }
    };
  
    filterData();
  }, [data, search]); 

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

    if (error) {
      Swal.fire({
        title: "Error!",
        text: `There was an error deleting the customer: ${error.message}`,
        icon: "error"
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Employee has been added.",
        icon: "success"
      });

      getStaff();
    }
  }

  const handleModal = (data)=> {
    setStaff(data)
  }

  const handleDelete = async (staff)=> {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', staff)

        if (error) {
          Swal.fire({
            title: "Error!",
            text: `There was an error deleting the customer: ${error.message}`,
            icon: "error"
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Staff has been deleted.",
            icon: "success"
          });
          getStaff();
        }
      }
    });
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
                      onChange={(e)=> setSearch(e.target.value)}
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

                <MDBox p={2}>
                  <Grid container spacing={2}>
                    {filteredData?.map((staff)=> 
                      <Grid key={staff.id} item xs={12} mb={3} xl={2}>
                        <Card >
                          <CardActionArea data-bs-toggle="modal" data-bs-target="#staff" onClick={()=> handleModal(staff)}>
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
                              <MDTypography variant="h6" color="success">
                                {staff.phone}
                              </MDTypography>
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

      {/* Add Employee Modal */}
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
              <div className="text-end">
                <Button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleStaff}>Save</Button>
                <Button color="info" data-bs-dismiss="modal">Close</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Employee Modal */}
      <div className="modal fade" id="staff" tabIndex="-1" aria-labelledby="staff" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staff">Staff Information</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Grid container spacing={3}>
                <Grid item md={5} xs={12}>
                  <img src={staff.image} className="img-thumbnail" alt="staff image"/>
                </Grid>
                <Grid item md={7} xs={12}>
                  <Typography variant="h6" component="div">
                    Name
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {staff.name}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Email
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {staff.email}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Phone
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {staff.phone}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Address
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {staff.address}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Salary
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                   Ghc {staff.salary}
                  </MDTypography>

                </Grid>
              </Grid>
              <div className="text-end">
                {/* <Button variant="text" startIcon={<CloseIcon />} data-bs-dismiss="modal">close</Button> */}
                <Button variant="text" startIcon={<EditIcon />}>Edit</Button>
                <Button variant="text" startIcon={<DeleteIcon />} color="error" data-bs-dismiss="modal" onClick={()=> handleDelete(staff.id)}>Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Employees;
