import moment from "moment";

export default function getDateFormatForUpdateMutation(data) {
  let dateFormatted;
  if (typeof data === "string") {
    dateFormatted = moment.unix(data).format("YYYY-MM-DD");
  } else {
    dateFormatted =
      moment(data).format("YYYY") +
      "-" +
      moment(data).format("M") +
      "-" +
      moment(data).format("D");
  }
  return dateFormatted;
}
