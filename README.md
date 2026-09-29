# 多学科仿真智能课题组网站

基于 [VitePress](https://vitepress.dev/) 的课题组官网。

- 本地预览：`https://127.0.0.1:5173/`（运行 `npm run docs:dev` 后）
- 线上地址：`https://multisimlab.github.io/`

---

## 日常开发与发布

```bash
# 安装依赖（首次或依赖变更后）
npm install

# 本地预览
npm run docs:dev

# 提交并推送（推送到 main 后会自动部署）
git add .
git commit -m "update"
git push
```

一般**只需改 `docs/` 下的内容**，不必改主题代码。

---

## 主要修改位置

### 1. 首页

| 文件 | 说明 |
| --- | --- |
| [`docs/index.md`](docs/index.md) | Hero、Features、研究方向/项目介绍等 |

### 2. 课题组成员（最常改）

| 文件 | 说明 |
| --- | --- |
| [`docs/members/members-team.ts`](docs/members/members-team.ts) | **成员数据入口**：指导教师、核心成员、博士后、研究人员、在读学生、合作成员、毕业成员 |
| [`docs/members/index.md`](docs/members/index.md) | 成员页布局（一般不用动） |
| [`docs/members/faculty/heng-yi.md`](docs/members/faculty/heng-yi.md) | 衡益教授详细介绍页 |
| [`docs/public/images/members/`](docs/public/images/members/) | 成员照片 |

**成员体系顺序：**

```text
指导教师 → 核心成员 → 博士后 → 研究人员 → 在读学生 → 合作成员 → 毕业成员
```

**添加 / 修改成员：** 编辑 `members-team.ts` 中对应数组，例如：

```ts
// 在读学生（按年级，不区分硕博）
{
  year: '2025 级',
  members: [
    {
      avatar: '/images/members/avatar-placeholder.svg', // 有照片则改路径
      name: '姓名',
      title: '专业（硕士）',
      org: '计算机学院',
      desc: '<a href="mailto:xxx@mail2.sysu.edu.cn">xxx@mail2.sysu.edu.cn</a>'
    }
  ]
}
```

**成员照片：**

1. 图片放到 `docs/public/images/members/`（如 `wu-ying-fei.png`）
2. 将对应成员的 `avatar` 改为 `/images/members/wu-ying-fei.png`

说明：

- **核心成员**：已在其他高校任教授 / 副教授 / 博导，且长期参与课题组科研
- **合作成员**：一般合作关系（联合论文、项目等）
- **毕业成员**：按届表格维护，改 `alumniByYear` 即可

### 3. 研究方向

| 文件 | 说明 |
| --- | --- |
| [`docs/research/index.md`](docs/research/index.md) | 研究方向概览 |
| [`docs/research/multiphysics.md`](docs/research/multiphysics.md) 等 | 各方向详情页 |

### 4. 科研项目

| 文件 | 说明 |
| --- | --- |
| [`docs/projects/index.md`](docs/projects/index.md) | 项目概览 |
| [`docs/projects/software.md`](docs/projects/software.md) | 软件平台 |

### 5. 科研成果

| 文件 | 说明 |
| --- | --- |
| [`docs/publications/papers.md`](docs/publications/papers.md) | 论文 |
| [`docs/publications/patents.md`](docs/publications/patents.md) | 专利 |
| [`docs/publications/software.md`](docs/publications/software.md) | 软件 |
| [`docs/publications/awards.md`](docs/publications/awards.md) | 获奖 |

### 6. 新闻动态

| 文件 | 说明 |
| --- | --- |
| [`docs/news/index.md`](docs/news/index.md) | 新闻列表（新增新闻时在此加链接） |
| [`docs/news/*.md`](docs/news/) | 单篇新闻正文 |

新增一篇新闻示例：

1. 新建 `docs/news/2026-xx-xx-标题拼音.md`
2. 在 `docs/news/index.md` 列表中增加一项

### 7. 站点配置（较少改）

| 文件 | 说明 |
| --- | --- |
| [`docs/.vitepress/config.mts`](docs/.vitepress/config.mts) | 网站标题、导航、侧边栏、页脚等 |
| [`docs/.vitepress/theme/custom.css`](docs/.vitepress/theme/custom.css) | 样式（颜色、卡片等） |
| [`docs/public/logo.svg`](docs/public/logo.svg) | 网站 Logo |

---

## 目录速览

```text
docs/
├── index.md                 ← 首页
├── members/
│   ├── members-team.ts      ← ★ 成员信息主要改这里
│   ├── index.md
│   └── faculty/heng-yi.md
├── research/                ← 研究方向
├── projects/                ← 科研项目
├── publications/            ← 论文 / 专利 / 软件 / 获奖
├── news/                    ← 新闻
└── public/
    ├── logo.svg
    └── images/members/      ← 成员照片
```

---

## 注意

1. **URL 用英文路径，页面内容用中文**（例如 `/research/multiphysics`）。
2. 改完先本地 `npm run docs:dev` 确认无误再 `git push`。
3. 推送到 `main` 后，GitHub Actions 会自动构建并发布到 Pages；若失败，到仓库 **Actions** 查看日志。
4. `docs/.vitepress/` 下主题与配置一般由维护者修改；课题组成员日常以改 Markdown 和 `members-team.ts` 为主。
