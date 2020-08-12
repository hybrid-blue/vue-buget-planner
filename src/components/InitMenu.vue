<template>
  <div id="init-menu">
    <h1>{{title}}</h1>
    <div v-if="init" class="button-wrapper">
      <button v-on:click="setupBudget">Create Budget</button>
      <button v-on:click="editBudget">Edit Budget</button>
    </div>
  </div>
</template>

<script>

  import { bus } from '../main';

  export default{
    data(){
      return {
        title: 'Vue Budget Planner',
        init: true,
        createBudget: false
      }
    },
    methods:{
      setupBudget: function(){
        this.title = 'Setup Budget'
        this.init = false;
        this.createBudget = true;
      },
      editBudget: function(){
        bus.$emit('switchComponent', 'edit-budget')
      },
      addPerson: function(){
        bus.$emit('switchComponent', 'add-person')
      },
      addGeneral: function(){
        bus.$emit('switchComponent', 'add-general')
      }
    }
  }
</script>

<style lang="scss">
  #init-menu{
    h1{
      text-align: center;
    }
    .button-wrapper{
      display: flex;
      flex-direction: column;
      width: 400px;
      margin: 10px auto;
      button{
        margin: 10px 100px;
        padding: 10px 0;
      }
    }
  }
</style>
