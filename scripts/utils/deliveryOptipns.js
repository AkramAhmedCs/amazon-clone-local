import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs();
  let daysToAdd = deliveryOption.deliveryDays;

  while (daysToAdd > 0) {
    deliveryDate = deliveryDate.add(1, 'day');
    const dayOfWeek = deliveryDate.day(); // 0 = Sunday, 6 = Saturday

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysToAdd--;
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}
