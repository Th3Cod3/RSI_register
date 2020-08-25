import moment from "moment";

const dateFilter = date => {
  return moment(date)
    .locale("nl")
    .format("DD MMMM YYYY");
};

export { dateFilter };
