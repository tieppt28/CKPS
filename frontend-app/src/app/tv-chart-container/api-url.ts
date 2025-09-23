import {environment} from '../../environments/environment';

export class ApiUtils {
  public static baseUrl = environment.save_load_url;

  public static getUrl(subPath: string): string {
    return this.baseUrl + subPath;
  }
}
