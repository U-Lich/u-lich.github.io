/**
 * Regex for matching lines describing schedule for subjects in a schedule string.
 * If used in a `matchAll()` method, each element in the resulting array will represent one subject with following structure:
 * ```
 * [
 *  [0] => Full match
 *  [1] => Subject ID => (\d+) => 1 or more digits
 *  [2] => Class ID => ([a-zA-Z0-9]+) => 1 or more alphanumeric characters
 *  [3] => Discussion group => (\d*) => 0 or more digits
 *  [4] => Subject name => (\S+(?: +\S+)+) => 1 or more non-whitespace characters, possibly separated by spaces
 *  [5] => Credits => (\d+) => 1 or more digits
 *  [6] => Subject type => (\S+(?: +\S+)+) => 1 or more non-whitespace characters, possibly separated by spaces
 *  [7] => Day of week => (\S+(?: +\S+)+) => 1 or more non-whitespace characters, possibly separated by spaces
 *  [8] => Periods => ([0-9-]+) => 1 or more digits or dashes
 *  [9] => Room => ([a-zA-Z0-9.-]+) => 1 or more alphanumeric characters, dots or dashes
 *  [10] => Weeks => ([0-9_]+) => 1 or more digits or underscores
 * ]
 * ```
 */
const SubjectRegex =
  /^(\d+)\t+([a-zA-Z0-9]+)\t+(\d*)\t+(\S+(?: +\S+)+)\t+(\d+)\t+(\S+(?: +\S+)+)\t+(\S+(?: +\S+)+)\t+([0-9-]+)\t+([a-zA-Z0-9.-]+)\t+([0-9_]+)\t+$/gm;

export default SubjectRegex;
