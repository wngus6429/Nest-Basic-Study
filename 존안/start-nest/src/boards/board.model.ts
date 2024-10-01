export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

// 이 두가지 값만 가질 수 있도록 enum을 사용
export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
