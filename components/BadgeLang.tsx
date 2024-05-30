export const BadgeLang = (name: string) => {
  const names: { [key: string]: string } = {
    subtitle: '자막',
    unofficial: '비공식 한글',
    dubbing: '더빙',
    cc: 'CC',
    description: 'AD',
  };
  return names[name] || '';
};
