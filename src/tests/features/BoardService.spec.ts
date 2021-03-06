import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { Container } from "typedi";
import { FaqBoardService, NoticeBoardService } from "../../services";
import { ShowFlag } from "../../models/Enum";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});
describe("BoardService", () => {
  it("new Faq", async () => {
    const boardService = Container.get(FaqBoardService);
    const faq = await boardService.save({
      title: "new faq",
      content: "faq는 이렇습니다~",
      showFlag: ShowFlag["SHOW"]
    });
    delete faq.id;
    delete faq.createdAt;
    delete faq.updatedAt;
    delete faq.deletedAt;
    delete faq.reportCount;
    expect(faq).toEqual({
      title: "new faq",
      content: "faq는 이렇습니다~",
      showFlag: ShowFlag["SHOW"]
    });
  });
  it("new Notice", async () => {
    const boardService = Container.get(NoticeBoardService);
    const notice = await boardService.save({
      title: "new Notice",
      content: "Notice는 이렇습니다~",
      showFlag: ShowFlag["SHOW"]
    });
    delete notice.id;
    delete notice.createdAt;
    delete notice.updatedAt;
    delete notice.deletedAt;
    delete notice.reportCount;
    expect(notice).toEqual({
      title: "new Notice",
      content: "Notice는 이렇습니다~",
      showFlag: ShowFlag["SHOW"]
    });
  });

  it("getById", async () => {
    const boardService = Container.get(FaqBoardService);
    const faq = await boardService.getById(1);
    delete faq.id;
    delete faq.createdAt;
    delete faq.updatedAt;
    delete faq.deletedAt;
    delete faq.reportCount;
    expect(faq).toEqual({
      title: "new faq",
      content: "faq는 이렇습니다~",
      showFlag: ShowFlag["DELETE"]
    });
  });

  it("updateReportCount ", async () => {
    const boardService = Container.get(FaqBoardService);
    const faq = await boardService.getById(1);
    const reportfaq = await boardService.updateReportCount(1);
    faq.reportCount = faq.reportCount + 1;
    expect(faq.reportCount).toEqual(reportfaq.reportCount);
  });

  it("change show flag - delete", async () => {
    const boardService = Container.get(FaqBoardService);
    const board = await boardService.changeShowType(1, ShowFlag["DELETE"]);
    expect(board.deletedAt!.getDate()).toEqual(new Date().getDate());
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
