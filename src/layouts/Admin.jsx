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
import React, { Component } from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";
import { UserAuthContext } from "contexts";
import image from "assets/img/sidebar-3.jpg";

// class Admin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       _notificationSystem: null,
//       image: image,
//       color: "azure",
//       hasImage: false,
//       fixedClasses: "dropdown show-dropdown open"
//     };
//   }

//   handleNotificationClick = (position, color, mensagem) => {    
//     var level;
//     var icone;

//     switch (color) {
//       case 1:
//         level = "success";
//         icone = "pe-7s-like2";
//         break;
//       case 2:
//         level = "warning";
//         icone = "pe-7s-attention";
//         break;
//       case 3:
//         level = "error";
//         icone = "pe-7s-close-circle";
//         break;
//       case 4:
//         level = "info";
//         icone = "pe-7s-like2";
//         break;
//       default:
//         break;
//     }
//     this.state._notificationSystem.addNotification({
//       title: <span data-notify="icon" className={icone} />,
//       message: (        
//           mensagem        
//       ),
//       level: level,
//       position: position,
//       autoDismiss: 3
//     });
//   };



//   getRoutes = routes => {
//     return routes.map((prop, key) => {
//       if (prop.layout === "/admin") {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             render={props => (
//               <prop.component
//                 {...props}
//                 handleClick={this.handleNotificationClick}
//               />
//             )}
//             key={key}
//           />
//         );
//       } else {
//         return null;
//       }
//     });
//   };

//   getBrandText = path => {
//     for (let i = 0; i < routes.length; i++) {
//       if (
//         this.props.location.pathname.indexOf(
//           routes[i].layout + routes[i].path
//         ) !== -1
//       ) {
//         return routes[i].name;
//       }
//     }
//     return "";
//     //titulo header
//   };
  
//   handleImageClick = image => {
//     this.setState({ image: image });
//   };
//   handleColorClick = color => {
//     this.setState({ color: color });
//   };
//   handleHasImage = hasImage => {
//     this.setState({ hasImage: hasImage });
//   };
//   handleFixedClick = () => {
//     if (this.state.fixedClasses === "dropdown") {
//       this.setState({ fixedClasses: "dropdown show-dropdown open" });
//     } else {
//       this.setState({ fixedClasses: "dropdown" });
//     }
//   };
//   componentDidMount() {
//     this.setState({ _notificationSystem: this.refs.notificationSystem });
//     var _notificationSystem = this.refs.notificationSystem;
//     /*
//     var color = Math.floor(Math.random() * 4 + 1);
//     var level;
//     switch (color) {
//       case 1:
//         level = "success";
//         break;
//       case 2:
//         level = "warning";
//         break;
//       case 3:
//         level = "error";
//         break;
//       case 4:
//         level = "info";
//         break;
//       default:
//         break;
//     }
    
//     _notificationSystem.addNotification({
//       title: <span data-notify="icon" className="pe-7s-gift" />,
//       message: (
//         <div>
//           Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
//           every web developer.
//         </div>
//       ),
//       level: level,
//       position: "tr",
//       autoDismiss: 15
//     });
//     */
//   }
//   componentDidUpdate(e) {
//     if (
//       window.innerWidth < 993 &&
//       e.history.location.pathname !== e.location.pathname &&
//       document.documentElement.className.indexOf("nav-open") !== -1
//     ) {
//       document.documentElement.classList.toggle("nav-open");
//     }
//     if (e.history.action === "PUSH") {
//       document.documentElement.scrollTop = 0;
//       document.scrollingElement.scrollTop = 0;
//       this.refs.mainPanel.scrollTop = 0;
//     }
//   }
//   render() {
//     return (
//       <div className="wrapper">
//         <NotificationSystem ref="notificationSystem" style={style} />
//         <Sidebar {...this.props} routes={routes} image={this.state.image}
//         color={this.state.color}
//         hasImage={this.state.hasImage}/>
//         <div id="main-panel" className="main-panel" ref="mainPanel">
//           <AdminNavbar
//             {...this.props}
//             brandText={this.getBrandText(this.props.location.pathname)}
//           />
//           <Switch>{this.getRoutes(routes)}</Switch>
          
          

//           {/*
          
//           <Footer />
          
//           <FixedPlugin
//             handleImageClick={this.handleImageClick}
//             handleColorClick={this.handleColorClick}
//             handleHasImage={this.handleHasImage}
//             bgColor={this.state["color"]}
//             bgImage={this.state["image"]}
//             mini={this.state["mini"]}
//             handleFixedClick={this.handleFixedClick}
//             fixedClasses={this.state.fixedClasses}
//           />
//           */}
//         </div>
//       </div>
//     );
//   }
// }

const getBrandText = pathname => {
  for (let i = 0; i < routes.length; i++) {
    if (
      pathname.indexOf(
        routes[i].layout + routes[i].path
      ) !== -1
    ) {
      return routes[i].name;
    }
  }
  return "";
  //titulo header
};

const mapRoutesForUser = user => {
  return routes.filter(route => !(route.requiresManager && !user.isManager) && 
                                !(route.requiresResident && user.isManager))
}

const buildRoutes = (layout, routes) => {
  return routes.map((prop, key) => {
    return (
      <Route
        path={layout + prop.path}
        render={props => (
          <prop.component {...props} />
        )}
        key={key}
      />
    );
  });
};

const Admin = props => {
  const layout = "/admin";
  const user = React.useContext(UserAuthContext);
  const availableRoutes = mapRoutesForUser(user);

  return (
    <div className="wrapper">
      <Sidebar {...props} 
        routes={availableRoutes} 
        image={image}
        color="azure" />

      <div id="main-panel" className="main-panel">
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Router {...props}>
          <Switch>
            {buildRoutes(layout, availableRoutes)}

            <Redirect to={`${layout}/page-not-found`} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default Admin;
