/**
 * try
 * @param  {Function} _try   function to try
 * @param  {Function} _catch error handler
 * @summary helper function to clean up try/catch blocks
 */
exports.try = function(_try, _catch) {
  try { _try(); } catch (err) { _catch(err) }
}
