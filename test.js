const handleImageChange = (e) => {
    setSelectedImgs([]);
    const files = e.target.files;

    // Validate up to 4 images
    if (files.length + selectedImgs.length > 4) {
      alert('You can upload up to 4 images.');
      return;
    }

    const newImages = Array.from(files).map((file) => ({
      id: Date.now(), // Add a unique identifier to each image
      photo: URL.createObjectURL(file),
      newImage: file,
    }));

    setSelectedImgs((prevImgs) => [...prevImgs, ...newImages]);
  };

   {/* IconButton for Update */}
                            {/* <IconButton aria-label="update" onClick={handleUpdate}>
                              <EditIcon />
                            </IconButton> */}


                            


// sudo apt install nginx

// sudo nano /etc/nginx/sites-available/default
// Add the following to the location part of the server block

//     server_name yourdomain.com www.yourdomain.com;

//     location / {
//         proxy_pass http://localhost:8001; #whatever port your app runs on
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;
//     }



// sudo add-apt-repository ppa:certbot/certbot
// sudo apt-get update
// sudo apt-get install python3-certbot-nginx
// sudo certbot --nginx -d admin.pickneybank.com
// no-reply@pickneybank.com
// 9910205645
// http://admin.pickneybank.com/

// sudo apt uninstall nginx
// vm-pickney-backend
// pickney
// PB_bank1231234
// pickneybank@gmail.com@57.151.115.0

// git clone https://github.com/sarvar404/pickney-backend.git
// rm -rf pickney-backend

//         proxy_pass http://localhost:8000; #whatever port your app runs on
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;

//         https://admin.pickneybank.com/

//         sudo certbot --nginx -d admin.pickneybank.com

// for api.pickneybank.com => 57.151.115.0
// for admin.pickneybank.com => 20.49.104.56


// i have added the domain this
// sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

// now i want to replace it to this api.pickneybank.com

// sudo certbot --nginx -d api.pickneybank.com


import moment from "moment/moment.js";
import eventSchema from "../model/eventSchema.js";
import grantStarsSchema from "../model/grantStarsSchema.js";
import activitySchema from "../model/activitySchema.js";
import dotenv from "dotenv";
import { code200, code400, code500 } from "../responseCode.js";
import {
  ACTIVITY_IMAGE,
  ASCENDING_ORDER,
  DECENDING_ORDER,
  FDType,
  KID,
  PARENT,
  PASSBOOK_IMAGE,
  acitivityRejected,
  activityDone,
  byEVENT,
  eventAPPROVED,
  eventPARENT_APPROVAL_PENDING,
  eventPENDING,
  eventREJECT,
  eventRUNNING,
  fdStatus_PRE_MATURED,
  fdStatus_onGOING,
  interest_rate,
  is_InActive,
  is_active,
  is_credit,
  is_debit,
  is_paid,
  is_recurring_true,
  kidAuthorization,
  loanType,
  paidEmi,
  parentApproval_event_E_1,
  parentApproval_event_E_2,
  parentApproval_event_E_3,
  parentApproval_event_E_5,
  parentApproval_event_E_6,
  parentApproval_event_E_7,
  parentApproval_event_loan_fd_S_2,
  parentApproval_event_loan_fd_S_1,
  parentApproval_event_n_loan_E_4,
  parentApproval_loan_E_1,
  parentApproval_loan_E_2,
  parentApproval_loan_E_3,
  parentAuthorization,
  requestForFD,
  requestForLoanEmi,
  parentApproval_fd_E_5,
  parentApproval_fd_E_4,
  parentApproval_fd_E_3,
  parentApproval_fd_E_2,
  parentApproval_fd_E_1,
  parentApprovalRequest_fd_S,
  parentApprovalRequest_fd_E_2,
  parentApprovalRequest_fd_E_1,
  addEventForGrandStars_E_1,
  addEventForGrandStars_E_2,
  addEventForGrandStars_E_3,
  makeFavouriteEvent_E_7,
  makeFavouriteEvent_E_6,
  makeFavouriteEvent_E_5,
  makeFavouriteEvent_E_4,
  makeFavouriteEvent_E_3,
  makeFavouriteEvent_E_2,
  makeFavouriteEvent_E_1,
  addEventChallengeCriteria_E_4,
  addEventChallengeCriteria_E_5,
  addEventChallengeCriteria_S_1,
  addEventChallengeCriteria_E_3,
  addEventChallengeCriteria_E_2,
  addEventChallengeCriteria_E_1,
  addEvent_E_5,
  addEvent_E_4,
  addEvent_E_3,
  addEvent_E_2,
  addEvent_E_1,
  addEvent_E_7,
  addEvent_E_9,
  addEvent_E_8,
  addEvent_E_11,
  addEvent_E_10,
  addEvent_E_12,
  addEvent_E_13,
  boosted_M_4,
  boosted_M_3,
  boosted_M_2,
  boosted_M_1,
  boosted_M_6,
} from "../contentId.js";
import tagSchema from "../model/tagSchema.js";
import mongoose from "mongoose";
import _ from "lodash";
import jwt from "jsonwebtoken";
import {
  addPassBookFDAndBoost,
  addPassbook,
  balanceCanWithdraw,
  calculateEmiDates,
  checkUserExists,
  deleteUnUsedActivities,
  doesActivityExist,
  doesActivityExistWithDate,
  doesEventExistWithStatus,
  fetchUserFromKidTableById,
  getActivitiesDetails,
  getCountedActivities,
  getCountedActivitiesAll,
  getCountedActivitiesUsed,
  getDiffNumber,
  getEventDetails,
  getLastEndAtWithStatusDone,
  getKidName,
  getMostRecentActivityWithEmptyEndDates,
  getTotalBalance,
  getTotalBalanceWithCurrency,
  getUserDetails,
  updateEventStatus,
  updateOrCreateKidBalance,
  getCountedActivitiesUsedBasedOnRangeDate,
} from "../helper_function.js";
import kidSchema from "../model/kidSchema.js";
import userSchema from "../model/userSchema.js";
import { grantStar, grantStarCallBackFunction } from "./starGrantController.js";
import tagRecommendedSchema from "../model/tagRecommendedSchema.js";
import { response } from "express";
import boostEventSchema from "../model/boostEventSchema.js";
import { getLoanDetails } from "./dashboardController.js";
import loanSchema from "../model/loanSchema.js";
import loanLogsSchema from "../model/loanLogsSchema.js";
import fixedDepositSchema from "../model/fixedDepositSchema.js";
import fixedDepositLogsSchema from "../model/fixedDepositLogsSchema.js";
import { updateFixedDepositLog } from "./fixedDepositController.js";

dotenv.config();

export const getActivitiesOnRange = async (
  startDate,
  endDate,
  userId,
  kidId
) => {
  try {
    const totalActivities = await activitySchema.find({
      $and: [
        {
          $or: [
            {
              start_at: {
                $gte: startDate,
                $lte: endDate,
              },
            },
            {
              end_at: {
                $gte: startDate,
                $lte: endDate,
              },
            },
          ],
        },
        {
          userId: userId,
        },
        {
          kidId: kidId,
        },
      ],
    });

    return totalActivities;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const acceptRecurringEvent = async (data) => {
  try {
    const currentDateFormatted = moment().format("DD/MM/YYYY");
    const updatedEventData = {
      kidId: data.kidId ? data.kidId : undefined,
      name: data.name ? data.name : undefined,
      stars: data.stars ? data.stars : undefined,
      reward_type: data.reward_type ? data.reward_type : undefined,
      tags: undefined,
      is_auto_complete_event:
        data.is_auto_complete_event === true
          ? data.is_auto_complete_event
          : false,
      frequency: data.frequency ? data.frequency : undefined,
      max_count: data.max_count ? data.max_count : undefined,
      start_at: data.start_at ? data.start_at : undefined,
      end_at: data.end_at ? data.end_at : undefined,
      status: 1,
      is_recommended: false,
      photo: data.photo,
    };

    return { success: true, message: "Recurring event accepted", updatedEventData };
  } catch (error) {
    return { success: false, message: "Error accepting recurring event", error: error.message };
  }
};

export const acceptOneTimeEvent = async (data) => {
  try {
    const currentDateFormatted = moment().format("DD/MM/YYYY");
    const updatedEventData = {
      name: data.name ? data.name : undefined,
      kidId: data.kidId ? data.kidId : undefined,
      stars: data.stars ? data.stars : undefined,
      reward_type: data.reward_type ? data.reward_type : undefined,
      tags: undefined,
      is_auto_complete_event:
        data.is_auto_complete_event === true
          ? data.is_auto_complete_event
          : false,
      frequency: "D",
      max_count: 1,
      start_at: currentDateFormatted,
      end_at: currentDateFormatted,
      status: 1,
      is_recommended: data.is_recommended ? data.is_recommended : undefined,
      recommendedId: data.recommendedId ? data.recommendedId : undefined,
      photo: data.photo ? data.photo : undefined,
    };

    return { success: true, message: "One-time event accepted", updatedEventData };
  } catch (error) {
    return { success: false, message: "Error accepting one-time event", error: error.message };
  }
};


export const updateEvent = async (request, response) => {
  try {
    // const eventId = request.params.id; // Assuming the ID is provided in the URL params
    const eventId = request.body.id;

    const ifExistEvent = await eventSchema.findById({ _id: eventId });

    if (!ifExistEvent) {
      response.status(400).json({
        code: code400,
        success: false,
        message: "Events not found",
      });
    }
    const inUsedActivities = await activitySchema.find({ eventId, status: 2 });

    if (inUsedActivities.length > request.body.max_count) {
      return response.status(200).json({
        errorCode: code400,
        success: false,
        message: "Used activities cannot be deleted, Please try to increment the max count",
      });
    }

    // if (inUsedActivities.length > 0) {
    //   return response.status(400).json({
    //     errorCode: code400,
    //     error:
    //       "Your Event's activities are already in used, You cannot change this event now. Please try again later with another event.",
    //   });
    // }

    // Deleting all the events...& generating new ones
    // const existingActivities = await activitySchema.find({ eventId });
    // if (existingActivities) {
    //   await activitySchema.deleteMany({ eventId });
    // }

    let updatedEventData = null;

    if (ifExistEvent.event_type === false) {

      const result = await acceptOneTimeEvent(request.body);
      
      if (!result.success) {
        return response.status(400).json({ errorCode: code400, ...result });
      }
      updatedEventData = result.updatedEventData;
    } else if (ifExistEvent.event_type === true) {

      const result = await acceptRecurringEvent(request.body);
      if (!result.success) {
        return response.status(400).json({ errorCode: code400, ...result });
      }
      updatedEventData = result.updatedEventData;
    }

    const updatedEvent = await eventSchema.findOneAndUpdate(
      { _id: eventId },
      updatedEventData,
      { new: true }
    );

    if (!updatedEvent) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        message: "Event not found",
      });
    } else {
      const result = await addActivity(updatedEvent); // Await the addActivity function

      if (result.success === true) {
        return response.status(200).json({
          success: true,
          message: "Event updated successfully",
          updatedEvent,
        });
      } else {
        return response.status(200).json({
          errorCode: code400,
          success: false,
          message: result.error,
        });
      }

      
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ errorCode: code500, success: false, error: error.message });
  }
};


