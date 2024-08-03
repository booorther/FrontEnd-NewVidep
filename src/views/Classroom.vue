<template>
	<div>课堂</div>
<van-field v-model="value" label="文本" placeholder="请输入用户名" />

<van-field
  v-model="message"
  rows="2"
  autosize
  type="textarea"
  maxlength="50"
  placeholder="请输入留言"
  show-word-limit
/>
</template>

<script>
</script>

<style>
</style>