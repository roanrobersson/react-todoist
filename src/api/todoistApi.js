import { TodoistApi } from "@doist/todoist-api-typescript";

let _api = null;
const getApi = () => _api;

const onNewToken = ({detail}) => {
  _api = new TodoistApi(detail);
};

window.addEventListener("new_token", onNewToken);

export default getApi;