export const deleteEvent = async (request, response) => {
  try {
    return false;
    const eventId = request.params.id; // Assuming the ID is provided in the URL params
    await activitySchema.deleteMany({ eventId });
    const deletedEvent = await eventSchema.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        message: "Event not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    response
      .status(400)
      .json({ errorCode: code400, success: false, error: error.message });
  }
};

export const getTagDetailsByIds = async (tagIds) => {
  try {
    const tagDetails = await tagSchema.find({ _id: { $in: tagIds } });
    return tagDetails;
  } catch (error) {
    throw new Error(`Failed to fetch tag details: ${error.message}`);
  }
};

export const getRecommendedTags = async (tagIds) => {
  try {
    const tagDetails = await tagRecommendedSchema.find({
      _id: { $in: tagIds },
    });
    return tagDetails;
  } catch (error) {
    throw new Error(`Failed to fetch tag details: ${error.message}`);
  }
};

export const getSingleEvent = async (request, response) => {
  const eventId = request.params.id;

  try {
    // Find the event details
    const eventDetails = await eventSchema.findById(eventId);

    if (!eventDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "Event not found",
      });
    }

    // Fetch tag details based on tag ids
    const tagDetails = await getTagDetailsByIds(eventDetails.tags);

    // Fetch activities based on the event ID
    const activities = await activitySchema.find({ eventId }).sort({end_at : 1});

    response.status(200).json({
      code: code200,
      success: true,
      message: "Successful",
      event: { ...eventDetails._doc, tags: tagDetails }, // Combine event details with tag details
      activities,
    });
  } catch (error) {
    response.status(500).json({
      errorCode: code500,
      success: false,
      error: error.message,
    });
  }
};

export const getAllEventList = async (request, response) => {
  try {
    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "Invalid authorization token.",
      });
    }

    const userExist = await checkUserExists(currentUserDetails._id);

    if (userExist === null) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "User not found.",
      });
    }

    let query = { userId: currentUserDetails._id };

    if (request.body.kidId !== "") {
      const kidId = request.body.kidId;
      const kidExist = await fetchUserFromKidTableById(kidId);

      if (!kidExist) {
        return response.status(400).json({
          errorCode: code400,
          success: false,
          error: "Kid not found.",
        });
      }

      query.kidId = kidId;
    }

    const details = await eventSchema.find(query).sort({ created_at: -1 });

    // Fetch tag details for each event
    const eventsWithTags = await Promise.all(
      details.map(async (event) => {
        const tagDetails = await getTagDetailsByIds(event.tags);

        // Assuming there's only one tag for each event
        const tags = tagDetails.length > 0 ? tagDetails[0] : null;

        return { ...event._doc, tags };
      })
    );

    const totalRecords = eventsWithTags.length;

    response.status(200).json({
      code: code200,
      success: true,
      message: "Successful",
      totalRecords: totalRecords,
      data: eventsWithTags,
    });
  } catch (err) {
    response
      .status(500)
      .json({ errorCode: code500, success: false, error: "Not found" });
  }
};

export const getAllEventListOfRecommended = async (request, response) => {
  try {
    const details = await eventSchema.find({ is_recommended: true });

    // Fetch tag details for each event
    const eventsWithTags = await Promise.all(
      details.map(async (event) => {
        // let tagDetails;

        // let tagDetails1 = await getTagDetailsByIds(event.tags);
        // let tagDetails2 = await getRecommendedTags(event.tags);

        // if (tagDetails1 && tagDetails1.length > 0) {
        //   tagDetails = tagDetails1;
        // } else if (tagDetails2 && tagDetails2.length > 0) {
        //   tagDetails = tagDetails2;
        // } else {
        //   // Handle the case when both arrays are empty or undefined
        //   tagDetails = [];
        // }

        const tagDetails = await getTagDetailsByIds(event.tags);

        const tags = tagDetails.length > 0 ? tagDetails[0] : null;

        return { ...event._doc, tags };
      })
    );

    const totalRecords = eventsWithTags.length;

    response.status(200).json({
      code: code200,
      success: true,
      message: "Successful",
      totalRecords: totalRecords,
      data: eventsWithTags,
    });
  } catch (err) {
    response
      .status(500)
      .json({ errorCode: code500, success: false, error: "Not found" });
  }
};

export const getActivitiesByDate = async (request, response) => {
  try {
    const startDate = moment(request.body.checkByDate, "DD/MM/YYYY");
    const is_recurring = request.body.is_recurring;

    const events = await eventSchema.find({
      start_at: { $lte: startDate.endOf("day").toDate() },
      is_recurring: is_recurring,
      status: 1,
    });

    // Fetch tag details for each event
    const eventsWithTags = await Promise.all(
      events.map(async (event) => {
        const tagDetails = await getTagDetailsByIds(event.tags);
        return { ...event._doc, tags: tagDetails };
      })
    );

    response.status(200).json({
      code: code200,
      success: true,
      message: "Events fetched successfully",
      events: eventsWithTags,
    });
  } catch (error) {
    response.status(400).json({
      errorCode: code400,
      success: false,
      error: error.message,
    });
  }
};

export const addActivityCronJob = async (data) => {
  try {
    const activityData = {
      eventId: data._id,
      userId: data.userId,
      kidId: data.kidId,
      activity_name: data.name,
      status: data.status,
      remarks: data.remarks,
      start_at: data.start_at,
      end_at: data.end_at,
      reward_type: data.reward_type,
      stars: data.stars,
      photo: data.photo,
    };

    const savedActivity = await activitySchema.create(activityData);

    return savedActivity;
  } catch (error) {
    throw new Error(`Failed to fetch tag details: ${error.message}`);
  }
};

const getListOfDates = (startDate, endDate) => {
  const dateList = [];
  let currentDate = moment(startDate, "DD/MM/YYYY"); // Changed from new Date to moment

  while (currentDate.isSameOrBefore(endDate, "day")) {
    // Changed <= to isSameOrBefore
    dateList.push(currentDate.clone()); // Changed to clone method
    currentDate.add(1, "days"); // Changed to add method
  }

  return dateList;
};
const incrementDate = (date, days) => {
  return moment(date, "DD/MM/YYYY").add(days, "days").format("DD/MM/YYYY");
};
export const forOneDayActivities = async (event) => {
  try {

    const presendDate = await getLastEndAtWithStatusDone(event._id);

    console.log(presendDate)
    console.log(event.end_at)

    if (presendDate !== null) {
      console.log("entered")
      if (event.end_at <= presendDate) {
        return {
          errorCode: code400,
          success: false,
          error: `Activities has been completed on this date please pickup any other date`,
        };
      }


      const upcomingDate = moment(presendDate, "DD/MM/YYYY")
        .add(1, "day")
        .format("DD/MM/YYYY");
        
      // await activitySchema.deleteMany({ end_at: { $gte: upcomingDate } });
      await activitySchema.deleteMany({ eventId : event._id, status : is_active  });
    } else {
      
      await activitySchema.deleteMany({ eventId: event._id });
    }

    let start_at = "";
    let end_at = "";

    start_at = event.startAt ? event.startAt : event.start_at;
    end_at = event.endAt ? event.endAt : event.end_at;

    if (end_at !== "") {
      let duration = await dateDuration(start_at, end_at);
      duration = duration + 1;

      let startDate = moment(start_at, "DD/MM/YYYY"); // Start one day ahead of the current date
      let endDate = startDate.clone();
      let val = 1;
      let lastInsertedActivityId = null;
      let index = 0;
      let endDateReached = false;


      const completedActivities = await getCountedActivitiesUsedBasedOnRangeDate(event._id,moment(start_at, "DD/MM/YYYY"),moment(end_at, "DD/MM/YYYY"));
      console.log("called")
      console.log(completedActivities)

      while (index < duration) {
        for (let i = 0; i < event.max_count; i++) {
          const activityData = {
            eventId: event._id,
            userId: event.userId,
            kidId: event.kidId,
            activityName: `Activity ${val}`,
            status: event.status,
            remarks: undefined,
            start_at: startDate.format("DD/MM/YYYY"),
            end_at: endDate.format("DD/MM/YYYY"),
            reward_type: event.reward_type,
            stars: event.stars,
            photo: ACTIVITY_IMAGE,
          };

          const savedActivity = await activitySchema.create(activityData);
          lastInsertedActivityId = savedActivity._id; // Update lastInsertedActivityId
          val++;
        }

        // Increment the start and end dates for the next set of activities
        startDate = moment(incrementDate(startDate, 1), "DD/MM/YYYY");
        endDate = startDate.clone();

        if (index === duration - 1) {
          endDateReached = true;
        }

        index++;
      }

      return {
        code: code200,
        success: true,
        message: addEvent_E_8,
        lastInsertedActivityId: lastInsertedActivityId, // Return lastInsertedActivityId
      };
    }
  } catch (error) {
    // console.error("Error in forOneDayActivities:", error); // Log the error
    return {
      errorCode: code400,
      success: false,
      error: `${addEvent_E_9} ${error.message}`,
    };
  }
};

