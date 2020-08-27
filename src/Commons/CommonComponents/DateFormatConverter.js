import moment from "moment";

export default function getDateFormatForUpdateMutation(data) {
  let workExperienceDate;
  if (typeof data === "string") {
    workExperienceDate = moment.unix(data).format("YYYY-MM-DD");
  } else {
    workExperienceDate =
      moment(data).format("YYYY") +
      "-" +
      moment(data).format("M") +
      "-" +
      moment(data).format("D");
  }
  return workExperienceDate;
}
