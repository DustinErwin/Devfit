//Credit: https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
module.exports = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
