export const getAvatarColor = (char) => {
  const num = char.toUpperCase().charCodeAt(0) - 65;

  if (num >= 0 && num < 4) {
    return '#ad1457';
  }
  if (num >= 4 && num < 8) {
    return '#6a1b9a';
  }
  if (num >= 8 && num < 12) {
    return '#283593';
  }
  if (num >= 12 && num < 16) {
    return '#00695c';
  }
  if (num >= 16 && num < 20) {
    return '#4527a0';
  }

  return '#00838f';
};