export const forWeeklyActivities = async (event) => {
  try {
    // delete future activities.
    // Get Last Date of Activities status 1.
    const presendDate = await getLastEndAtWithStatusDone(event._id);

    console.log(presendDate)
    console.log(event.end_at)

    if (presendDate !== null) {
      if (event.end_at <= presendDate) {
        return {
          errorCode: code400,
          success: false,
          error: `Activities has been completed on this date please pickup any other date`,
        };
      }
console.log("called")

      const upcomingDate = moment(presendDate, "DD/MM/YYYY")
        .add(1, "day")
        .format("DD/MM/YYYY");
        console.log(upcomingDate)
      // await activitySchema.deleteMany({ end_at: { $gte: upcomingDate } });
      await activitySchema.deleteMany({ eventId : event._id, status : is_active  });
    } else {
      await activitySchema.deleteMany({ eventId: event._id });
    }

    let start_at = "";
    let end_at = "";

    start_at = event.startAt ? event.startAt : event.start_at;
    end_at = event.endAt ? event.endAt : event.end_at;

    if (end_at !== "") {
      let duration = await dateDuration(start_at, end_at);
      duration = duration + 1;

      const dateFormat = "DD/MM/YYYY";

      const originalStartDate = moment(start_at, dateFormat);
      const originalEndDate = moment(end_at, dateFormat);

      let calculatedStartDate = moment(start_at, dateFormat)
        .startOf("week")
        .add(1, "days");

      let calculatedEndDate = moment(start_at, dateFormat)
        .clone()
        .endOf("isoWeek")
        .isoWeekday(7);

      // console.log(calculatedStartDate)
      // console.log(calculatedEndDate)
      // process.exit();

      let index = 0;
      let endDateReached = false;

      while (index < 3 && !endDateReached) {
        if (calculatedEndDate.isAfter(originalEndDate)) {
          calculatedEndDate = originalEndDate;
          endDateReached = true;
        }

        if (calculatedStartDate.isBefore(originalStartDate)) {
          calculatedStartDate = originalStartDate;
        }

        let listOfActivities = await getActivitiesOnRange(
          calculatedStartDate,
          calculatedEndDate,
          event.userId,
          event.kidId
        );
        const completedActivities = await getCountedActivitiesUsedBasedOnRangeDate(event._id,calculatedStartDate,calculatedEndDate);

        console.log(calculatedStartDate)
        console.log(calculatedEndDate)
        console.log(completedActivities)

        if (completedActivities !== 0) {
          listOfActivities = listOfActivities + completedActivities
        }

        if (listOfActivities.length <= event.max_count) {
          const activitiesCount = event.max_count - listOfActivities.length;
          let count = 1;
          let listOfDates = getListOfDates(
            calculatedStartDate,
            calculatedEndDate
          );

          while (count <= activitiesCount && listOfDates.length > 0) {
            const randomNumber = Math.floor(Math.random() * listOfDates.length);
            const dateSelected = listOfDates[randomNumber];

            const activityData = {
              eventId: event._id,
              userId: event.userId,
              kidId: event.kidId,
              activityName: `Activity ${count}`,
              status: event.status,
              remarks: undefined,
              start_at: dateSelected.format(dateFormat),
              end_at: dateSelected.format(dateFormat),
              reward_type: event.reward_type,
              stars: event.stars,
              photo: ACTIVITY_IMAGE,
            };

            const savedActivities = await activitySchema.create(activityData);

            listOfDates.splice(randomNumber, 1);
            if (listOfDates.length === 0) {
              listOfDates = getListOfDates(
                calculatedStartDate,
                calculatedEndDate
              );
            }
            count++;
          }
        }

        calculatedEndDate.add(7, "days");
        calculatedStartDate = calculatedEndDate.clone().subtract(6, "days");

        index++;
      }

      return { success: true, message: addEvent_E_10 };
    }
  } catch (error) {
    return {
      success: false,
      message: addEvent_E_11,
      error: error.message,
    };
  }
};
export const forMonthlyActivities = async (event) => {
  try {
    let start_at = "";
    let end_at = "";

    start_at = event.startAt ? event.startAt : event.start_at;
    end_at = event.endAt ? event.endAt : event.end_at;

    if (end_at !== "") {
      const dateFormat = "DD/MM/YYYY";

      const originalStartDate = moment(start_at, dateFormat);
      const originalEndDate = moment(end_at, dateFormat);

      let calculatedStartDate = moment(start_at, dateFormat).startOf("month");
      let calculatedEndDate = moment(start_at, dateFormat).endOf("month");

      // console.log(calculatedStartDate)
      // console.log(calculatedEndDate)
      // process.exit();

      let index = 0;
      let endDateReached = false;

      while (index < 3 && !endDateReached) {
        if (calculatedEndDate.isAfter(originalEndDate)) {
          calculatedEndDate = originalEndDate;
          endDateReached = true;
        }

        if (calculatedStartDate.isBefore(originalStartDate)) {
          calculatedStartDate = originalStartDate;
        }

        const listOfActivities = await getActivitiesOnRange(
          calculatedStartDate,
          calculatedEndDate,
          event.userId,
          event.kidId
        );

        if (listOfActivities.length <= event.max_count) {
          const activitiesCount = event.max_count - listOfActivities.length;
          let count = 1;
          let listOfDates = getListOfDates(
            calculatedStartDate,
            calculatedEndDate
          );

          while (count <= activitiesCount && listOfDates.length > 0) {
            const randomNumber = Math.floor(Math.random() * listOfDates.length);
            const dateSelected = listOfDates[randomNumber];

            const activityData = {
              eventId: event._id,
              userId: event.userId,
              kidId: event.kidId,
              activityName: `Activity ${count}`,
              status: event.status,
              remarks: undefined,
              start_at: dateSelected.format(dateFormat),
              end_at: dateSelected.format(dateFormat),
              reward_type: event.reward_type,
              stars: event.stars,
              photo: ACTIVITY_IMAGE,
            };

            const savedActivities = await activitySchema.create(activityData);

            listOfDates.splice(randomNumber, 1);
            if (listOfDates.length === 0) {
              listOfDates = getListOfDates(
                calculatedStartDate,
                calculatedEndDate
              );
            }
            count++;
          }
        }

        calculatedStartDate.add(1, "month");
        calculatedEndDate = calculatedStartDate.clone().endOf("month");

        index++;
      }

      return { success: true, message: addEvent_E_12 };
    }
  } catch (error) {
    return {
      success: false,
      message: addEvent_E_11,
      error: error.message,
    };
  }
};

