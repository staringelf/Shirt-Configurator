export const assetify = function(filename) {
  return `./assets/images/${filename}`;
}

export const capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}