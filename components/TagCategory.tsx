export const TagCategoryName = (org: string) => {
  const names: { [key: string]: string } = {
    drama: '드라마',
    ott_drama: '드라마',
    film: '영화',
    ott_film: '영화',
    game: '게임',
    ott_documentary: '다큐멘터리',
    ott_documentary_film: '다큐멘터리 #영화',
  };
  return names[org] || '';
};