export const addActivity = async (event) => {
  try {
    if (event.frequency === "D") {
      const result = await forOneDayActivities(event);
      return result;
    }
    if (event.frequency === "W") {
      const result = await forWeeklyActivities(event);
      return result;
    }
    if (event.frequency === "M") {
      const result = await forMonthlyActivities(event);
      return result;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// adding event with types
export const dateDuration = async (start_at, end_at) => {
  let duration = moment(end_at, "DD/MM/YYYY").diff(
    moment(start_at, "DD/MM/YYYY"),
    "days"
  );
  return duration;
};
const endAtDateGenerator = async (start_at, frequency) => {
  let startDate;
  let endDate;

  if (frequency === "D") {
    startDate = moment(start_at, "DD/MM/YYYY"); // Start one day ahead of the current date
    endDate = startDate.clone(); // endDate is three days ahead of startDate
  } else if (frequency === "W") {
    startDate = moment(start_at, "DD/MM/YYYY");
    endDate = startDate.clone().endOf("isoWeek").isoWeekday(7);
  } else if (frequency === "M") {
    startDate = moment(start_at, "DD/MM/YYYY");
    endDate = startDate.clone().endOf("month");
  }

  return endDate;
};

const createEventData = (body, kidId) => {
  return {
    userId: body.userId,
    kidId: kidId,
    name: body.name,
    stars: body.stars,
    event_type: body.event_type,
    reward_type: body.reward_type === is_credit ? is_credit : is_debit,
    tags: body.tags,
    is_auto_complete_event: body.is_auto_complete_event,
    photo: body.photo,
  };
};

const oneTimeEvent = async (body, response) => {
  try {
    const currentDateFormatted = moment().format("DD/MM/YYYY");
    let kidIds = body.kidId; // Assuming kidId is either a string or an array

    // Convert kidId to an array if it's not already
    kidIds = Array.isArray(kidIds) ? kidIds : [kidIds];

    const results = [];

    for (const kidId of kidIds) {
      const eventData = {
        ...createEventData(body, kidId),
        frequency: "D",
        max_count: 1,
        start_at: currentDateFormatted,
        end_at: currentDateFormatted,
        status: 1,
        is_recommended: body.is_recommended,
        recommendedId: body.recommendedId ? body.recommendedId : undefined,
        photo: body.photo ? body.photo : undefined,
      };

      const savedEvent = await eventSchema.create(eventData);

      let lastInsertedActivityId = null;

      if (savedEvent) {
        const activityResult = await forOneDayActivities(savedEvent);
        lastInsertedActivityId = activityResult.lastInsertedActivityId;
      }

      results.push({
        success: true,
        id: savedEvent.id,
        lastInsertedActivityId: lastInsertedActivityId,
      });
    }

    return results;
  } catch (error) {
    response.status(400).json({
      errorCode: code400,
      success: false,
      message: addEvent_E_13,
      error: `${error.message}`,
    });
  }
};

export const addEvent = async (request, response) => {
  try {

    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "UserId is required.",
      });
    }

    const data = {
      userId : currentUserDetails._id,
      kidId : request.body.kidId,
      name : request.body.name,
      stars : request.body.stars,
      reward_type : request.body.reward_type,
      event_type : request.body.event_type,
      frequency : request.body.frequency,
      tags : request.body.tags,
      is_auto_complete_event : request.body.is_auto_complete_event,
      max_count : request.body.max_count,
      start_at : request.body.start_at,
      end_at : request.body.end_at,
      photo : request.body.photo,
      is_recommended : request.body.is_recommended,
      recommendedId : request.body.recommendedId
    };

    const eventType = request.body.event_type;

    if (eventType === false) {
      const oneTimeEventDone = await oneTimeEvent(data, response);
      if (oneTimeEventDone) {
        return response.status(200).json({
          code: code200,
          success: true,
        });
      } else {
        return response.status(400).json({
          errorCode: code400,
          success: false,
          error: addEvent_E_1,
        });
      }
    } else if (eventType === true) {
      if (
        data.frequency !== "W" &&
        data.frequency !== "M" &&
        data.frequency !== "D"
      ) {
        return response.status(400).json({
          errorCode: code400,
          success: false,
          message: addEvent_E_2,
        });
      }
      const recurringEventDone = await recurringEventFunction(
        data,
        response
      );
      if (recurringEventDone) {
        return response.status(200).json({
          code: code200,
          success: true,
          message: addEvent_E_5,
        });
      } else {
        return response.status(400).json({
          errorCode: code400,
          success: false,
          error: addEvent_E_3,
        });
      }
    } else {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: addEvent_E_3,
      });
    }
  } catch (error) {
    // console.error("Error in addEvent:", error);
    response.status(500).json({
      errorCode: code500,
      success: false,
      error: `${addEvent_E_4} ${error.message}`,
    });
  }
};

const recurringEventFunction = async (body, response) => {
  try {
    if (!body.start_at) {
      throw new Error("Please provide the start date.");
    }
    const endDate = await endAtDateGenerator(body.start_at, body.frequency);
    const kidIds = body.kidId; // Assuming kidId is an array

    const results = [];

    for (const kidId of kidIds) {
      const eventData = {
        ...createEventData(body, kidId),
        frequency: body.frequency,
        max_count: body.max_count,
        start_at: body.start_at,
        end_at: body.end_at ? body.end_at : "",
        status: 1,
        is_recommended: false,
        photo: body.photo ? body.photo : undefined,
      };

      const savedEvent = await eventSchema.create(eventData);

      if (savedEvent) {
        await addActivity(savedEvent);
      }

      results.push({
        success: true,
        id: savedEvent.id,
      });
    }

    return results;
  } catch (error) {
    // console.error("Error in recurringEventFunction:", error);
    response.status(400).json({
      errorCode: code400,
      success: false,
      message: addEvent_E_7,
      error: `${error.message}`,
    });
  }
};

// get events for star granted...

export const getOnetimeEvents = async (request, response) => {
  const authorizationHeader = request.headers[parentAuthorization];
  const currentUserDetails = await getUserDetails(authorizationHeader);

  if (!currentUserDetails) {
    return response.status(400).json({
      errorCode: code400,
      success: false,
      error: "UserId is required.",
    });
  }

  const userId = currentUserDetails._id;

  const { kidId, start_at } = request.body;

  // Validate required fields
  if (!userId || !kidId || !start_at) {
    return response.status(400).json({
      errorCode: code400,
      success: false,
      error: "Missing required fields: userId, kidId, start_at",
    });
  }

  try {
    // Find the event details based on userId, kidId, start_at, is_auto_complete_event, and status
    const eventDetails = await eventSchema.find({
      userId: userId,
      kidId: kidId,
      event_type: false,
      is_auto_complete_event: false,
      status: is_active,
    });

    if (!eventDetails || eventDetails.length === 0) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "No event found.",
      });
    }

    // Fetch tag details and activities for each event based on tag ids
    const eventsWithActivities = await Promise.all(
      eventDetails.map(async (event) => {
        const newDetails = moment(event.start_at, "DD/MM/YYYY", true);

        const tagDetails = await getTagDetailsByIds(event.tags);
        const activities = await getEventActivities(event._id, start_at);

        if (activities.length > 0) {
          return { ...event._doc, tags: tagDetails, activities };
        } else {
          return null; // Exclude events with no activities
        }
      })
    );

    // Remove null values and then sort by start_at in descending order
    const filteredEvents = eventsWithActivities.filter(
      (event) => event !== null
    );
    const sortedEvents = filteredEvents.sort(
      (a, b) =>
        moment(a.start_at, "DD/MM/YYYY").toDate() -
        moment(b.start_at, "DD/MM/YYYY").toDate()
    );

    response.status(200).json({
      code: code200,
      success: true,
      message: "Successful",
      events: sortedEvents,
    });
  } catch (error) {
    response.status(400).json({
      errorCode: code400,
      success: false,
      error: error.message,
    });
  }
};

export const getEventActivities = async (eventId, start_at) => {
  try {
    const formattedStartDate = moment(start_at, "DD/MM/YYYY", true).format(
      "DD/MM/YYYY"
    );
    const activities = await activitySchema.find({
      eventId: eventId,
      status: 1,
      start_at: formattedStartDate,
    });

    return activities;
  } catch (error) {
    console.error("Error in getEventActivities:", error.message);
    throw new Error(error.message);
  }
};

export const getRecurringEvents = async (request, response) => {

  const authorizationHeader = request.headers[parentAuthorization];
  const currentUserDetails = await getUserDetails(authorizationHeader);

  if (!currentUserDetails) {
    return response.status(400).json({
      errorCode: code400,
      success: false,
      error: "UserId is required.",
    });
  }

  const userId = currentUserDetails._id;

  const { kidId, start_at, is_auto_complete_event, status } =
    request.body;

  // Validate required fields
  if (!userId || !kidId || !start_at) {
    return response.status(400).json({
      errorCode: code400,
      success: false,
      error:
        "Missing required fields: userId, kidId, start_at, is_auto_complete_event, status",
    });
  }

  try {
    // Find the event details based on userId, kidId, start_at, is_auto_complete_event, and status
    const eventDetails = await eventSchema.find({
      userId,
      kidId,
      event_type: is_recurring_true,
      is_auto_complete_event: false,
      status: is_active,
    });

    if (!eventDetails || eventDetails.length === 0) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error:
          "Event not found on this date, please try again with a different event date.",
      });
    }

    // Fetch tag details and activities for each event based on tag ids
    const eventsWithActivities = await Promise.all(
      eventDetails.map(async (event) => {
        const newDetails = moment(event.start_at, "DD/MM/YYYY", true);

        const tagDetails = await getTagDetailsByIds(event.tags);
        const activities = await getEventActivities(event._id, start_at);

        if (activities.length > 0) {
          return { ...event._doc, tags: tagDetails, activities };
        } else {
          return null; // Exclude events with no activities
        }
      })
    );

    // Remove null values and then sort by start_at in descending order
    const filteredEvents = eventsWithActivities.filter(
      (event) => event !== null
    );
    const sortedEvents = filteredEvents.sort(
      (a, b) =>
        moment(a.start_at, "DD/MM/YYYY").toDate() -
        moment(b.start_at, "DD/MM/YYYY").toDate()
    );

    response.status(200).json({
      code: code200,
      success: true,
      message: "Successful",
      events: sortedEvents,
    });
  } catch (error) {
    response.status(400).json({
      errorCode: code400,
      success: false,
      error: error.message,
    });
  }
};

// REQUEST APPROVAL
// this function used in // cron job indexjs //

