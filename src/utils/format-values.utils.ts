export const formatToCurrency = (value: number): string => {
  const formater = new Intl.NumberFormat('eng', {
    style: 'currency',
    currency: 'USD',
  });

  return formater.format(Number.isNaN(value) ? 0 : value);
};

export const formatToDate = (
  currentDate: string | number | Date,
  hasMinutesAndHoursAndSecouds?: boolean
): string => {
  if (!currentDate) return '-';

  const paramValue = hasMinutesAndHoursAndSecouds ? '2-digit' : undefined;

  const dateFormatter = new Intl.DateTimeFormat('eng', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    minute: paramValue,
    hour: paramValue,
    second: paramValue,
  });

  try {
    return dateFormatter.format(new Date(currentDate));
  } catch (error) {
    return 'Invalid Date';
  }
};

export const formatToNumber = (
  value: string,
  options?: Intl.NumberFormatOptions
) => {
  const formater = new Intl.NumberFormat('eng', options);
  const numberFyedValue = +value;

  if (Number.isNaN(numberFyedValue)) {
    throw new Error('Número inválido');
  }

  return formater.format(numberFyedValue);
};

export const formatRelativeTime = (
  value: number | Date | string,
  formatType?: Intl.RelativeTimeFormatUnit
): string => {
  const formater = new Intl.RelativeTimeFormat('eng', {
    numeric: 'auto',
    style: 'narrow',
    localeMatcher: 'best fit',
  });

  return formater.format(new Date(value).getDate(), formatType || 'day');
};
