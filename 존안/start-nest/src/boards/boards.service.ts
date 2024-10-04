import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  createQueryBuilder(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }
  // async getUserBoards(user: User): Promise<Board[]> {
  //   return await this.boardRepository.find({ where: { user } });
  // }

  async getUserBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
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

  async deleteBoard(id: number, user: User): Promise<void> {
    // remove쓰면 데이터가 있는지 확인해야해서 코드가 길어짐
    // delete는 있으면 지우고 없으면 아무것도 안함
    const result = await this.boardRepository.delete({ id, user }); // 해당 유저만 삭제하게끔
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
