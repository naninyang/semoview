export const AnimeName = (org: string) => {
  const names: { [key: string]: string } = {
    tva: 'TVA',
    ova: 'OVA',
    movie: '극장판',
  };
  return names[org] || '';
};