export const showUpcomingListOfActivities = async (request, response) => {
  try {
    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "UserId is required.",
      });
    }

    const kidDetails = await userSchema.findOne({
      _id: currentUserDetails._id,
    });

    if (!kidDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "Kid does not found.",
      });
    }

    if (kidDetails.role === KID) {
      const details = await eventSchema.find({
        status: is_active,
        kidId: kidDetails.kidFK,
      });

      const today = moment().startOf("day");

      const eventsWithTags = await Promise.all(
        details.map(async (event) => {
          const newDetails = moment(event.end_at, "DD/MM/YYYY", true);

          if (newDetails.isValid() && newDetails.isSameOrAfter(today)) {
            const tagDetails = await getTagDetailsByIds(event.tags);

            // Assuming there's only one tag for each event
            const tags = tagDetails.length > 0 ? tagDetails[0] : null;

            return {
              ...event._doc,
              tags,
            };
          } else {
            return null; // Exclude events with invalid or past start_at dates
          }
        })
      );

      const filteredEvents = eventsWithTags.filter((event) => event !== null);

      // Sort the events based on start_at date in descending order
      const sortedEvents = filteredEvents.sort(
        (a, b) =>
          moment(a.start_at, "DD/MM/YYYY").valueOf() -
          moment(b.start_at, "DD/MM/YYYY").valueOf()
      );

      const totalRecords = sortedEvents.length;

      response.status(200).json({
        code: code200,
        success: true,
        message: "Successful",
        totalRecords: totalRecords,
        data: sortedEvents,
      });

      // const { name } = kidDetails;

      // let result = [];

      // for (const event of details) {
      //   const activities = await getActivitiesApprovalTrue(
      //     event._id,
      //     eventRUNNING,
      //     is_active,
      //     "desc"
      //   );

      //   const totalBalance = await getTotalBalanceWithCurrency(
      //     event.userId,
      //     event.kidId
      //   );

      //   // Concatenate activities directly into the result array
      //   result = result.concat(
      //     activities.map((activity) => ({
      //       totalStars: totalBalance.available_balance,
      //       totalValues: totalBalance.inCurrency,
      //       kidName: name,
      //       eventName: event.name,
      //       activityId: activity._id,
      //       eventId: activity.eventId,
      //       userId: activity.userId,
      //       activityName: activity.activityName,
      //       kidId: activity.kidId,
      //       status: activity.status,
      //       start_at: activity.start_at,
      //       end_at: activity.end_at,
      //       photo: activity.photo,
      //       reward_type: activity.reward_type,
      //       stars: activity.stars,
      //       requestApproval: activity.requestApproval,
      //       created_at: activity.created_at,
      //       updated_at: activity.updated_at,
      //       __v: activity.__v,
      //     }))
      //   );
      // }

      // response.status(200).json({
      //   success: true,
      //   passbookEvents: result,
      // });
    }
  } catch (error) {
    console.error("Error in showPendingListOfActivities:", error.message);
    response.status(400).json({ error: error.message });
  }
};

export const showPendingListOfActivities = async (request, response) => {
  try {
    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "UserId is required.",
      });
    }

    const kidDetails = await userSchema.findOne({
      _id: currentUserDetails._id,
    });

    if (!kidDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "Kid does not found.",
      });
    }

    if (kidDetails.role === KID) {
      const details = await eventSchema.find({
        is_auto_complete_event: false,
        status: is_active,
        kidId: kidDetails.kidFK,
      });

      const { name } = kidDetails;

      let result = [];

      for (const event of details) {
        const activities = await getActivitiesApprovalTrue(
          event._id,
          eventPENDING,
          is_active,
          DECENDING_ORDER
        );

        const totalBalance = await getTotalBalanceWithCurrency(
          event.userId,
          event.kidId
        );

        // Concatenate activities directly into the result array
        result = result.concat(
          activities.map((activity) => ({
            totalStars: totalBalance.available_balance,
            totalValues: totalBalance.inCurrency,
            kidName: name,
            eventName: event.name,
            activityId: activity._id,
            eventId: activity.eventId,
            userId: activity.userId,
            activityName: activity.activityName,
            kidId: activity.kidId,
            status: activity.status,
            start_at: activity.start_at,
            end_at: activity.end_at,
            photo: activity.photo,
            reward_type: activity.reward_type,
            stars: activity.stars,
            requestApproval: activity.requestApproval,
            created_at: activity.created_at,
            updated_at: activity.updated_at,
            __v: activity.__v,
          }))
        );
      }

      if (result.length > 0) {
        result.sort((a, b) => {
          const dateA = moment(a.start_at, "DD/MM/YYYY");
          const dateB = moment(b.start_at, "DD/MM/YYYY");
          return dateA - dateB;
        });
      }

      response.status(200).json({
        success: true,
        passbookEvents: result,
      });
    } else {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "Kid does not found.",
      });
    }
  } catch (error) {
    console.error("Error in showPendingListOfActivities:", error.message);
    response.status(400).json({ error: error.message });
  }
};

export const makeParentAprovalKidRequest = async (request, response) => {
  try {
    const { userId, kidId, eventId, activityId } = request.body;

    // Check if any of the required fields are empty
    if (!userId || !kidId || !eventId || !activityId) {
      return response.status(400).json({
        success: false,
        message: parentApprovalRequest_fd_E_1,
      });
    }

    const updatedActivityData = {
      requestApproval: eventPARENT_APPROVAL_PENDING,
    };

    const updatedActivity = await activitySchema.findOneAndUpdate(
      {
        userId: userId,
        kidId: kidId,
        eventId: eventId,
        _id: activityId,
        requestApproval: eventPENDING,
      },
      updatedActivityData,
      { new: true }
    );

    if (!updatedActivity) {
      return response.status(400).json({
        success: false,
        message: parentApprovalRequest_fd_E_2,
      });
    }

    response.status(200).json({
      success: true,
      message: parentApprovalRequest_fd_S,
      updatedActivity,
    });
  } catch (error) {
    response
      .status(400)
      .json({ errorCode: 400, success: false, error: error.message });
  }
};

export const getActivitiesApprovalTrue = async (
  eventId,
  requestApproval,
  status,
  sortOrder
) => {
  try {
    const query = {
      eventId: eventId,
      status: status,
      requestApproval: requestApproval,
    };

    const sortOptions =
      sortOrder === ASCENDING_ORDER ? { start_at: 1 } : { start_at: -1 };

    const activities = await activitySchema
      .find(query)
      .sort(sortOptions)
      .exec();

    return activities;
  } catch (error) {
    console.error("Error in getEventActivities:", error.message);
    throw new Error(error.message);
  }
};

// main request screen ------------------------------------->
export const getRequestApporvalList = async (request, response) => {
  try {
    const authorizationHeader = request.headers[parentAuthorization];

    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "UserId is required.",
      });
    }

    // Fetch user details using await
    const userDetails = await userSchema.findOne({
      _id: currentUserDetails._id,
    });

    if (!userDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "User details does not found.",
      });
    }

    // // Fetch user details using await
    // const kidDetails = await kidSchema.findOne({
    //   _id: kidId,
    // });

    // if (!kidDetails) {
    //   return response.status(400).json({
    //     errorCode: code400,
    //     success: false,
    //     error: "Kid details does not found.",
    //   });
    // }
    let result = [];
    let kidInfo = {};
    let kidId = null;

    if (request.body.kidId !== "") {
      kidId = request.body.kidId;
    }

    let query1 = {
      is_auto_complete_event: false,
      status: is_active,
    };

    if (kidId !== null) {
      query1.kidId = kidId;
    }

    query1.userId = currentUserDetails._id;

    const details = await eventSchema.find(query1);

    for (const event of details) {
      const activities = await getActivitiesApprovalTrue(
        event._id,
        eventPARENT_APPROVAL_PENDING,
        is_active,
        DECENDING_ORDER
      );

      const totalBalance = await getTotalBalanceWithCurrency(
        event.userId,
        event.kidId
      );

      const kidInfoInner = await kidSchema.findOne({
        _id: event.kidId,
      });

      kidInfo.name = kidInfoInner.name;

      // Concatenate activities directly into the result array
      result = result.concat(
        activities.map((activity) => ({
          totalStars: totalBalance.available_balance,
          totalValues: totalBalance.inCurrency,
          amount: activity.stars,
          kidName: kidInfo.name,
          name: `${event.name} ${activity.activityName}`,
          request_id: activity._id,
          userId: activity.userId,
          kidId: activity.kidId,
          requestApproval: activity.requestApproval,
          created_at: activity.created_at,
          updated_at: activity.updated_at,
          type: byEVENT,
          loan: null,
          fd: null,
          event: event,
        }))
      );
    }

    let query2 = {
      userId: currentUserDetails._id,
    };

    if (kidId !== null) {
      query2.kidId = kidId;
    }

    const detailsofLoan = await loanSchema.find(query2);

    for (const loan of detailsofLoan) {
      const loanLogs = await loanLogsSchema.find({
        userId: loan.userId,
        kidId: loan.kidId,
        loanId: loan._id,
        status: 1,
        requestApproval: eventPARENT_APPROVAL_PENDING,
      });

      const totalBalance = await getTotalBalanceWithCurrency(
        loan.userId,
        loan.kidId
      );

      const kidInfoInner = await kidSchema.findOne({
        _id: loan.kidId,
      });

      kidInfo.name = kidInfoInner.name;

      // Concatenate activities directly into the result array
      result = result.concat(
        loanLogs.map((loanLog) => ({
          totalStars: totalBalance.available_balance,
          totalValues: totalBalance.inCurrency,
          amount: loanLog.emi_amount,
          kidName: kidInfo.name,
          name: `${requestForLoanEmi}`,
          request_id: loanLog._id,
          userId: loanLog.userId,
          kidId: loanLog.kidId,
          requestApproval: loanLog.requestApproval,
          created_at: loanLog.created_at,
          updated_at: loanLog.updated_at,
          type: loanType,
          event: null,
          fd: null,
          loan: loan,
        }))
      );
    }

    let query3 = {
      userId: currentUserDetails._id,
    };

    if (kidId !== null) {
      query3.kidId = kidId;
    }

    const detailsofFD = await fixedDepositSchema.find(query3);

    for (const fd of detailsofFD) {
      const fdLogs = await fixedDepositLogsSchema.find({
        fdId: fd._id,
        status: fdStatus_onGOING,
        requestApproval: eventPARENT_APPROVAL_PENDING,
      });

      const totalBalance = await getTotalBalanceWithCurrency(
        fd.userId,
        fd.kidId
      );

      const kidInfoInner = await kidSchema.findOne({
        _id: fd.kidId,
      });

      kidInfo.name = kidInfoInner.name;

      // Concatenate activities directly into the result array
      result = result.concat(
        fdLogs.map((fdLog) => ({
          totalStars: totalBalance.available_balance,
          totalValues: totalBalance.inCurrency,
          amount: fdLog.amount,
          kidName: kidInfo.name,
          name: `${requestForFD}`,
          request_id: fdLog._id,
          userId: fd.userId,
          kidId: fd.kidId,
          requestApproval: fdLog.requestApproval,
          created_at: fdLog.created_at,
          updated_at: fdLog.updated_at,
          type: FDType,
          event: null,
          loan: null,
          fd: fd,
        }))
      );
    }

    // result.sort((a, b) => new Date(a.start_at) - new Date(b.start_at));
    if (result.length > 0) {
      // result.sort((a, b) => {
      //   const dateA = moment(a.start_at, "DD/MM/YYYY");
      //   const dateB = moment(b.start_at, "DD/MM/YYYY");
      //   return dateA - dateB;
      // });

      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      response.status(200).json({
        code: 200,
        success: true,
        data: result,
      });
    } else {
      response.status(400).json({
        errorCode: 400,
        success: false,
        data: result,
      });
    }
  } catch (err) {
    console.log(err)
    response
      .status(500)
      .json({ errorCode: code500, success: false, error: err.message });
  }
};

