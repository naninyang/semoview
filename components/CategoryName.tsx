export const CategoryName = (org: string) => {
  const names: { [key: string]: string } = {
    drama: '드라마',
    film: '영화',
    game: '게임',
    anime: '애니메이션',
  };
  return names[org] || '';
};
