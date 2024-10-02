import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });
    // const found = await this.boardRepository.findOne({
    //   where: { id },
    // });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    // remove쓰면 데이터가 있는지 확인해야해서 코드가 길어짐
    // delete는 있으면 지우고 없으면 아무것도 안함
    const result = await this.boardRepository.delete({ id });
    // 지웠으면 affected가 1이상, 없으면 0
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}

//! 아래는 메모리에서 데이터를 저장하는 방법
// @Injectable()
// export class BoardsService {
//   private boards: Board[] = []; // 다른곳에서 사용할 수 없도록 private로 선언
//   getAllBoards(): Board[] {
//     return this.boards;
//   }
//   createBoard(createBoardDto: CreateBoardDto): Board {
//     const { title, description } = createBoardDto;
//     const board: Board = {
//       id: uuid(),
//       title,
//       description,
//       status: BoardStatus.PUBLIC,
//     };
//     this.boards.push(board);
//     return board;
//   }
//   getBoardById(id: string): Board {
//     const found = this.boards.find((board) => board.id === id);
//     if (!found) {
//       throw new NotFoundException(`Can't find Board with id ${id}`);
//     }
//     return found;
//   }
//   deleteBoard(id: string): void {
//     const found = this.getBoardById(id);
//     this.boards = this.boards.filter((board) => board.id !== found.id);
//   }
//   updateBoardStatus(id: string, status: BoardStatus): Board {
//     const board = this.getBoardById(id);
//     board.status = status;
//     return board;
//   }
// }
