<template>
  <button ref="changeColor" @click="handleClick"></button>
</template>

<script>
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
export default {
  name: "app",
  mounted() {
    chrome.storage.sync.get("color", ({ color }) => {
      this.$refs.changeColor.style.backgroundColor = color;
    });
  },
  methods: {
    async handleClick() {
      // 调用Chrome接口取出当前标签页面
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      // 以当前标签页为上下文，执行setPageBackgroundColor函数
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
      });
    },
  },
};
</script>

<style>
button {
  height: 30px;
  width: 30px;
  outline: none;
  margin: 10px;
  border: none;
  border-radius: 2px;
}
button.current {
  box-shadow: 0 0 0 2px white, 0 0 0 4px black;
}
</style>
