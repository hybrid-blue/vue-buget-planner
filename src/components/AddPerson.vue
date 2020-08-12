<template>
  <div>
    <div id="add-budget">
      <template v-for="(form, index) in forms">
        <component class="person-form" v-bind:is="form" v-bind:key="form.name" v-bind:personId="`person-form-${index}`" v-bind:id="`person-form-${index}`" v-bind:general="general" v-bind:personData="personData[index]" v-bind:formCount="formCount"></component>
      </template>
    </div>
    <div class="button-wrapper button-wrapper__horizontal">
      <button v-on:click="addPerson">Add Person</button>
    </div>
  </div>
</template>

<script>
  import personFrom from './form/Person.vue';
  import { bus } from '../main.js';

  export default{
    components:{
      'person-form': personFrom
    },
    props: {
      action:{
        type: String
      },
      general:{
        type: Number
      }
    },
    data(){
      return {
        personAction: this.action,
        personAmount: {},
        forms: [],
        personData:[],
        formCount: null
      }
    },
    methods:{
      addPerson: function(){
        this.formCount = (this.forms.length || 0) + 1;
        this.forms.push(personFrom);
        this.$emit('newPerson', this.formCount);
      },
    },
    // created: function(){
    //   this.forms.push(personFrom);
    //   console.log(this.forms)
    // },
    mounted: function(){
      bus.$on('personData', (data) => {

        Object.keys(data).forEach((item) => {
          this.personData.push(data[item]);
          this.addPerson();
        })

      })
    }
  }
</script>

<style lang="scss">
 #add-budget{
   box-sizing: border-box;
   width: auto;
   margin: 10px;
   display: flex;
   flex-direction: row;
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
   &-person{
     min-width: 410px;
   }
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
      &__xs-width{
        width: 110px;
      }
    }
    &__long-label{
      width: 110px !important;
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
  .form-text{
    &__bold{
      font-weight: 600;
    }
  }
 }

 .button-wrapper{
   margin: 10px;
   display: flex;
   &__horizontal{
     flex-direction: row;
   }
 }

 .outcome-fields{
   display: flex;
   flex-direction: column;
   input{
     width: 40%;
   }
 }
</style>
