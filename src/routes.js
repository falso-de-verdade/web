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

import { ResidentList, FindResident } from "views/resident";

//import ResidentRegistration from 'views/moradores/ResidentRegistration.jsx';

import { OutbuildingList, OutbuildingModel, FindOutbuilding } from "views/outbuilding";

import { CondominiumList, CondominiumModel, FindCondominium } from "views/condominium";

import { ScheduleModel, ScheduleList, FindSchedule } from "views/schedule";

import Diversos from "views/diversos";
import { CollisionList, CollisionModel, FindCollision } from "views/collision";
import { TicketList, FindTicket } from "views/ticket";

//
// !!! Be carefull about route orders
//

import ListMeetings from "views/meetings/ListMeetings"
import MeetingModel from "views/meetings/MeetingModel"
import FindMeeting from "views/meetings/FindMeeting"

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
    layout: "/admin",
    requiresManager: true
  },

  {
    path: "/resident/:id",
    name: "Moradores",
    icon: "pe-7s-user",
    component: FindResident,
    layout: "/admin",
    redirect: true,
    requiresManager: true
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
    redirect: true,
    requiresManager: true
  },

  // agendamentos
  {
    path: "/schedules",
    name: "Agendamentos",
    icon: "pe-7s-date",
    component: ScheduleList,
    layout: "/admin"
  },

  {
    path: "/schedule/:id",
    name: "Agendamento",
    icon: "pe-7s-date",
    component: FindSchedule,
    layout: "/admin",
    redirect: true
  },

  {
    path: "/schedule",
    name: "Agendamento",
    icon: "pe-7s-date",
    component: ScheduleModel,
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

  {
    path: "/meetings",
    name: "Reuniões",
    icon: "pe-7s-info",
    component: ListMeetings,
    layout: "/admin",
  },
  {
    path: "/meeting",
    name: "Reunião",
    icon: "pe-7s-info",
    component: MeetingModel,
    layout: "/admin",
    redirect: true,
    requiresManager: true
  },

  {
    layout: "/admin",
    path: "/meeting/:id",
    name: "Reunião",
    icon: "pe-7s-info",
    component: FindMeeting,
    redirect: true,
    
  },
  {
    layout: "/admin",
    path: "/condominiums",
    name: "Condomínios",
    icon: "pe-7s-home",
    component: CondominiumList
  },
  {
    path: "/condominium/:id",
    name: "Atualizar condomínio",
    icon: "pe-7s-home",
    layout: "/admin",
    component: FindCondominium,
    redirect: true
  },
  {
    path: "/condominium",
    name: "Novo condomínio",
    icon: "pe-7s-home",
    layout: "/admin",
    component: CondominiumModel,
    redirect: true,
    requiresManager: true
  },

  {
    path: "/collisions",
    name: "Conflitos",
    icon: "pe-7s-ribbon",
    // icon: "pe-7s-ticket",
    layout: "/admin",
    component: CollisionList,
    requiresManager: true
  },
  {
    path: "/collision/:id",
    name: "Finalizar conflito",
    icon: "pe-7s-ribbon",
    // icon: "pe-7s-ticket",
    layout: "/admin",
    component: FindCollision,
    redirect: true,
    requiresManager: true
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "pe-7s-ticket",
    // icon: "pe-7s-ticket",
    layout: "/admin",
    component: TicketList
  },
  {
    path: "/ticket/:id",
    name: "Ticket",
    icon: "pe-7s-ticket",
    // icon: "pe-7s-ticket",
    layout: "/admin",
    component: FindTicket,
    redirect: true
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
    component: CondominiumList,
    layout: "/admin"
  }

];

export default dashboardRoutes;
