export const formatDateAndTime = (utcDateTime) => {
  // Handle empty input gracefully
  if (!utcDateTime) {
    return {
      date: "",
      time: "",
    };
  }

  // Parse the UTC datetime string into a Date object
  const date = new Date(utcDateTime);

  // Get the local timezone from the system settings
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Define options for formatting the date
  const dateOptions = {
    timeZone: localTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    formatMatcher: "basic", // Ensures that formatting is done based on a simple matching algorithm
  };

  // Define options for formatting the time
  const timeOptions = {
    timeZone: localTimeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format
  };

  // Create formatter for the date and replace slashes with dashes
  const dateFormatter = new Intl.DateTimeFormat("en-IN", dateOptions);
  const formattedDate = dateFormatter.format(date).replace(/\//g, "-");

  // Create formatter for the time
  const timeFormatter = new Intl.DateTimeFormat("en-IN", timeOptions);
  const formattedTime = timeFormatter.format(date);

  // Adjust time format for RTL languages
  const isRtl = true; // This would normally depend on user settings or locale
  const timeForRtl = isRtl
    ? formattedTime.split(" ").reverse().join(" ")
    : formattedTime;

  // Return formatted date and time
  return {
    date: formattedDate,
    time: formattedTime,
    timeForRtl,
  };
};
