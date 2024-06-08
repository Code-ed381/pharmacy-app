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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';

import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton"; 

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";


import authorsTableData from "layouts/employees/data/authorsTableData";
import projectsTableData from "layouts/employees/data/projectsTableData";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";
import reportsBarChartData from "../dashboard/data/reportsBarChartData";
import reportsLineChartData from "../dashboard/data/reportsLineChartData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Finance() {
  const { sales, tasks } = reportsLineChartData;

  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5}/>

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
              Payment History
            </MDTypography>

            <Grid container spacing={1} mt={2}>
              <Grid item xs={12} md={6}>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Payments"
                  inputProps={{ 'aria-label': 'search reports' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
              </Grid>
            </Grid> 
          </MDBox>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDBox mb={1} mt={2}>
              <MDButton variant="contained" color="secondary" className='mx-2' size="medium" data-bs-toggle="modal" data-bs-target="#exampleModal">
                make payment
              </MDButton>
            </MDBox>
          </MDBox>
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        {/* <MDBox  mt={7}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Whole Sale Customers"
                  description="Monthly Sales Chart"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Retail Customers"
                  description="Monthly Sales Chart"
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        </Card>
{/* 
      <Header>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header> */}

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{maxHeight: "700px", marginTop: "100px"}}>
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Invoice</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>  
            <div className="modal-body">
            {/* <Grid container spacing={1}>
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
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="mb-3 mx-5">
                  <FormControl>
                    <h6 id="demo-radio-buttons-group-label">Mode of Payment</h6>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      onChange={(e)=> setMode(e.target.value)}
                    >
                      <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                      <FormControlLabel value="momo" control={<Radio />} label="Momo" />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
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

              {mode === 'cash' ? 
                <div className="mb-3">
                  <h6>Due Date</h6>
                  <input type="date" className="form-control" id="due_date" disabled/>
                </div>
              :
                <div className="mb-3">
                  <h6>Due Date</h6>
                  <input type="date" className="form-control" id="due_date" onChange={(e)=> setDue_date(e.target.value)}/>
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
              <Grid item xs={12} md={2}>
                <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Add medicine</button>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={3}>
              <Grid item xs={12} md={12}>
                <table className="table table-sm table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Unit Price (Ghc)</th>
                      <th scope="col">Total Price (Ghc)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice?.map((medicine)=> 
                      <tr key={medicine.id}>
                        <td>{medicine.name}</td>
                        <td>{medicine.quantity}</td>
                        <td>{medicine.unit_price}</td>
                        <td>{medicine.total_price}</td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="3" className="text-end">Total ==</td>
                      <td className="bg-success">{subtotal}</td>
                    </tr>
                  </tbody>
                </table>
                <a href="#" style={{fontSize: "15px"}}>Clear table</a>
              </Grid>
            </Grid> */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success ">Print</button>
              <button type="button" className="btn btn-primary" >Save</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Finance;
