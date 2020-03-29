import request from "../utils/request";
import { CONFIG_SERVER } from "../config";

const url = {
  login: `${CONFIG_SERVER.base}/login`
};

/**
 * 登陆
 */
export function login(username: string, password: string) {
  return request({
    url: `${url.login}`,
    method: "POST",
    data: {
      username,
      password
    }
  });
}
