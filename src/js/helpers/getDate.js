const getDate = {
  day: (date) => (
    date.split('-')[2]
  ),
  month: (date) => (
    date.split('-')[1]
  ),
  year: (date) => (
    date.split('-')[0]
  ),
};

export default getDate;
