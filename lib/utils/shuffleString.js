export function shuffleString(str) {
  // Convert the string to an array of characters
  const charArray = str.split('');

  // Use the sort() method with a random comparison function
  // Math.random() - 0.5 returns a random value between -0.5 and 0.5,
  // which effectively shuffles the array elements randomly during sorting.
  charArray.sort(() => Math.random() - 0.5);

  // Join the array of characters back into a string
  return charArray.join('');
}
