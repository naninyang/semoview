export const FormatJaLang = (description: string) => {
  const regex = /<([^>]+)>/g;
  return description.replace(regex, "<span lang='ja'>$1</span>");
};
