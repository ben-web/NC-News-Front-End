import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat);

export const formatDate = (timeStamp) => {
  return dayjs(timeStamp).format('Do MMM YYYY');
}

export const randomImageUrl = (width, height) => {
  const randomNumber = Math.floor(Math.random() * 85);
  return `https://picsum.photos/g/${width}/${height}?image=${randomNumber}`
}

