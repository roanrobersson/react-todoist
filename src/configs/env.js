export const API_URL =
  import.meta.env.VITE_TODOIST_REACT_API_URL?.toString() ??
  "https://todoist.com";

export const AUTH_URL =
  import.meta.env.VITE_TODOIST_REACT_AUTH_URL?.toString() ??
  "https://todoist.com/oauth/authorize";

export const AUTH_SCOPE =
  import.meta.env.VITE_TODOIST_AUTH_SCOPE?.toString() ??
  "data:read_write,data:delete,project:delete";

export const AUTH_STATE =
  import.meta.env.VITE_TODOIST_AUTH_CODE?.toString() ?? "compass.uol";

export const CLIENT_ID =
  import.meta.env.VITE_TODOIST_CLIENT_ID?.toString() ??
  "c11c6b6e75cf49a191217deef00c3358";

export const CLIENT_SECRET =
  import.meta.env.VITE_TODOIST_CLIENT_SECRET?.toString() ??
  "3babbf94e68648a284e1ab24d9ece14b";
