export function capitalize(string: string) {
  const words = string.trim().split(' ');

  const mappedText = words.map((word) => {
    const [firstLetter, ...rest] = word;

    return firstLetter?.toLocaleUpperCase().concat(...rest);
  });

  return mappedText.join(' ');
}
