<template>
  <div class="header header-horizontal">
    <button v-on:click="loadData">Load Data</button>
  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    },
    methods:{
      loadData: function(){
        this.$emit('loadBudget')
      }
    }
  }
</script>

<style lang="scss" scope>
  .footer{
    margin: 10px;
    display: flex;
    &__horizontal{
      flex-direction: row;
    }
    &__font-bold{
      font-weight: 600;
    }
  }
</style>
