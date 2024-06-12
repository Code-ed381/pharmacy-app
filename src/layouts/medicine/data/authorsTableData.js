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


import { useEffect, useState } from "react";

// Supabase Client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pedlcwbxzcjuzwdupgwk.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGxjd2J4emNqdXp3ZHVwZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEwNzQsImV4cCI6MjAyOTAwNzA3NH0.7GZC7LjXsoUgSHXLHDvblNPoC0y_v9UjDBYiAwLywAw";
const supabase = createClient(supabaseUrl, supabaseKey)

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';

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
      {/* <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography> */}
      <MDTypography variant="caption" sx={{fontSize: '14px'}}>{description}</MDTypography>
    </MDBox>
  );

  const [data, setData] = useState([]);

  let isMounted = false

  useEffect(() => {
    const controller = new AbortController();

    if(!isMounted) {
      isMounted = true

      const getMedicine = async ()=> {
        let { data: medicine, error } = await supabase
        .from('medicine')
        .select('*')
        
        setData(medicine);
        console.log(medicine);
      }
      getMedicine()
    } 


    return ()=> {
      controller.abort();
    }
}, [])

  return {
    columns: [
      { Header: "Medicine name", accessor: "author", width: "30%", align: "left"  },
      { Header: "Description", accessor: "description", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Price (Ghc)", accessor: "price", align: "center" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "expiry date", accessor: "date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    // rows: [
    //   {
    //     author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
    //     function: <Job title="Manager" description="Organization" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="wholesale" color="info" variant="gradient" size="lg" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         23/04/18
    //       </MDTypography>
    //     ),
    //     action: (
    //       <>
    //         <MDBox>
    //           <VisibilityIcon />
    //           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //             View
    //           </MDTypography>
    //         </MDBox>

    //         <MDBox>
    //           <EditIcon />
    //           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //             Edit
    //           </MDTypography>
    //       </MDBox>
    //       </>
    //     ),
    //   },
    //   {
    //     author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
    //     function: <Job title="Programator" description="Developer" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="Retail" color="dark" variant="gradient" size="lg" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         11/01/19
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
    //     function: <Job title="Executive" description="Projects" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         19/09/17
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
    //     function: <Job title="Programator" description="Developer" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         24/12/08
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
    //     function: <Job title="Manager" description="Executive" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         04/10/21
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
    //     function: <Job title="Programator" description="Developer" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         14/09/20
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },
    // ],


    rows: data?.map(item => ({
      author: <Author image={team2} name={item.name} email={item.email} />,
      description: <Job title={item.title} description={item.description} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={item.status} color="info" variant="gradient" size="lg" />
        </MDBox>
      ),
      price: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.price}
        </MDTypography>
      ),
      quantity: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.quantity}
        </MDTypography>
      ),
      date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.expiry_date}
        </MDTypography>
      ),
      action: (
        <>
            <MDBox>
              <MDTypography className="btn btn-outline-primary btn-sm" variant="caption" color="text" fontWeight="medium" data-bs-toggle="modal" data-bs-target="#view">
                View
                <VisibilityIcon />
              </MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography className="btn btn-outline-secondary btn-sm" variant="caption" color="text" fontWeight="medium">
                Edit
               <EditIcon />
              </MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography className="btn btn-outline-danger btn-sm" variant="caption" color="text" fontWeight="medium">
                Delete
              <DeleteIcon />
              </MDTypography>
            </MDBox>
        </>
      ),
    }))
  };
}
