<template>
  <div>
    <div id="add-budget">
      <template v-for="(form, index) in forms">
        <component class="person-form" v-bind:is="form" v-bind:key="form.name" v-bind:personId="`person-form-${index}`" v-bind:id="`person-form-${index}`" v-bind:general="general" v-bind:personData="personData[index]" v-bind:formCount="formCount"></component>
      </template>
    </div>
    <div class="button-wrapper button-wrapper__horizontal">
      <button class="form-button form-button__large-width form-button__right-margin" v-on:click="addPerson">Add Person</button>
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
     border: 0;
   }
   label{
     font-weight: 600;
     width: 50px;
   }
   legend{
     font-weight: 600;
   }
   .person-form{
     margin: 0 10px 0 0;
     &:last-child{
       margin: 0;
     }
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
    background: #42b883;
    border: 1px solid #42b883;
    border-radius: 2px;
    color: #fff;
    padding: 10px 0;
    font-weight: 600;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
  .form-text{
    &__bold{
      font-weight: 600;
    }
  }
  .select-rate{
    margin: 0 0 0 10px;
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
   &__large-width{
     width: 190px;
     margin: 10px 0;
   }
   &__right-margin{
     margin: 0 0 0 15px;
   }
   background: #42b883;
   border: 1px solid #42b883;
   border-radius: 2px;
   color: #fff;
   padding: 10px 0;
   font-weight: 600;
   box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
   outline: none;
   &:active{
     transform: translate(2px, 2px);
     box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
     border: 1px solid transparent;
     outline: none;
   }
   &-remove{
     margin: 0 0 0 10px;
     padding: 2px 10px !important;
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
