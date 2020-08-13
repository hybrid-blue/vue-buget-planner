<template>
  <div class="header header-horizontal">
    <button class="form-button form-button__xs-width" v-on:click="loadData">Load Data</button> <button class="form-button form-button__xs-width" v-on:click="saveData">Save Data</button>
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
      },
      saveData: function(){
        this.$emit('saveBudget')
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