// make it approval

export const makeEventApprov = async (data, response) => {
  try {
    const userId = data.userId;
    const kidId = data.kidId;
    const eventId = data._id;
    const activityId = data.request_id;
    const requestApproval = data.requestApproval;

    const eventExistsWithStatus = await doesEventExistWithStatus(
      eventId,
      userId,
      kidId
    );

    if (!eventExistsWithStatus) {
      throw new Error(parentApproval_event_E_1);
    }

    const eventDetails = await getEventDetails(eventId);

    const activityExistsOrNot = await doesActivityExist(activityId);

    if (!activityExistsOrNot) {
      throw new Error(parentApproval_event_E_2);
    }

    let responseMessage = "";

    if (requestApproval === "APPROVED") {
      const activityDetails = await getActivitiesDetails(
        activityId,
        is_active,
        eventPARENT_APPROVAL_PENDING
      );

      if (!activityDetails) {
        throw new Error(parentApproval_event_E_3);
      }

      if (activityDetails.reward_type === is_debit) {
        const amountIsSufficient = await balanceCanWithdraw(
          userId,
          kidId,
          activityDetails.stars
        );

        if (!amountIsSufficient) {
          throw new Error(parentApproval_event_n_loan_E_4);
        }
      }

      const updatedActivityData = {
        status: activityDone,
        requestApproval: requestApproval,
      };

      const updatedActivity = await activitySchema.findOneAndUpdate(
        { _id: activityId, eventId, userId, kidId },
        updatedActivityData,
        { new: true }
      );

      if (!updatedActivity) {
        throw new Error(parentApproval_event_E_5);
      }

      if (updatedActivity) {
        const isTotalDone = await updateOrCreateKidBalance(
          updatedActivity.userId,
          updatedActivity.kidId,
          updatedActivity.stars,
          updatedActivity.reward_type
        );

        if (isTotalDone) {
          const passbookObject = {
            userId: updatedActivity.userId,
            kidId: updatedActivity.kidId,
            entryId: updatedActivity._id,
            entryName: `${byEVENT} - ${eventDetails.name} - ${updatedActivity.end_at}`,
            status: updatedActivity.requestApproval,
            remarks: updatedActivity.requestApproval,
            balance_stars: updatedActivity.stars,
            available_balance: isTotalDone.available_balance,
            entryType: updatedActivity.reward_type,
            eventId: updatedActivity.eventId,
          };

          const passbookResponse = await addPassbook(passbookObject);
          responseMessage = parentApproval_event_loan_fd_S_1;
        }
      }
    } else if (requestApproval === "REJECT") {
      const total = await getCountedActivities(eventId);

      if (total <= 1) {
        await updateEventStatus(eventId);
      }

      const updatedActivityData = {
        status: acitivityRejected,
        requestApproval: "REJECT",
      };

      const updatedActivity = await activitySchema.findOneAndUpdate(
        { _id: activityId, eventId, userId, kidId },
        updatedActivityData,
        { new: true }
      );

      if (updatedActivity) {
        const currentBalanceDetails = await getTotalBalanceWithCurrency(
          updatedActivity.userId,
          updatedActivity.kidId
        );

        if (currentBalanceDetails) {
          const passbookObject = {
            userId: updatedActivity.userId,
            kidId: updatedActivity.kidId,
            entryId: updatedActivity._id,
            entryName: byEVENT,
            status: "REJECT",
            remarks: "REJECT",
            balance_stars: 0,
            available_balance: currentBalanceDetails.available_balance,
            entryType: updatedActivity.reward_type,
            eventId: updatedActivity.eventId,
          };

          const passbookResponse = await addPassbook(passbookObject);
          responseMessage = parentApproval_event_loan_fd_S_2;
        }
      } else {
        throw new Error(parentApproval_event_E_6);
      }
    }

    if (!response.headersSent) {
      // Send the error response only if headers have not been sent
      response.status(200).json({
        code: 200,
        success: true,
        message: responseMessage,
      });
    }

    // Common response logic for both "APPROVED" and "REJECT" cases
  } catch (error) {
    if (!response.headersSent) {
      // Send the error response only if headers have not been sent
      response.status(400).json({
        errorCode: code400,
        success: false,
        error: `${parentApproval_event_E_7}${error.message}`,
      });
    }
  }
};

export const makeLoanApprov = async (data, response) => {
  try {
    const userId = data.userId;
    const kidId = data.kidId;
    const loanId = data._id;
    const loanLogs = data.request_id;
    const requestApproval = data.requestApproval;

    if (!userId || !kidId || !loanLogs) {
      throw new Error(parentApproval_loan_E_1);
    }

    const totalBalance = await getTotalBalance(userId, kidId);

    if (!totalBalance) {
      if (!response.headersSent) {
        response.status(400).json({ error: parentApproval_event_n_loan_E_4 });
      }
      return;
    }

    const loan = await loanSchema.findById(loanId);

    if (!loan) {
      if (!response.headersSent) {
        response.status(400).json({ error: parentApproval_loan_E_2 });
      }
      return;
    }

    const existingLoanLog = await loanLogsSchema.findOne({_id : loanLogs,status:is_active});

    if (!existingLoanLog) {
      if (!response.headersSent) {
        response.status(400).json({ error: parentApproval_loan_E_3 });
      }
      return;
    }

    const totalLoanLogs = await loanLogsSchema.find({
      loanId: loanId,
      status: is_active,
    });


    if (!totalLoanLogs || totalLoanLogs.length === 0) {
      if (!response.headersSent) {
        response.status(400).json({ error: parentApproval_loan_E_3 });
      }
      return;
    }

    if (requestApproval === eventAPPROVED) {
      if (totalBalance >= existingLoanLog.emi_amount) {
        existingLoanLog.status = is_paid;
        existingLoanLog.emi_paid_date = moment().format("DD/MM/YYYY");
        const emiBal = existingLoanLog.emi_amount;
        const effectedBal = totalBalance - existingLoanLog.emi_amount;
        existingLoanLog.requestApproval = eventAPPROVED;
        let ifDone = null;

        if (totalLoanLogs.length > 1) {
          ifDone = await existingLoanLog.save();
        } else if (totalLoanLogs.length <= 1) {
          ifDone = await existingLoanLog.save();
          await loanSchema.findOneAndUpdate(
            { _id: loanId },
            { status: is_InActive },
            { new: true }
          );
        }

        if (ifDone !== null) {
          const mainBalance = await updateOrCreateKidBalance(
            userId,
            kidId,
            emiBal,
            is_debit
          );

          if (mainBalance !== null) {
            const passbookData = {
              userId: ifDone.userId,
              kidId: ifDone.kidId,
              entryId: ifDone._id,
              entryName: paidEmi,
              status: "EMI PAID",
              remarks: "EMI paid",
              balance_stars: emiBal,
              available_balance: mainBalance.available_balance,
              entryType: is_debit,
            };

            await addPassBookFDAndBoost(passbookData);
          }
        }

        if (!response.headersSent) {
          response.status(200).json({
            code: 200,
            success: true,
            message: parentApproval_event_loan_fd_S_1,
          });
        }
      } else {
        if (!response.headersSent) {
          response.status(400).json({ error: parentApproval_event_n_loan_E_4 });
        }
      }
    } else {
      existingLoanLog.requestApproval = eventPENDING;
      await existingLoanLog.save();
      response.status(200).json({
        code: 200,
        success: true,
        message: parentApproval_event_loan_fd_S_2,
      });
    }
  } catch (error) {
    if (!response.headersSent) {
      response.status(500).json({ success: false, error: error.message });
    }
  }
};

