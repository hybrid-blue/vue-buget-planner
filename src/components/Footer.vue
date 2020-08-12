<template>
  <div class="footer footer-horizontal">
    <span class="footer__font-bold">Total Payment per month: {{gAmount}}</span> - {{pAmount}}
  </div>
</template>

<script>
  export default{
    props:{
      gAmount:{
        type: Number
      },
      pAmount:{
        type: Number
      }
    },
    data(){
      return {
        general: this.pAmount,
        person: this.pAmount
      }
    },
    computed:{

    },
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
