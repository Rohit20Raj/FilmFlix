// module.exports = {
//   preset: 'react-native',
// };

const expoPreset = require('jest-expo/jest-preset');

module.exports = {
   ...expoPreset,
   preset: "@testing-library/react-native",
}
