import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export const formatDate = (timeStamp) => {
  return (dayjs().diff(dayjs(timeStamp), 'days') > 7)
    ? dayjs(timeStamp).format('Do MMM YYYY')
    : dayjs(timeStamp).fromNow();
}