export const makeFDApprov = async (data, response) => {
  try {
    const userId = data.userId;
    const kidId = data.kidId;
    const fdId = data._id;
    const fdLogId = data.request_id;
    const requestApproval = data.requestApproval;

    if (!fdId) {
      if (!response.headersSent) {
        response.status(400).json({
          errorCode: code400,
          success: false,
          error: parentApproval_fd_E_1,
        });
      }
      return;
    }

    const listOfFD = await fixedDepositSchema.findOne({
      _id: fdId,
      userId,
      kidId,
      status: eventPARENT_APPROVAL_PENDING,
    });

    if (requestApproval === eventAPPROVED) {
      if (listOfFD) {
        listOfFD.status = fdStatus_PRE_MATURED;
        const doneDeposit = await listOfFD.save();

        // const newTotal = doneDeposit.total - interest_rate;
        const newTotal = doneDeposit.principal - interest_rate;

        if (doneDeposit) {
          const isTotalDone = await updateOrCreateKidBalance(
            doneDeposit.userId,
            doneDeposit.kidId,
            newTotal,
            is_credit
          );

          if (isTotalDone) {
            await updateFixedDepositLog(doneDeposit._id, {
              status: fdStatus_PRE_MATURED,
              total: newTotal,
            });

            const passbookObject = {
              userId: doneDeposit.userId,
              kidId: doneDeposit.kidId,
              entryId: doneDeposit._id,
              entryName: FDType,
              status: `${fdStatus_PRE_MATURED} FD`,
              remarks: `FD has been ${fdStatus_PRE_MATURED}`,
              balance_stars: newTotal,
              available_balance: isTotalDone.available_balance,
              entryType: is_credit,
            };

            await addPassBookFDAndBoost(passbookObject);

            if (!response.headersSent) {
              response.status(200).json({
                code: 200,
                success: true,
                message: parentApproval_event_loan_fd_S_1,
              });
            }
          }
        }
      } else {
        if (!response.headersSent) {
          response.status(400).json({
            errorCode: code400,
            success: false,
            error: parentApproval_fd_E_2,
          });
        }
      }
    } else {
      const existingLog = await fixedDepositLogsSchema.findOne({ fdId: fdId });

      if (!existingLog) {
        throw new Error(parentApproval_fd_E_3);
      }

      existingLog.requestApproval = eventPENDING;

      const updatedLog = await existingLog.save();

      if (!updatedLog) {
        throw new Error(parentApproval_fd_E_4);
      } else {
        listOfFD.status = fdStatus_onGOING;

        // Save the updated status
        await listOfFD.save();
        if (!response.headersSent) {
          response.status(200).json({
            code: 200,
            success: true,
            message: parentApproval_event_loan_fd_S_2,
          });
        }
      }
    }
  } catch (error) {
    // console.error("Error in makeFDApprov:", error.message);
    if (!response.headersSent) {
      response.status(400).json({
        errorCode: code400,
        success: false,
        error: `${parentApproval_fd_E_5} ${error.message}`,
      });
    }
  }
};

export const makeRequestApprovalOrRejected = async (request, response) => {
  try {
    const { userId, kidId, _id, request_id, requestApproval, type } =
      request.body;

    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "UserId is required.",
      });
    }

    const userExist = await checkUserExists(currentUserDetails._id);

    if (userExist === null) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "User not found.",
      });
    }

    const data = {
      userId: currentUserDetails._id,
      kidId: request.body.kidId,
      _id: request.body._id,
      request_id: request.body.request_id,
      type: request.body.type,
      requestApproval: request.body.requestApproval,
     
    };

    const requiredFields = [
      "kidId",
      "_id",
      "request_id",
      "requestApproval",
      "type",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in request.body)
    );

    if (missingFields.length > 0) {
      const errorMessage = `The following field(s) are required: ${missingFields.join(
        ", "
      )}`;
      response.status(400).json({
        errorCode: code400,
        success: false,
        error: errorMessage,
      });
      return;
    }

    let result;

    switch (type) {
      case byEVENT:
        result = await makeEventApprov(data, response);
        break;
      case loanType:
        result = await makeLoanApprov(data, response);
        break;
      case FDType:
        result = await makeFDApprov(data, response);
        break;
      default:
        console.error(`Unsupported type: ${type}`);
        response.status(400).json({
          errorCode: code400,
          success: false,
          error: "Unsupported type",
        });
    }
  } catch (error) {
    console.log(error)
    response
      .status(500)
      .json({ errorCode: code500, success: false, error: error.message });
  }
};

// DIRECT STAR GRANT EVENT

export const addEventForGrandStars = async (request, response) => {
  try {

    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "UserId is required.",
      });
    }
    // Define the required fields
    const requiredFields = [
      "kidId",
      "name",
      "stars",
      // "reward_type",
      // "event_type",
      "tags",
      // "is_auto_complete_event",
      // "photo",
      // "is_recommended",
    ];

    // Check if all required fields are present in the request body
    const missingFields = requiredFields.filter(
      (field) => !(field in request.body)
    );

    if (missingFields.length > 0) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const getTagDetails = await getTagDetailsByIds(request.body.tags);
    if (getTagDetails.length === 0) {
      return response.status(400).json({ error: addEventForGrandStars_E_1 });
    }

    const firstTagDetail = getTagDetails[0]; // Access the first element of the array

    const newObjectOfSingleEvent = {
      userId: currentUserDetails._id,
      kidId: request.body.kidId,
      name: request.body.name,
      stars: request.body.stars,
      reward_type: firstTagDetail.tag_type, // Access the tag_type property from the first element
      event_type: false,
      tags: firstTagDetail._id, // Access the _id property from the first element
      is_auto_complete_event: false,
      photo: firstTagDetail.photo,
      is_recommended: false,
    };

    if (newObjectOfSingleEvent.reward_type === is_debit) {
      const amountIsSufficient = await balanceCanWithdraw(
        newObjectOfSingleEvent.userId,
        newObjectOfSingleEvent.kidId,
        newObjectOfSingleEvent.stars
      );
      if (!amountIsSufficient) {
        return response.status(400).json({
          errorCode: code400,
          success: false,
          error: addEventForGrandStars_E_2,
        });
      }
    }

    const details = await oneTimeEvent(newObjectOfSingleEvent, response);

    for (const detail of details) {
      if (detail.success === true) {
        const getEventdetail = await getEventDetails(detail.id);

        // Prepare the data needed for grantStar
        const grantStarData = {
          event_type: getEventdetail.event_type,
          reward_type: getEventdetail.reward_type,
          createdBy: getEventdetail.userId,
          kidId: getEventdetail.kidId,
          eventId: getEventdetail._id, // Change from getEventdetail.id to getEventdetail._id
          stars: getEventdetail.stars,
          activityId: detail.lastInsertedActivityId,
          event_name: getEventdetail.name,
          // Add other properties as needed
        };

        // Call grantStar with the prepared data
        await grantStarCallBackFunction(grantStarData, response);
      }
    }
  } catch (error) {
    console.error("Error in addEventForGrandStars:", error);
    response.status(400).json({
      errorCode: code400,
      success: false,
      error: `${addEventForGrandStars_E_3} ${error.message}`,
    });
  }
};

// BOOST EVENT APIs ------------------>>>>>>

export const makeFavouriteEvent = async (request, response) => {
  try {
    const authorizationHeader = request.headers[parentAuthorization];

    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: makeFavouriteEvent_E_1,
      });
    }

    // Fetch tags that match the provided userId
    const details = await userSchema.find({ _id: currentUserDetails._id });

    // Check if userId is provided
    if (!details) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: makeFavouriteEvent_E_2,
      });
    }

    const eventId = request.body.eventId;

    if (!eventId) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: makeFavouriteEvent_E_3,
      });
    }

    // Find the event by _id and check if its status is 1
    const eventToUpdate = await eventSchema.findOne({
      _id: eventId,
    });

    if (!eventToUpdate) {
      // If no event is found with the given _id and status 1, return a JSON response
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: makeFavouriteEvent_E_4,
      });
    }

    // Check if 'favourite' is false, then update it to true
    if (!eventToUpdate.favourite) {
      await eventSchema.findOneAndUpdate(
        { _id: eventId },
        { $set: { favourite: true } },
        { new: true }
      );

      // Return a success JSON response
      response.status(200).json({
        code: code200,
        success: true,
        message: makeFavouriteEvent_E_5,
      });
    } else {
      // If 'favourite' is already true, return a JSON response indicating that
      await eventSchema.findOneAndUpdate(
        { _id: eventId },
        { $set: { favourite: false } },
        { new: true }
      );

      // Return a success JSON response
      response.status(200).json({
        code: code200,
        success: true,
        message: makeFavouriteEvent_E_6,
      });
    }
  } catch (error) {
    // If there is an error, return an error JSON response
    response.status(400).json({
      errorCode: code400,
      success: false,
      error: makeFavouriteEvent_E_7,
    });
  }
};

