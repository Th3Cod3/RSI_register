import moment from "moment";

const dateFilter = date => {
  return moment(date)
    .locale("en")
    .format("MMMM DD, YYYY");
};

export { dateFilter };
