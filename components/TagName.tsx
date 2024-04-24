export const TagName = (name: string) => {
  const names: { [key: string]: string } = {
    healing: '힐링 #치유',
    yuri: '백합',
    queer: '퀴어 #LGBTQ+',
    isekai: '이세계',
    timeslip: '타임슬립',
    anomalies: '이상현상',
    apocalypse: '아포칼립스 #좀비',
    picaresca: '피카레스크',
    horror: '공포',
  };
  return names[name] || '';
};
