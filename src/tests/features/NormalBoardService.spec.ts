import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { Container } from "typedi";
import { NormalBoardService, UserAccountService } from "../../services";
import { ShowFlag } from "../../models/Enum";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe("BoardService", () => {
  it("new NormalBoard", async () => {
    const boardService = Container.get(NormalBoardService);
    const userAccountService = Container.get(UserAccountService);
    const userAccount = await userAccountService.getByClientId("123");

    const normalBoard = await boardService.save({
      title: "테스트 게시글",
      content: "안녕하세요 첫 글이에요~",
      showFlag: ShowFlag["PENDING"],
      user: userAccount.user
    });
    delete normalBoard.id;
    delete normalBoard.createdAt;
    delete normalBoard.updatedAt;
    delete normalBoard.deletedAt;
    expect(normalBoard).toEqual({
      title: "테스트 게시글",
      content: "안녕하세요 첫 글이에요~",
      showFlag: ShowFlag["PENDING"],
      user: userAccount.user,
      comments: [],
      reportCount: 0
    });
  });

  it("get Board by user", async () => {
    const boardService = Container.get(NormalBoardService);
    const userAccountService = Container.get(UserAccountService);
    const user = await userAccountService.getByClientId("123");
    const normalBoard = await boardService.getByUserId(user!.id);
    console.log(normalBoard);
  });

  it("get Boards", async () => {
    const boardService = Container.get(NormalBoardService);
    const board = await boardService.list(["user"]);
    console.log(board);
  });

  it("get one Board", async () => {
    const boardService = Container.get(NormalBoardService);
    const board = await boardService.getById(1, ["user"]);
    console.log(board.user.id);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
