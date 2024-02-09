export const CategoryName = (org: string) => {
  const names: { [key: string]: string } = {
    drama: '드라마',
    movie: '영화',
    game: '게임',
  };
  return names[org] || '';
};
