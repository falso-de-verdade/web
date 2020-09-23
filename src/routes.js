/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import ResidentList from "views/resident/ResidentList";
import ResidentModel from "views/resident/ResidentModel"

//import ResidentRegistration from 'views/moradores/ResidentRegistration.jsx';

import { OutbuildingList, OutbuildingModel, FindOutbuilding } from "views/outbuilding";

import Condominios from "views/condominios/ListaCondominios.jsx";

import Agendamento from "views/agendamentos/Agendamento.jsx";
import ListaAgendamentos from "views/agendamentos/ListaAgendamentos.jsx";

import Diversos from "views/diversos";

const dashboardRoutes = [
  /*  {
     path: "/dashboard",
     name: "Dashboard",
     icon: "pe-7s-graph",
     component: Dashboard,
     layout: "/admin"
   }, */

  /**rota clientes */
  {
    path: "/residents",
    name: "Moradores",
    icon: "pe-7s-user",
    component: ResidentList,
    layout: "/admin"
  },

  {
    path: "/resident/:id",
    name: "Moradores",
    icon: "pe-7s-user",
    component: ResidentModel,
    layout: "/admin",
    redirect: true
  },

  /*  {
     path: "/ResidentRegistration/:id",
     name: "Morador",
     icon: "pe-7s-user",
     component: ResidentRegistration,
     layout: "/admin",
     redirect: true
   },
 
   {
     path: "/ResidentRegistration",
     name: "Morador",
     icon: "pe-7s-user",
     component: ResidentRegistration,
     layout: "/admin",
     redirect: true
   }, */

  /**rota dependencias */
  {
    path: "/outbuildings",
    name: "Dependencias",
    icon: "pe-7s-box2",
    component: OutbuildingList,
    layout: "/admin"
  },

  {
    path: "/outbuilding/:id",
    name: "Dependencia",
    icon: "pe-7s-user",
    component: FindOutbuilding,
    layout: "/admin",
    redirect: true
  },

  {
    path: "/outbuilding",
    name: "Dependencia",
    icon: "pe-7s-user",
    component: OutbuildingModel,
    layout: "/admin",
    redirect: true
  },

  {
    path: "/agendamentos",
    name: "Agendamentos",
    icon: "pe-7s-date",
    component: ListaAgendamentos,
    layout: "/admin"
  },

  {
    path: "/agendamento/:id",
    name: "Agendamento",
    icon: "pe-7s-date",
    component: Agendamento,
    layout: "/admin",
    redirect: true
  },

  {
    path: "/agendamento",
    name: "Agendamento",
    icon: "pe-7s-date",
    component: Agendamento,
    layout: "/admin",
    redirect: true
  },

  {
    path: "/diversos",
    name: "Diversos",
    icon: "pe-7s-more",
    layout: "/admin",
    component: Diversos
  },

  /**rota transportadora */


  /*
    {
      path: "/notas",
      name: "Notas Fiscais",
      icon: "pe-7s-cloud",
      component: ListaNotas,
      layout: "/admin"
    },
  
    {
      path: "/nota/:id",
      name: "Nota Fiscal",
      icon: "pe-7s-cloud",
      component: Nota,
      layout: "/admin",
      redirect: true
    },
  
    {
      path: "/nota",
      name: "Nota Fiscal",
      icon: "pe-7s-cloud",
      component: Nota,
      layout: "/admin",
      redirect: true
    },
  
    {
      path: "/user",
      name: "User Profile",
      icon: "pe-7s-user",
      component: UserProfile,
      layout: "/admin"
    },
    {
      path: "/table",
      name: "Table List",
      icon: "pe-7s-note2",
      component: TableList,
      layout: "/admin"
    },
    {
      path: "/typography",
      name: "Typography",
      icon: "pe-7s-news-paper",
      component: Typography,
      layout: "/admin"
    },
  
    {
      path: "/icons",
      name: "Icons",
      icon: "pe-7s-science",
      component: Icons,
      layout: "/admin"
    },
    {
      path: "/maps",
      name: "Maps",
      icon: "pe-7s-map-marker",
      component: Maps,
      layout: "/admin"
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: "pe-7s-bell",
      component: Notifications,
      layout: "/admin"
    },*/
  {
    path: "/config",
    name: "Configurações",
    icon: "pe-7s-config",
    component: Condominios,
    layout: "/admin"
  }

];

export default dashboardRoutes;
