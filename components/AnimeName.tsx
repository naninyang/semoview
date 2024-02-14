export const AnimeName = (org: string) => {
  const names: { [key: string]: string } = {
    tva: 'TVA',
    OVA: 'OVA',
    movie: '극장판',
  };
  return names[org] || '';
};
