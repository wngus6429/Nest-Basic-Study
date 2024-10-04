import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // ManyToOne: Board 엔티티는 다대일 관계에서 하나의 User 에 속합니다. 이는 여러 개의 Board가 한 명의 User 에 연결될 수 있음을 의미합니다.
  // 예를 들어, 한 명의 사용자는 여러 개의 게시글(Board)을 작성할 수 있지만, 하나의 게시글은 단 한 명의 사용자에만 속할 수 있습니다.
  // (type) => User: Board가 속하는 대상 엔티티는 User 엔티티입니다. 화살표 함수로 해당 엔티티를 지정합니다.
  // (user) => user.boards: User 엔티티 안에서 연결되는 필드를 나타냅니다. 이 부분은 User 엔티티에 boards라는 필드가 있어야 하며, 이 필드는 해당 유저가 작성한 여러 Board를 나타냅니다. 즉, User는 1
  // 관계로 여러 개의 Board를 가질 수 있다는 뜻입니다.
  // { eager: false } User 엔티티를 가져올 때 Board 엔티티를 함께 가져오지 않음
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
