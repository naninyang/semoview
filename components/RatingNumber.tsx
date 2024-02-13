export const RatingNumber = (org: string) => {
  const names: { [key: string]: string } = {
    all: 'ALL',
    a7: '7',
    b12: '12',
    c15: '15',
    d19: '19',
    none: '알수없음',
  };
  return names[org] || '';
};
