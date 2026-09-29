<script setup lang="ts">
import type { CollaboratorRow } from '../../members/types'

defineProps<{
  rows: CollaboratorRow[]
}>()
</script>

<template>
  <div class="alumni-year">
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>学位</th>
          <th>现单位</th>
          <th>合作说明</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ row.name }}</td>
          <td>{{ row.degree }}</td>
          <td>{{ row.affiliation }}</td>
          <td>{{ row.note || '持续合作' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
