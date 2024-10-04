import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // 아래는 board.entity 에서 user 필드와 매핑,
  // eager: true 로 설정하여 user 정보를 함께 가져옴
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
