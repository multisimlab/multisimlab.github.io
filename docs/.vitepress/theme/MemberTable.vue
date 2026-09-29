<script setup lang="ts">
import type { MemberRow } from '../../members/types'

defineProps<{
  title: string
  rows: MemberRow[]
}>()
</script>

<template>
  <div class="alumni-year">
    <h3>{{ title }}</h3>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>学位</th>
          <th>专业</th>
          <th>去向</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ row.name }}</td>
          <td>{{ row.degree }}</td>
          <td>{{ row.major }}</td>
          <td>{{ row.destination }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
