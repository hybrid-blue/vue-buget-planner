<template>
  <div v-bind:id="this.id">
    <input v-model="outcome.desc" placeholder="Description" />
    <input v-model="outcome.amount" v-on:keyup="amountKey" class="outcome-amount" type="number" placeholder="Amount" />
    <button class="form-button form-button-remove" v-on:click.prevent="removePress"><i class="fas fa-times"></i></button>
  </div>
</template>

<script>
  export default{
    props:{
      id:{
        type: String
      },
      outcomeData:{
        type: Object
      }
    },
    data(){
      return{
        outcome: {
          desc: '',
          amount: ''
        }
      }
    },
    methods:{
      amountKey: function(){
        this.emitOutcome();
      },
      removePress: function(e){
        let id = e.target.parentNode.id.split('-').pop();
        this.$emit('outcomeRemove', id)
      },
      emitOutcome: function(){
        this.$emit('outcomeKey')
      }
    },
    created: function(){

      if(this.outcomeData){
        this.outcome.desc = this.outcomeData.desc;
        this.outcome.amount = this.outcomeData.amount;
      }else{
        this.outcome.desc = '';
        this.outcome.amount = '';
      }

    }
  }
</script>

<style scoped>
  input{
    width: 75px;
    margin: 5px 0 5px 5px;
  }
</style>
