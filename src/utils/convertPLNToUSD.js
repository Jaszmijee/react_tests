export const convertPLNToUSD = (PLN) => {

  if (PLN === undefined || PLN === '') {
    return NaN;
  }

  if (typeof PLN === 'string') {
    return NaN;
  }

  if (PLN === null || (typeof PLN !== 'string' && typeof PLN !== 'number')) {
    return 'Error';
  }

  const PLNtoUSD = PLN / 3.5;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  if (PLN <= 0) {
    return formatter.format(0).replace(/\u00a0/g, ' ');
  }

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}