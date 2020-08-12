<template>
  <div id="edit-budget">
    <div id="general-budget">

    </div>
    <div id="person-budget">

    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>

<style lang="scss">
 #add-budget{
   width: 400px;
   margin: 10px auto;
   fieldset{
     display: block;
     border: 2px solid #222;
   }
   label{
     font-weight: 600;
     width: 50px;
   }
   legend{
     font-weight: 600;
   }
 }

 .form{
  .form-field{
    &__block{
      display: block;
      margin: 0 0 10px 0;
      width: 100%;
    }
    &-divider{
      height: 1px;
      width: 100%;
      background: #222;
    }
    &__flex{
      display: flex;
      width: 100%;
      margin: 0 0 10px 0;
    }
    &__space-between{
      justify-content: space-between;
    }
  }
  .form-input{
    &__block{
      display: block;
      width: 100%;
    }
    &__inline-block{
      display: inline-block;
      margin: 0 10px 0 0;
    }
  }
  .form-button{
    &__full-width{
      width: 100%;
      margin: 10px 0;
    }
    &__half-width{
      width: 50%;
      margin: 10px 0;
    }
  }
 }

 #outcome-fields{
   display: flex;
   flex-direction: column;
   input{
     width: 150px;
   }
 }
</style>
