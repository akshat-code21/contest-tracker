export const getDate = (startTime: string) => {
  const d = new Date(startTime);
  d.setHours(0, 0, 0, 0); // reset time to midnight
  return d.getTime();
};
