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
import { format } from 'date-fns';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// Material Icons
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import PrintIcon from '@mui/icons-material/Print';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// Supabase Client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pedlcwbxzcjuzwdupgwk.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGxjd2J4emNqdXp3ZHVwZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEwNzQsImV4cCI6MjAyOTAwNzA3NH0.7GZC7LjXsoUgSHXLHDvblNPoC0y_v9UjDBYiAwLywAw";
const supabase = createClient(supabaseUrl, supabaseKey)

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton"; 

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import BillingInformation from "layouts/billing/components/BillingInformation";

// Data 
import authorsTableData from "layouts/invoice/data/authorsTableData";
import projectsTableData from "layouts/invoice/data/projectsTableData";


function Invoice() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  
  const [mode, setMode] = useState('cash');
  const [installment, setInstallment] = useState(0);
  const [due_date, setDue_date] = useState(new Date());
  const [medicine, setMedicine] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer_id, setCustomer_id] = useState('');
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [invoice, setInvoice] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');


  const getMedicine = async ()=> {
    let { data: medicine, error } = await supabase
    .from('medicine')
    .select('*')
    
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load sales!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      setItems(medicine)
    }
  }

  const getCustomers = async ()=> {
    let { data: customers, error } = await supabase
    .from('customers')
    .select('*')
      
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load customers!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      setCustomers(customers)
    }
  }

  let isMounted = false
  
  useEffect(() => {
    const controller = new AbortController();

    if(!isMounted) {
      isMounted = true

      getCustomers();
      getMedicine();
    }

    return ()=> {
      controller.abort();
    }
  }, [])

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    quantity: '',
    unit_price: '',
    total_price: ''
  });

  // Handle form input changes
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    
    let { data: medicine, error } = await supabase
    .from('medicine')
    .select('*')
    .eq('name', value)

    setMedicine(medicine[0])
  };

  // Handle form submission to add new object to array
  const handleFormSubmit = (e) => {
    e.preventDefault();

    var helo = medicine.price * quantity

    const newEntry = {
      id: medicine.id,
      name: medicine.name,
      quantity: quantity,
      unit_price: medicine.price,
      total_price: helo
    };

    setSubtotal(subtotal + helo)
    setInvoice([...invoice, newEntry]);
  };

  const handleCustomer = async ()=> {
    const { data, error } = await supabase
    .from('customers')
    .insert([
      { 
        name: name, 
        tel: phone,
        email: email,
        address: address,
        image: image
      }
    ])
    .select()

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Add Customer Failed!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const newCustomer = {
        name: data[0].name,
        tel: data[0].tel,
        email: data[0].email,
        image: data[0].image,
        address: data[0].address
      }
  
      setCustomers([...customers, newCustomer])

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Customer added",
        showConfirmButton: false,
        timer: 1500
      });

      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setImage('');
    }
  }

  const handleSave = async ()=> {
    if (customer_id === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please choose a customer!",
        timer: 2000,
        showConfirmButton: true,
      });
    } else {
      if (mode === 'momo' && installment === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please choose an installment duration!",
          timer: 2000,
          showConfirmButton: true,
        });
      } else {
        const { data, error } = await supabase
          .from('sales')
          .insert([
            { 
              customer_id: customer_id, 
              total_amount: subtotal,
              payment_mode: mode,
              paid: paid,
              installment: installment
            },
          ])
          .select()
    
        console.log(error)
    
        const newData = data
        
        if(data != []) {
          for (let i = 0; i < invoice.length; i++) {
            const { data, error } = await supabase
            .from('sales_detail')
            .insert([
              { 
                sales_id: newData[0].id,
                medicine_id: invoice[i].id,
                quantity: invoice[i].quantity,
                unit_price: invoice[i].unit_price,
                total_price: invoice[i].total_price
              }
            ])
            .select()  
            
            console.log(data || error)
    
          }
          
          getMedicine()
        }   
        
        if(mode == 'momo') {
          const { data, error } = await supabase
          .from('creditTerms')
          .insert([
            { 
              sales_id: newData[0].id, 
              customers_id: customer_id,
              current_balance: subtotal,
              due_date: due_date,
            },
          ])
          .select()
        }

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Invoice has been saved",
          showConfirmButton: false,
          timer: 1500
        });

        setInvoice([]);
        setCustomer_id();
        setSubtotal(0);
      }
    }
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
                  Invoice Table
                </MDTypography>

                <Grid container spacing={1} mt={2}>
                  <Grid item xs={12} md={6}>
                  <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 400 }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Invoice"
                      inputProps={{ 'aria-label': 'search Invoice' }}
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
                  <MDButton variant="contained" color="secondary" size="medium" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    create invoice
                  </MDButton>
                </Grid>

                { items != [] || items != null ? (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={true}
                    entriesPerPage={true}
                    showTotalEntries={true}
                  />  
                ) : (
                  <Typography variant="body2">No data</Typography>
                ) }

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Invoice Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{maxHeight: "700px", marginTop: "100px"}}>
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Invoice</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>  
            <div className="modal-body">
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <div className="mb-3">
                  <h6>Customer Name</h6>
                  <select className="form-select" aria-label="Default select example" onChange={(e)=> setCustomer_id(e.target.value)}>
                    <option selected>-- Choose customer --</option>
                    {customers?.map((customer)=> 
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    )}
                  </select>
                </div>
                <Button startIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#newcustomer">
                  new customer
                </Button>
              </Grid>
              <Grid item xs={12} md={5}>
                <div className="mb-3 mx-5">
                  <FormControl>
                    <h6 id="demo-radio-buttons-group-label">Mode of Payment</h6>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={mode}
                      onChange={(e)=> setMode(e.target.value)}
                    >
                      <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                      <FormControlLabel value="momo" control={<Radio />} label="Momo" />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                {mode === 'cash' ? 
                  <div className="mb-3">
                    <h6>Installment Duration</h6>
                    <select className="form-select" aria-label="Default select example" disabled>
                      <option selected>-- Select Duration --</option>
                      <option value="1">2 weeks</option>
                      <option value="2">4 weeks</option>
                      <option value="3">6 weeks</option>
                      <option value="3">8 weeks</option>
                    </select>
                  </div> 
                : 
                  <div className="mb-3">
                    <h6>Installment Duration</h6>
                    <select className="form-select" aria-label="Default select example" onChange={(e)=> setInstallment(e.target.value)}>
                      <option selected>-- Select Duration --</option>
                      <option value="2">2 weeks</option>
                      <option value="4">4 weeks</option>
                      <option value="6">6 weeks</option>
                      <option value="8">8 weeks</option>
                    </select>
                  </div> 
                }
              </Grid>
            </Grid>
            <hr/>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <select className="form-select" aria-label="Disabled select example" onChange={handleInputChange}>
                  <option selected>-- Select medicine --</option>
                {items?.map((item)=> 
                    <option key={item.id} value={item.name}>{item.name}</option>
                  )}
                </select>
              </Grid>
              <Grid item xs={12} md={3}>
                <input 
                  type="number" 
                  name="quantity"
                  className="form-control" 
                  id="exampleFormControlInput1" 
                  placeholder="Quantity"
                  onChange={(e)=> setQuantity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button variant="text" startIcon={<AddIcon />} onClick={handleFormSubmit}>
                  Add medicine
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={3}>
              <Grid item xs={12} md={12}>
                <table className="table table-sm table-striped table-bordered table-hover" style={{ fontSize: 15}}>
                  <thead>
                    <tr>
                      {/* <th scope="col">#</th> */}
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Unit Price (Ghc)</th>
                      <th scope="col">Tax (Ghc)</th>
                      <th scope="col">Total Price (Ghc)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice?.map((medicine)=> 
                      <tr key={medicine.id}>
                        <td>{medicine.name}</td>
                        <td>{medicine.quantity}</td>
                        <td>{medicine.unit_price}</td>
                        <td>-</td>
                        <td>{medicine.total_price.toLocaleString('en-US')}</td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="4" className="text-end" style={{ fontWeight: "bolder"}}>Total</td>
                      <td style={{ fontWeight: "bolder"}}>{subtotal.toLocaleString('en-US')}</td>
                    </tr>
                  </tbody>
                </table>
                <Grid container> 
                  <Grid item xs={12} md={6}></Grid>
                  {/* <Grid item xs={12} md={4}></Grid> */}
                  <Grid item xs={12} md={6}>
                    <div >
                      { mode === 'cash' ? (
                        <>
                          {/* <h4 id="demo-radio-buttons-group-label">Paid</h4> */}
                          <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text">Paid</span>
                            <span className="input-group-text">GHS</span>
                            <input 
                              type="text" 
                              className="form-control" 
                              aria-label="Amount (to the nearest dollar)" 
                              onChange={(e)=> setPaid(e.target.value)}
                            />
                            <span className="input-group-text">.00</span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
                </Grid>


                <Grid container spacing={1} mt={1}>
                  <Grid item xs={12} md={3}>
                  </Grid>
                  <Grid item xs={12} md={9} className="text-end">
                    <Button variant="text" startIcon={<ClearIcon />} color="primary" onClick={()=> {setInvoice([]), setSubtotal(0)}}>Clear table</Button>
                    <Button variant="text" startIcon={<DownloadIcon />} color="primary" onClick={handleSave} data-bs-dismiss="modal">Save</Button>
                    <Button variant="text" startIcon={<PrintIcon />} color="primary">Print Receipt</Button>  
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </div>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      <div className="modal fade" id="newcustomer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Customer</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <h6>Full Name</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1" 
                  value={name}
                  placeholder="eg. John Doe"
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
                  value={phone}
                  id="exampleFormControlInput1"
                  onChange={(e)=> {setPhone(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Address</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  value={address}
                  id="exampleFormControlInput1"
                  onChange={(e)=> {setAddress(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <h6>Image URL</h6>
                <input 
                  type="text" 
                  className="form-control" 
                  value={image}
                  id="exampleFormControlInput1"
                  onChange={(e)=> {setImage(e.target.value)}}
                />
              </div>
            </div>
            <div className="modal-footer">
              {/* <Button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <Button variant="text" startIcon={<AddIcon />} color="primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleCustomer}>Add Customer</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Invoice;
