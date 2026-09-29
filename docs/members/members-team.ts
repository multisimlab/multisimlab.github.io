import type { DefaultTheme } from 'vitepress/theme'
import type { MemberRow, CollaboratorRow } from './types'

export const faculty: DefaultTheme.TeamMember[] = [
  {
    avatar: '/images/members/heng-yi.jpg',
    name: '衡益',
    title: '教授 / 博士生导师',
    org: '中山大学计算机学院',
    orgLink: 'https://cse.sysu.edu.cn/',
    desc:
      'HPC + AI for Science and Engineering<br />' +
      '多物理场仿真 · 科学计算 · 人工智能<br /><br />' +
      '<a href="mailto:hengyi@mail.sysu.edu.cn">hengyi@mail.sysu.edu.cn</a><br />' +
      '<a class="member-detail-link" href="/members/faculty/heng-yi">查看详细介绍 →</a>'
  }
]

/**
 * 核心成员：已在其他高校担任教授 / 副教授 / 博导等，
 * 并长期参与本课题组科研工作的骨干成员（非一般合作关系）
 */
export const coreMembers: DefaultTheme.TeamMember[] = [
  {
    avatar: '/images/members/avatar-placeholder.svg',
    name: '罗玖',
    title: '副教授 / 硕士研究生导师',
    org: '苏州大学未来科学与工程学院',
    orgLink: 'https://web.suda.edu.cn/luojiu/',
    desc:
      '多尺度数学建模与高性能计算 · 多物理场智能仿真<br />' +
      '数学物理正反问题 · AI 赋能绿色低碳水处理<br /><br />' +
      '<a href="mailto:luojiu@suda.edu.cn">luojiu@suda.edu.cn</a><br />' +
      '<a class="member-detail-link" href="https://web.suda.edu.cn/luojiu/" target="_blank" rel="noreferrer">个人主页 →</a>'
  }
]

/** 有成员时在此追加；无详情页则不要写详情链接 */
export const postdocs: DefaultTheme.TeamMember[] = [
  {
    avatar: '/images/members/avatar-placeholder.svg',
    name: '易嘉',
    title: '博士后',
    org: '系统工程学院',
    desc: '（邮箱待补充）'
  },
  {
    avatar: '/images/members/avatar-placeholder.svg',
    name: '刘铭钊',
    title: '博士后',
    desc: '（邮箱待补充）'
  }
]

export const researchers: DefaultTheme.TeamMember[] = [
  {
    avatar: '/images/members/avatar-placeholder.svg',
    name: '代耀',
    title: '研究员',
    desc: '（邮箱待补充）'
  },
  {
    avatar: '/images/members/avatar-placeholder.svg',
    name: '杨青青',
    title: '研究员',
    desc: '（邮箱待补充）'
  },
  {
    avatar: '/images/members/avatar-placeholder.svg',
    name: '曾剑峰',
    title: '研究员',
    desc: '（邮箱待补充）'
  }
]

/** 在读学生：按年级；同年级内先博士后硕士，再按姓名拼音排序（不展示邮箱） */
export const studentsByYear: { year: string; members: DefaultTheme.TeamMember[] }[] = [
  {
    year: '2023 级',
    members: [
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '韩熠南',
        title: '计算数学（博士）',
        org: '计算机学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '王金霖',
        title: '计算数学（博士）',
        org: '系统工程学院'
      }
    ]
  },
  {
    year: '2024 级',
    members: [
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '黄洁华',
        title: '硕士',
        org: '计算机学院'
      }
    ]
  },
  {
    year: '2025 级',
    members: [
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '李锦辉',
        title: '计算数学（博士）',
        org: '计算机学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '肖择宁',
        title: '博士',
        org: '系统工程学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '黄江波',
        title: '大数据技术与工程（硕士）',
        org: '计算机学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '黄全盼',
        title: '大数据技术与工程（硕士）',
        org: '计算机学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '马逢睿',
        title: '计算机技术（硕士）',
        org: '计算机学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '魏逸坤',
        title: '硕士',
        org: '计算机学院'
      }
    ]
  },
  {
    year: '2026 级',
    members: [
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '李瑞鸣',
        title: '计算数学（博士）',
        org: '计算机学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '林铭盛',
        title: '系统科学（硕士）',
        org: '系统工程学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '刘乃铭',
        title: '系统科学（硕士）',
        org: '系统工程学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '宋雨婷',
        title: '计算机技术（硕士）',
        org: '计算机学院'
      },
      {
        avatar: '/images/members/avatar-placeholder.svg',
        name: '王梓菲',
        title: '计算机技术（硕士）',
        org: '计算机学院'
      },
      {
        avatar: '/images/members/wu-ying-fei.png',
        name: '吴莹菲',
        title: '计算机科学与技术（硕士）',
        org: '计算机学院'
      }
    ]
  }
]

/**
 * 合作成员：已毕业、现就职/就读于其他高校或机构，仍与课题组保持合作
 * （一般合作关系；若已是教授/副教授/博导且长期深度参与，请放入 coreMembers）
 */
export const collaborators: CollaboratorRow[] = [
  {
    name: 'XXX',
    degree: '博士',
    affiliation: 'XX 大学',
    note: '联合科研 / 论文合作'
  },
  {
    name: 'XXX',
    degree: '硕士',
    affiliation: 'XX 研究院',
    note: '项目合作'
  }
]

/** 毕业成员：按届维护 */
export const alumniByYear: { year: string; rows: MemberRow[] }[] = [
  {
    year: '2026 届',
    rows: [
      {
        name: 'XXX',
        degree: '博士',
        major: '计算机科学与技术',
        destination: 'XX 大学'
      },
      {
        name: 'XXX',
        degree: '硕士',
        major: '数学',
        destination: 'XX 研究院'
      },
      {
        name: 'XXX',
        degree: '硕士',
        major: '计算机科学与技术',
        destination: 'XX 科技有限公司'
      }
    ]
  },
  {
    year: '2025 届',
    rows: [
      {
        name: 'XXX',
        degree: '博士',
        major: 'XXX',
        destination: 'XX 大学'
      },
      {
        name: 'XXX',
        degree: '硕士',
        major: 'XXX',
        destination: 'XX 公司'
      }
    ]
  },
  {
    year: '2024 届',
    rows: [
      {
        name: 'XXX',
        degree: '硕士',
        major: 'XXX',
        destination: 'XX 大学'
      }
    ]
  }
]