export const makeBoostEvent = async (request, response) => {
  try {
    return false;
    const authorizationHeader = request.headers[parentAuthorization];

    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "UserId is required.",
      });
    }

    // Fetch tags that match the provided userId
    const details = await userSchema.find({ _id: currentUserDetails._id });

    // Check if userId is provided
    if (!details) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "User not found.",
      });
    }

    const eventId = request.body.eventId;

    if (!eventId) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "Please provide a valid Event ID.",
      });
    }

    // Find the event by _id and check if its status is 1
    // $or: [{ frequency: 'W' }, { frequency: 'M' }]
    const eventToUpdate = await eventSchema.findOne({
      _id: eventId,
      event_type: true,
      status: 1, // Assuming 1 represents the active status
      // max_count: { $gte: 5 } // Greater than or equal to 5
    });

    if (!eventToUpdate) {
      // If no event is found with the given _id and status 1, return a JSON response
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error:
          "Event not found for Event is Inactive. Please add active event only.",
      });
    }

    // Check if 'boostEvent' is false, then update it to true
    if (!eventToUpdate.boostEvent) {
      await eventSchema.findOneAndUpdate(
        { _id: eventId },
        { $set: { boostEvent: true } },
        { new: true }
      );

      // Return a success JSON response
      response.status(200).json({
        code: code200,
        success: true,
        message: "Event Marked as boost event successfully",
      });
    } else {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "Event already marked as boosted.",
      });
    }
  } catch (error) {
    // If there is an error, return an error JSON response
    response.status(400).json({
      errorCode: code400,
      success: false,
      error: "Error updating event",
    });
  }
};

export const addEventChallengeCriteria = async (request, response) => {
  try {
    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: makeFavouriteEvent_E_1,
      });
    }

    // Fetch tags that match the provided userId
    const details = await userSchema.find({ _id: currentUserDetails._id });

    if (!details) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: makeFavouriteEvent_E_2,
      });
    }

    // Extract required fields from the request body
    const { eventId, stars, from, to, reward } = request.body;
    let frequency = request.body.frequency ? request.body.frequency : "";

    // Validate required fields
    if (!eventId || !stars || !from || !to || !reward) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: addEventChallengeCriteria_E_1,
      });
    }

    // Find the event by _id and check if its status is 1
    const eventToUpdate = await eventSchema.findOne({
      _id: eventId,
      status: is_active,
      boostEvent: false,
      event_type: true,
    });

    if (!eventToUpdate) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: addEventChallengeCriteria_E_2,
      });
    }

    const startDate = moment(from, "DD/MM/YYYY");
    const endDate = moment(to, "DD/MM/YYYY");
    const formattedStartDate = startDate.format("DD/MM/YYYY");
    const formattedEndDate = endDate.format("DD/MM/YYYY");

    // Check for overlapping date ranges with existing activities
    const totalActivities = await activitySchema.find({
      $and: [
        {
          $or: [
            {
              start_at: {
                $gte: from,
                $lte: to,
              },
            },
            {
              end_at: {
                $gte: from,
                $lte: to,
              },
            },
          ],
        },
        {
          eventId: eventId,
        },
      ],
    });

    if (totalActivities.length === 0) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: addEventChallengeCriteria_E_3,
      });
    }

    const boostEvent = {
      userId: eventToUpdate.userId,
      kidId: eventToUpdate.kidId,
      eventId: eventToUpdate._id,
      stars: stars,
      reward: reward,
      frequency: frequency,
      from: from,
      to: to,
      status: 1,
    };

    const saveBoostEvent = await boostEventSchema.create(boostEvent);

    if (saveBoostEvent) {
      // Update the corresponding event to mark it as boosted
      const updatedEvent = await eventSchema.findOneAndUpdate(
        { _id: eventId },
        { $set: { boostEvent: true } },
        { new: true }
      );

      if (updatedEvent) {
        response.status(200).json({
          code: code200,
          success: true,
          message: addEventChallengeCriteria_S_1,
          id: saveBoostEvent.id,
        });
      } else {
        response.status(400).json({
          errorCode: code400,
          success: false,
          message: makeFavouriteEvent_E_7,
        });
      }
    } else {
      response.status(400).json({
        errorCode: code400,
        success: false,
        message: addEventChallengeCriteria_E_4,
      });
    }
  } catch (error) {
    response.status(400).json({
      errorCode: code400,
      success: false,
      error: addEventChallengeCriteria_E_5,
    });
  }
};

export const makeRequestApprovalOrRejectedALL = async (request, response) => {
  try {

    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: "UserId is required.",
      });
    }

    const userId = currentUserDetails._id;


    const { kidId, requestApproval, event_list, loan_list, fd_list } =
      request.body;

    const requiredFields = ["kidId", "requestApproval"];

    const missingFields = requiredFields.filter(
      (field) => !(field in request.body)
    );

    if (missingFields.length > 0) {
      const errorMessage = `The following field(s) are required: ${missingFields.join(
        ", "
      )}`;
      response.status(400).json({
        errorCode: code400,
        success: false,
        error: errorMessage,
      });
      return;
    }

    let result = null;

    if (event_list && event_list.length > 0) {
      for (const event of event_list) {
        const type = byEVENT;
        try {
          result = await makeEventApprov(
            { ...event, userId, kidId, type, requestApproval },
            response
          );
        } catch (error) {
          console.error(error);
          if (!response.headersSent) {
            // Send the error response only if headers have not been sent
            response.status(400).json({
              errorCode: code400,
              success: false,
              error: error.message,
            });
          }
        }
      }
    } else if (loan_list && loan_list.length > 0) {
      for (const loan of loan_list) {
        const type = loanType;
        try {
          result = await makeLoanApprov(
            { ...loan, userId, kidId, type, requestApproval },
            response
          );
        } catch (error) {
          console.error(error);
          if (!response.headersSent) {
            // Send the error response only if headers have not been sent
            response.status(400).json({
              errorCode: code400,
              success: false,
              error: error.message,
            });
          }
        }
      }
    } else if (fd_list && fd_list.length > 0) {
      for (const fd of fd_list) {
        const type = FDType;
        try {
          result = await makeFDApprov(
            { ...fd, userId, kidId, type, requestApproval },
            response
          );
        } catch (error) {
          console.error(error);
          if (!response.headersSent) {
            // Send the error response only if headers have not been sent
            response.status(400).json({
              errorCode: code400,
              success: false,
              error: error.message,
            });
          }
        }
      }
    } else {
      console.error(`No valid type found`);
      response.status(400).json({
        errorCode: code400,
        success: false,
        error: "No valid type found",
      });
    }
  } catch (error) {
    console.log(error);
    response
      .status(400)
      .json({ errorCode: code400, success: false, error: error.message });
  }
};

//
// fetch boost events
export const getAllBoostedEventList = async (request, response) => {
  try {
    const authorizationHeader = request.headers[parentAuthorization];
    const currentUserDetails = await getUserDetails(authorizationHeader);

    if (!currentUserDetails) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: boosted_M_1,
      });
    }

    const userExist = await checkUserExists(currentUserDetails._id);

    if (userExist === null) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: boosted_M_2,
      });
    }

    // Check for Undefined or Empty String for kidId
    if (!request.body.kidId) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: boosted_M_3,
      });
    }

    const kidId = request.body.kidId;
    const kidExist = await fetchUserFromKidTableById(kidId);

    if (!kidExist) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: boosted_M_4,
      });
    }

    const getBoostedEventDetails = await boostEventSchema.find({
      kidId: kidId,
    });

    // Check for empty array
    if (getBoostedEventDetails.length === 0) {
      return response.status(400).json({
        errorCode: code400,
        success: false,
        error: boosted_M_6,
      });
    }

    // Map to get each eventId
    const eventIds = getBoostedEventDetails.map(
      (boostedEvent) => boostedEvent.eventId
    );

    // Use map to fetch data for each eventId
    const detailsPromises = eventIds.map(async (eventId) => {
      const query = {
        userId: currentUserDetails._id,
        kidId: kidId,
        _id: eventId,
      };
      const eventDetails = await eventSchema.findOne(query);
      return {
        eventDetails,
        boostedEvent: getBoostedEventDetails.find((b) =>
          b.eventId.equals(eventId)
        ),
      };
    });

    const details = await Promise.all(detailsPromises);

    // Fetch tag details for each event
    const eventsWithTags = await Promise.all(
      details.map(async ({ eventDetails, boostedEvent }) => {
        const tagDetails = await getTagDetailsByIds(eventDetails.tags);

        // Assuming there's only one tag for each event
        const tags = tagDetails.length > 0 ? tagDetails[0] : null;

        return { ...eventDetails._doc, tags, boostedEvent };
      })
    );

    const totalRecords = eventsWithTags.length;

    response.status(200).json({
      code: code200,
      success: true,
      message: "Successful",
      totalRecords: totalRecords,
      data: eventsWithTags,
    });
  } catch (err) {
    response.status(500).json({
      errorCode: code500,
      success: false,
      error: err.message,
    });
  }
};


