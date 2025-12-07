import { BaseService } from '../misc/base.service';
import { MPattern, MPatterns } from '../../models/wpp/pattern';
import { singleton } from 'tsyringe';

@singleton()
export class PatternService extends BaseService {

  async getDataByLang(langid: number, filter: string, filterScope: string): Promise<MPatterns>;
  async getDataByLang(langid: number, filter: string, filterScope: string, page: number, rows: number): Promise<MPatterns>;
  async getDataByLang(langid: number, filter: string, filterScope: string, page?: number, rows?: number): Promise<MPatterns> {
    let url = `${this.baseUrlAPI}PATTERNS?filter=LANGID,eq,${langid}&order=PATTERN`;
    if (filter)
      url += `&filter=${filterScope},cs,${encodeURIComponent(filter)}`;
    if (page !== undefined && rows !== undefined)
      url += `&page=${page},${rows}`;
    const result = await this.httpGet<MPatterns>(url);
    return ({
      records: result.records.map(value => Object.assign(new MPattern(), value)),
      results: result.results,
    });
  }

  async getDataById(id: number): Promise<MPattern[]> {
    const url = `${this.baseUrlAPI}PATTERNS?filter=ID,eq,${id}`;
    const result = await this.httpGet<MPatterns>(url);
    return result.records.map(value => Object.assign(new MPattern(), value));
  }

  async create(item: MPattern): Promise<number> {
    const url = `${this.baseUrlAPI}PATTERNS`;
    const payload: any = { ...item, ID: null };
    return await this.httpPost<number>(url, payload);
  }

  async update(item: MPattern): Promise<number> {
    const url = `${this.baseUrlAPI}PATTERNS/${item.ID}`;
    return await this.httpPut<number>(url, item);
  }

  async delete(id: number): Promise<number> {
    const url = `${this.baseUrlAPI}PATTERNS/${id}`;
    return await this.httpDelete(url);
  }
}
