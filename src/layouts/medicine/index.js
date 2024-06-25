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
import Swal from 'sweetalert2';

// Supabase Client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pedlcwbxzcjuzwdupgwk.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGxjd2J4emNqdXp3ZHVwZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEwNzQsImV4cCI6MjAyOTAwNzA3NH0.7GZC7LjXsoUgSHXLHDvblNPoC0y_v9UjDBYiAwLywAw";
const supabase = createClient(supabaseUrl, supabaseKey)

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Material UI components
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

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
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [expiry, setExpiry] = useState(new Date());
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  

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

  const styles = {
    truncate: {
      width: '200px', // Adjust the width as needed
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

  let isMounted = false
  
  const getMedicine = async ()=> {
    let { data: medicine, error } = await supabase
    .from('medicine')
    .select('*')
            
    setItems(medicine)
  }

  useEffect(() => {
    const controller = new AbortController();
    
    if(!isMounted) {
      isMounted = true

      getMedicine();
    }
    
    return ()=> {
      controller.abort();
    }
  }, [])
  
  useEffect(() => {
    const filterData = () => {
      if (search === '') {
        setFilteredData(items); // If no input, use the main array
      } else {
        const filteredArray = items.filter((item) => {
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
  }, [items, search]); 
  
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
        img: img
      },
    ])
    .select()

    if(error) {
      Swal.fire({
        title: "Error!",
        text: `There was an error deleting the customer: ${error.message}`,
        icon: "error"
      });
    }
    else {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });

      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setExpiry('');
      setImg('');
    }
    
    console.log(data || error)
  }

  const handleModal = (data) => {
    setMedicine(data)
  }

  const handleDelete = async (medicine) => {
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
          .from('medicine')
          .delete()
          .eq('id', medicine);
  
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

          getMedicine();
        }
      }
    });
  };

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
                      onChange={(e)=> setSearch(e.target.value)}
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

              <MDBox>
                <Grid container spacing={1} mx={2} my={2}>
                  <MDButton variant="contained" color="secondary" size="medium" data-bs-toggle="modal" data-bs-target="#add_medicine">
                    add medicine
                  </MDButton>
                </Grid>

                <Grid container spacing={2} p={2}>
                  {filteredData?.map((item)=> 
                    <Grid item md={2} xs={12} sx={{padding: 2}} key={item.id}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea data-bs-toggle="modal" data-bs-target="#medicine">
                          <CardMedia
                            component="img"
                            height="140"
                            image={item?.img}
                            alt={item?.name}
                            onClick={()=> handleModal(item)}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {item?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={styles.truncate}>
                              {item?.description}
                            </Typography>
                          <MDTypography variant="h6" color="success">
                            Ghc {item?.price}.00
                          </MDTypography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                  )}
                </Grid>

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Add Medicine Modal */}
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
                  value={name}
                  onChange={(e)=> {setName(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Quantity</h6>
                <input 
                  type="number" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  value={quantity}
                  onChange={(e)=> {setQuantity(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Unit Price</h6>
                <input 
                  type="number" 
                  className="form-control" 
                  id="exampleFormControlInput1"
                  value={price}
                  onChange={(e)=> {setPrice(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Expiry Date</h6>
                <input 
                  type="date" 
                  className="form-control" 
                  id="expiry"
                  value={expiry}
                  onChange={(e)=> {setExpiry(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>img</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="image"
                  value={img}
                  onChange={(e)=> {setImg(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Description</h6>
                <textarea 
                  className="form-control" 
                  id="exampleFormControlTextarea1" 
                  rows="3"
                  value={description}
                  onChange={(e)=> {setDescription(e.target.value)}}
                ></textarea>
              </div>
              <div className="text-end">
                <Button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddMedicine}>Save</Button>
                <Button color="info" data-bs-dismiss="modal">Close</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Medicine Modal */}
      <div className="modal fade" id="medicine" tabIndex="-1" aria-labelledby="medicine" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staff">Medicine Information</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Grid container spacing={3}>
                <Grid item md={5} xs={12}>
                  <img src={medicine.img} className="img-thumbnail" alt="medicine image"/>
                </Grid>
                <Grid item md={7} xs={12}>
                  <Typography variant="h6" component="div">
                    Name
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {medicine.name}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Unit Price
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    Ghc {medicine.price}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Quantity
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {medicine.quantity}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Expiry Date
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                    {dateChange(medicine.expiry_date)}
                  </MDTypography>

                  <Typography variant="h6" component="div">
                    Description
                  </Typography>
                  <MDTypography component="h6" variant="body2" color="text" mb={1} fontWeight="medium">
                   {medicine.description}
                  </MDTypography>

                </Grid>
              </Grid>
              <div className="text-end">
                {/* <Button variant="text" startIcon={<CloseIcon />} data-bs-dismiss="modal">close</Button> */}
                <Button variant="text" startIcon={<EditIcon />}>Edit</Button>
                <Button variant="text" startIcon={<DeleteIcon />} color="error" data-bs-dismiss="modal" onClick={()=> handleDelete(medicine.id)}>Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Medicine;
