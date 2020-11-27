import React from "react";

import { FindModel } from "views/common";
import MeetingDomain from "domains/meetings";

import MeetingModel from "./MeetingModel";

// const findFunction = modelId => {
//   return {
//     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis totam repudiandae vero explicabo magnam quidem, sequi nisi facilis blanditiis? Distinctio repellendus eius ex vel deleniti dolorum, optio saepe omnis nihil?",
//     schedule: "30/09/2020",
//     start: "19h30",
//     duration: "1h30"
//   }
// }

const FindMeeting = props => (
  <FindModel 
      component={MeetingModel}
      domain={MeetingDomain}
      {...props}
    />
)

export default FindMeeting;