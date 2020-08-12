<template>
  <div id="add-budget">
    <form id="add-person-form" class="form">
      <fieldset>
        <legend>Add Person</legend>
        <div class="form-field__block">
          <label class="form-input__inline-block">Name:</label>
          <input class="form-input__inline-block" type="text" placeholder="Name" />
        </div>

        <div class="form-field__block">
          <label class="form-input__inline-block">Salary:</label>
          <input class="form-input__inline-block" type="text" />
          <select>
            <option value="annually">Per Year</option>
            <option value="monthly">Per Month</option>
            <option value="4-weeks">Every 4 weeks</option>
            <option value="weekly">Every week</option>
          </select>
        </div>

        <div class="form-field-divider"></div>

        <div class="form-field__block form-field__no-margin">
          <button class="form-button__half-width" v-on:click.prevent="addInput">Add Personal Outcome</button>
          <div id="outcome-fields"></div>
        </div>

        <div class="form-field-divider"></div>

        <div class="form-field__block">
          <button class="form-button__full-width" v-on:click.prevent="addPerson">Add Person</button>
        </div>

      </fieldset>
    </form>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        customField: 0
      }
    },
    methods:{
      addInput(){

        const outcomeElm = document.querySelector('#outcome-fields');
        const formFieldElm = document.createElement('div');

        formFieldElm.setAttribute('id', `field-${this.customField}`)
        formFieldElm.setAttribute('class', 'form-field__flex form-field__space-between');

        const inputName = document.createElement('input');
        const inputAmount = document.createElement('input');
        const buttonRemove = document.createElement('button');

        inputName.setAttribute('type', 'text');
        inputAmount.setAttribute('type', 'number');

        inputName.setAttribute('class', 'text');
        inputAmount.setAttribute('class', 'number');

        inputName.setAttribute('placeholder', 'Outcome Decription');
        inputAmount.setAttribute('placeholder', 'Outcome Amount');

        buttonRemove.setAttribute('class', 'remove-field')
        buttonRemove.innerHTML = "X";

        outcomeElm.appendChild(formFieldElm);
        formFieldElm.appendChild(inputName);
        formFieldElm.appendChild(inputAmount);
        formFieldElm.appendChild(buttonRemove);


        buttonRemove.addEventListener('click', (e) => {
          e.preventDefault();
          let outcomeElm = document.querySelector('#outcome-fields')
          let targetElm = e.target.parentNode;
          outcomeElm.removeChild(targetElm);
        })

        this.customField++

      },
      addPerson(){
        const fields = document.querySelector('#add-person-form').elements;

        for(let field of fields){

          if(field.tagName !== 'BUTTON' && field.tagName !== 'FIELDSET'){
            console.log(field.value)
            console.log(field.value)
          }

        }
      }
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
