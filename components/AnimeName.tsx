export const AnimeName = (org: string) => {
  const names: { [key: string]: string } = {
    tva: 'TVA',
    OVA: 'OVA',
    movie: 'The Movie',
  };
  return names[org] || '';
};
