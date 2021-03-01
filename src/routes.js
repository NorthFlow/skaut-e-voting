/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableListClass from "views/TableList/TableListClassMalySnem.js";
import Logout from 'views/LogOut/LogOut';
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Nástenka",
    rtlName: "",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Profil užívateľa",
    rtlName: "",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Hlasovanie",
    rtlName: "",
    icon: "content_paste",
    component: TableListClass,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "Odhlásiť sa",
    rtlName: "",
    icon: "input",
    component: Logout,
    layout: "/admin"
  },
];

export default dashboardRoutes;
