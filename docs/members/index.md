---
layout: page
title: 课题组成员
sidebar: false
---

<script setup lang="ts">
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
import {
  faculty,
  coreMembers,
  postdocs,
  researchers,
  studentsByYear,
  alumniByYear
} from './members-team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>课题组成员</template>
    <template #lead>
      指导教师 · 核心成员 · 博士后 · 研究人员 · 在读学生 · 毕业成员
    </template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>指导教师</template>
    <template #members>
      <VPTeamMembers size="medium" :members="faculty" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>核心成员</template>
    <template #lead>
      在其他高校担任教授 / 副教授 / 博士生导师，并长期参与本课题组科研工作
    </template>
    <template #members>
      <VPTeamMembers v-if="coreMembers.length" size="small" :members="coreMembers" />
      <div v-else class="members-empty-box">暂无核心成员信息</div>
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>博士后</template>
    <template #members>
      <VPTeamMembers v-if="postdocs.length" size="small" :members="postdocs" />
      <div v-else class="members-empty-box">暂无在站博士后信息</div>
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>研究人员</template>
    <template #members>
      <VPTeamMembers v-if="researchers.length" size="small" :members="researchers" />
      <div v-else class="members-empty-box">暂无研究人员信息</div>
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>在读学生</template>
    <template #lead>按入学年级列出</template>
    <template #members>
      <div class="student-groups">
        <div
          v-for="group in studentsByYear"
          :key="group.year"
          class="student-year"
        >
          <h3 class="student-year-title">{{ group.year }}</h3>
          <VPTeamMembers
            v-if="group.members.length"
            size="small"
            :members="group.members"
          />
          <div v-else class="members-empty-inline">待补充</div>
        </div>
      </div>
    </template>
  </VPTeamPageSection>
</VPTeamPage>

<div class="members-alumni-wrap">
  <div class="members-alumni-head">
    <div class="title-line"></div>
    <h2 class="members-alumni-title">毕业成员</h2>
    <p class="members-alumni-lead">按届别汇总学位、专业与去向</p>
  </div>

  <div class="alumni-block">
    <MemberTable
      v-for="group in alumniByYear"
      :key="group.year"
      :title="group.year"
      :rows="group.rows"
    />
    <p class="alumni-overview">
      去向概览：高校与科研机构 · 科技企业 · 工程技术单位 · 继续深造
    </p>
  </div>
</div>
