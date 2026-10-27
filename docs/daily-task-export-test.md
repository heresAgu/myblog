# 原日报任务导出测试

## 当前验证结果（2026-10-22）

- 当前 Codex 会话的 GitHub 连接可以访问 `heresAgu/myblog`，仓库返回 `push: true`。
- GitHub 插件权限为「使用默认」，默认设置是「允许低风险操作」；未更改权限设置。
- 已从线上 `main` 的 `61621493f692ad62948865834fcbb850c7cc3881` 新建测试分支 `codex/daily-export-probe`。
- 已在测试分支创建测试说明，并通过 GitHub 工具读回，全文一致。
- 测试提交：`ec25e027d4a1e38390db011fa421d77cc8de7f13`。
- 已将本地 2026-10-21 GitHub 日报完整复制到测试分支的 `docs/daily-export-probe/codex-github-sample.md`，标为草稿并注明由当前 Codex 会话导出；再次通过 GitHub 读取后，4523 个字符全文一致。
- 完整日报传输测试提交：`c932bc58c1f00e2e6d78c256f9fc6f9cdecda2cc`。该示例不代表两个原任务已经执行导出。
- 测试后再次确认，线上 `main` 仍为上述原提交。
- 当前会话没有原 ChatGPT 定时任务的管理工具，无法读取或修改其保存的指令。
- 两个原对话的导出能力与无人值守运行权限尚待验证，自动发布尚未开启。
- 线上 `main` 的 `src/content.config.ts` 尚未包含本地的 `daily` collection；正式发布前需先部署精选栏目。

## 收到的 Work 测试结果（2026-10-22）

用户确认后续两次导出是在 Work 中新建任务执行。通过 GitHub 读取确认：

| 分类   | 测试文件                            | 日报日期   | 实际条目数 | 提交                                       |
| ------ | ----------------------------------- | ---------- | ---------- | ------------------------------------------ |
| AI     | `docs/daily-export-probe/ai.md`     | 2026-10-21 | 10         | `c0c8d457fd9804057899976fa5d494cd254896cf` |
| GitHub | `docs/daily-export-probe/github.md` | 2026-10-21 | 5          | `854721b8f3c9ba6fdc612f786eccd0042e74e9fc` |

两份文件的测试编号、分类、日期和草稿标记均符合传输测试要求；各次提交只新增对应测试文件，`main` 仍为原提交。
这证明这两次新建的 Work 任务能手动导出，不代表原定时任务已增加导出步骤，也不代表原调度已运行成功。
传输测试保留原稿内容，不覆盖本地已经过格式适配与校对的正式日报。

已准备[原定时任务按日期导出测试说明](https://github.com/heresAgu/myblog/blob/codex/daily-export-probe/docs/daily-export-scheduled-test.md)，
测试提交为 `db893c2723ffdc0786ec36cf9a4d3cc64994ce73`，创建后已读回全文核对。
目标是在原任务保存的生成指令后追加导出动作，每次运行新增 `docs/daily-export-probe/runs/<category>/<date>.md`。
当前仍未修改原任务，须在有任务管理能力的界面完成保存，再核对实际定时运行。

可在 Work 中发送：

> 请读取 heresAgu/myblog 仓库 codex/daily-export-probe 分支的 docs/daily-export-scheduled-test.md，按说明找到并更新现有的「每日 GitHub 宝藏应用」和「AI Infra 每日技术情报」两个定时任务。保留原来的内容规则、时间和时区，只追加按日期导出到测试分支的步骤。保存后重新读取配置，返回两个任务的标识和保存结果。若无管理原任务的工具，请明确说明；不要新建重复定时任务，也不要只执行一次普通导出来代替配置修改。

测试说明：
[GitHub 测试分支中的执行步骤](https://github.com/heresAgu/myblog/blob/codex/daily-export-probe/docs/daily-export-probe.md)。

传输示例：
[当前 Codex 会话导出的完整日报草稿](https://github.com/heresAgu/myblog/blob/codex/daily-export-probe/docs/daily-export-probe/codex-github-sample.md)。

## 在两个原对话中各发送一次

适用于「每日 GitHub 宝藏应用」与「AI Infra 每日技术情报」的原对话：

> 请使用 GitHub 工具读取 heresAgu/myblog 仓库 codex/daily-export-probe 分支的 docs/daily-export-probe.md，按其中的测试步骤，将本对话最近一期完整日报导出到指定测试文件。仅操作该测试分支，不发布到 main。完成后给我文件链接；若工具或权限不足，请明确说明。

必须在原对话验证。当前 Codex 会话写入成功，并不能证明原对话或其定时运行可以使用相同的工具。
分享链接提供公开快照，不提供修改原任务的权限。

## 收到测试结果后

1. 通过 GitHub 再次读取测试分支的 `docs/daily-export-probe/github.md` 和 `docs/daily-export-probe/ai.md`。
2. 核对测试编号、分类、实际日期、条目数量、完整正文和来源链接。
3. 在原任务的管理界面确认并保存导出指令；在普通对话中提出导出要求，不能替代检查任务实际保存的指令。
4. 进行一次实际定时运行验证，确认无人工操作时仍能导出。手动导出成功不能替代这项验证。
5. 精选栏目部署到主分支后，再接入格式校验、日期去重、构建检查与正式自动发布。

探测文件存放在 `docs/`，只验证完整日报能否被传输；正式内容须使用
[每日精选格式](./daily-publishing.md)，写入对应的 `src/content/daily/<category>/<date>.md`。
正式流程只新增当期文件，不覆盖旧期，不顺带提交其他本地改动。
