import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}

// @Controller('boards')
// export class BoardsController {
//   constructor(private boardsService: BoardsService) {}

//   @Get()
//   getAllBoards(): Board[] {
//     return this.boardsService.getAllBoards();
//   }

//   @Post()
//   @UsePipes(ValidationPipe) // dto에 있는 validation을 사용
//   createBoard(
//     @Body() createBoardDto: CreateBoardDto,
//     // @Body('title') title: string,
//     // @Body('description') description: string,
//   ): Board {
//     return this.boardsService.createBoard(createBoardDto);
//   }

//   //localhost:3000?id=dsjklfjskdl
//   @Get('/:id')
//   getBoardById(@Param('id') id: string): Board {
//     return this.boardsService.getBoardById(id);
//   }

//   @Delete('/:id')
//   deleteBoard(@Param('id') id: string): void {
//     this.boardsService.deleteBoard(id);
//   }

//   @Patch('/:id/status')
//   updateBoardStatus(
//     @Param('id') id: string,
//     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
//   ): Board {
//     return this.boardsService.updateBoardStatus(id, status);
//   }
// }
