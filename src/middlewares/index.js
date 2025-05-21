import bodyParser from 'body-parser';
const middleware = bodyParser.urlencoded({
  extended: true,
});
export default middleware;