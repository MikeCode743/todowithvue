<template>
  <div>
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/Todo.vue";

export default {
  name: "Todo",
  components: {
    TodoList,
  },
};
</script>
