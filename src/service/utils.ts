import { UtilsService } from '@/interfaces/service/utils';

export class UtilityService implements UtilsService {
  public encode(params: Record<string, unknown>): string {
    const jsonString = JSON.stringify(params);
    return Buffer.from(jsonString, 'utf8').toString('base64');
  }

  public decode<T>(params: string): T {
    const jsonString = Buffer.from(params, 'base64').toString('utf8');
    const decoded = JSON.parse(jsonString);
    return decoded;
  }
}
