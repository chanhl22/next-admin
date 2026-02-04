/**
 * 페이징
 */
export interface Page<T> {
  /** 실제 데이터 배열 */
  content: T[];

  /** 전체 데이터 개수 */
  totalCount: number;

  /** 전체 페이지 수 */
  totalPage: number;

  /** 페이지당 데이터 개수 */
  pageSize: number;

  /** 현재 페이지 번호 */
  page: number;
}