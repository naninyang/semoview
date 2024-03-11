export const OriginalName = (org: string) => {
  const names: { [key: string]: string } = {
    anime: '애니메이션',
    cartoon: '만화',
    drama: '드라마',
    film: '영화',
    novel: '소설',
    webtoon: '웹툰',
  };
  return names[org] || '';
};
