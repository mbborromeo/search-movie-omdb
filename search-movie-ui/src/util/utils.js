/* Utility functions */
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const stringToArray = (str) => {
  const arrayOfItems = str.split(', ');
  return arrayOfItems;
};

export const trimReplaceSpacesQuotes = (str) => {
  return str.trim().replaceAll(' ', '+').replaceAll("'", '`');
};

export const formatNumberOfVotes = (numberString) => {
  const numStringWithoutCommas = numberString.replaceAll(',', '');

  return numStringWithoutCommas >= 1000 && numStringWithoutCommas < 1000000
    ? `${Math.floor(numStringWithoutCommas / 1000)}K`
    : numStringWithoutCommas >= 1000000
      ? `${Math.floor(numStringWithoutCommas / 1000000)}M`
      : numberString;
};

export const hasData = (value) => {
  return value !== 'N/A' ? true : false;
};
