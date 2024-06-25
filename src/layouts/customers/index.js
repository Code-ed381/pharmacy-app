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

import { useEffect, useState } from "react";

import Button from '@mui/material/Button';

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';

// Supabase Client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pedlcwbxzcjuzwdupgwk.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGxjd2J4emNqdXp3ZHVwZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEwNzQsImV4cCI6MjAyOTAwNzA3NH0.7GZC7LjXsoUgSHXLHDvblNPoC0y_v9UjDBYiAwLywAw";
const supabase = createClient(supabaseUrl, supabaseKey)

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import BillingInformation from "layouts/billing/components/BillingInformation";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Data
import authorsTableData from "layouts/employees/data/authorsTableData";
import projectsTableData from "layouts/employees/data/projectsTableData";

import MDButton from "components/MDButton"; 
import TextField from '@mui/material/TextField';

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Customers() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  let isMounted = false
  
  const getCustomers = async ()=> {
    let { data: customers, error } = await supabase
    .from('customers')
    .select('*')
            
    setData(customers)
    console.log(customers)
  }

  useEffect(() => {
      const controller = new AbortController();

      if(!isMounted) {
        isMounted = true
        getCustomers()
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

  const handleCustomer = async ()=> {
    const { data, error } = await supabase
    .from('customers')
    .insert([
      { 
        name: name, 
        tel: phone,
        email: email,
        address: address
      }
    ])
    .select()

    alert(data || error)
        
  }

  const handleModal = (data)=> {
    setCustomer(data)
  }

  const handleDelete = async (customer)=> {
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
        .from('customers')
        .delete()
        .eq('id', customer)

        if (error) {
          Swal.fire({
            title: "Error!",
            text: `There was an error deleting the customer: ${error.message}`,
            icon: "error"
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          getCustomers();
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
                  Customers
                </MDTypography>

                <Grid container spacing={1} mt={2}>
                  <Grid item xs={12} md={6}>
                  <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Customers"
                      inputProps={{ 'aria-label': 'search Customers' }}
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
                    add customer
                  </MDButton>
                </Grid>
                
                <MDBox p={2}>
                  <Grid container spacing={1}>
                    {filteredData?.map((customer)=> 
                      <Grid key={customer.id} item xs={12} md={3} xl={2}>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={customer.image}
                              alt={customer.name}
                              onClick={()=> handleModal(customer)}
                              data-bs-toggle="modal" data-bs-target="#exampleModal"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {customer.name}
                              </Typography>
                              <MDTypography variant="h6" color="success">
                                {customer.tel}
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

      {/* Add Customer Modal */}
      <div className="modal fade" id="customer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New Customer</h1>
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
                  value={name}
                  onChange={(e)=> {setName(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Email</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  value={email}
                  onChange={(e)=> {setEmail(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Phone Number</h6>
                <input 
                  type="number" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  value={phone}
                  onChange={(e)=> {setPhone(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Address</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  value={address}
                  onChange={(e)=> {setAddress(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Image URL</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  value={image}
                  onChange={(e)=> {setImage(e.target.value)}}
                />
              </div>
              <div className="text-end">
                <Button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCustomer}>Save</Button>
                <Button color="info" data-bs-dismiss="modal">Close</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- View CUstomer Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Customer Information</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Grid container spacing={3}>
                <Grid item md={5} xs={12}>
                  <img src={customer.image} className="img-thumbnail" alt="customer image"/>
                </Grid>
                <Grid item md={7} xs={12}>
                  <Typography variant="h6" component="div">
                    Name
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {customer.name}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Email
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {customer.email}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Phone
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {customer.tel}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Address
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {customer.address}
                  </MDTypography>
                </Grid>
              </Grid>
              <div className="text-end">
                <Button variant="text" startIcon={<EditIcon />}>Edit</Button>
                <Button variant="text" startIcon={<DeleteIcon />} color="error" data-bs-dismiss="modal" onClick={()=> handleDelete(customer.id)}>Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Customers;
