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

// @mui material components
import Card from "@mui/material/Card";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Bill from "layouts/billing/components/Bill";

import TextField from '@mui/material/TextField';

function BillingInformation() {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Billing Information
        </MDTypography>

        <Grid container spacing={1}>
          <MDBox mb={3} pt={3} px={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={2}>
                <MDButton variant="contained" color="info" size="medium">
                  add invoice
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>

        <MDBox mb={3} pt={3} px={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              <select className="form-select" aria-label="Default select example">
                <option selected>Companies</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Grid>
            <Grid item xs={12} md={2}>
              <select className="form-select" aria-label="Default select example">
                <option selected>Medicine</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Grid>
            <Grid item xs={12} md={2}>
              <select className="form-select" aria-label="Default select example">
                <option selected>Invoice ID</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Grid>
            <Grid item xs={12} md={2}>
              <select className="form-select" aria-label="Default select example">
                <option selected >Customer type</option>
                <option value="1">Wholesale</option>
                <option value="2">Retail</option>
              </select>
            </Grid>
            <Grid item xs={12} md={3}>
              <MDButton variant="contained" color="info" size="medium">
                search
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
        {/* <Grid container spacing={1}>
        </Grid> */}
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
          <Bill
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            vat="FRB1235476"
            noGutter
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
