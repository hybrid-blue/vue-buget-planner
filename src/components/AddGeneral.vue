<template>
  <div id="edit-budget">
    <div id="general-budget">
      <span class="column-title">General Outcome</span>
      <form id="general-form" class="form">
        <fieldset>
          <div class="form-field__block form-field__no-margin">
            <button class="form-button form-button__full-width" v-on:click.prevent="addInput">Add Outcome</button>
            <div id="general-outcome-fields"></div>
          </div>
          <div id="person-budget">
            <span class="form-text__bold">Total Outcome: </span>{{ totalGeneral }}
          </div>
        </fieldset>
      </form>
    </div>

  </div>
</template>

<script>

  // import addFields from '../mixins/addInput.js'

  import { bus } from '../main.js';

  export default{
    data(){
      return {
        customField: 0,
        errors: [],
        totalGeneral: 0,
        generalData: []
      }
    },
    methods:{
      addInput: function(data = null){

        const outcomeElm = document.querySelector('#general-outcome-fields');
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

        inputName.setAttribute('name', `description-${this.customField}`);
        inputAmount.setAttribute('name', `amount-${this.customField}`);

        inputName.setAttribute('placeholder', 'Outcome Decription');
        inputAmount.setAttribute('placeholder', 'Outcome Amount');

        buttonRemove.setAttribute('class', 'form-button form-button-remove remove-field')
        buttonRemove.setAttribute('name', `remove-${this.customField}`);
        let icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-times')

        buttonRemove.appendChild(icon);

        inputName.value = data.desc;
        inputAmount.value = data.amount;

        // this.generalData.push({
        //   desc: data.desc,
        //   amount: data.amount
        // });


        let generalObj = {
          desc: data.desc,
          amount: data.amount
        }

        if(JSON.stringify(this.generalData).indexOf(JSON.stringify(generalObj)) < 0){
          this.generalData.push(generalObj)
        }

        outcomeElm.appendChild(formFieldElm);
        formFieldElm.appendChild(inputName);
        formFieldElm.appendChild(inputAmount);
        formFieldElm.appendChild(buttonRemove);

        if(data) this.calculateTotal();

        inputName.addEventListener('input', (e) => {
          let field = e.target.parentNode;
          let pos = field.id.split('-').pop();
          let inputs = field.querySelectorAll('input');

          this.generalData[pos] = {
            desc: e.target.value,
            value: parseInt(inputs[1].value),
          }
          // console.log(this.generalData)
          this.onInputKey();
        })

        inputAmount.addEventListener('input', (e) => {
          let field = e.target.parentNode;
          let pos = field.id.split('-').pop();
          let inputs = field.querySelectorAll('input');

          this.generalData[pos] = {
            desc: inputs[0].value,
            amount: parseInt(e.target.value)
          }
          // console.log(this.generalData)
          this.onInputKey();

        })

        buttonRemove.addEventListener('click', (e) => {
          e.preventDefault();

          this.generalData = [];

          let outcomeElm = document.querySelector('#general-outcome-fields')
          let targetElm = e.target.parentNode;
          outcomeElm.removeChild(targetElm);

          const fields = document.querySelector('#general-form').elements;

          let totalAmount = [];

          for(let field of fields){
            if(field.tagName !== 'BUTTON' && field.tagName !== 'FIELDSET'){
              if(field.type === 'number'){
                if(field.value.length > 0){

                  let parent = field.parentNode;


                  let generalObj = {
                    desc: parent.querySelector('[type="text"]').value,
                    amount: parent.querySelector('[type="number"]').value
                  }

                  if(JSON.stringify(this.generalData).indexOf(JSON.stringify(generalObj)) < 0){
                    this.generalData.push(generalObj)
                  }


                  totalAmount.push(parseInt(field.value))
                }
              }
            }
          }

          if(totalAmount.length > 0){
            this.totalGeneral = totalAmount.reduce((a,e) => a + e)
          }else{
            this.totalGeneral = 0;
          }

          this.$emit('generalUpdate', this.totalGeneral);
          bus.$emit('addGeneralData', this.generalData);

        })

        bus.$emit('addGeneralData', this.generalData)

        this.customField++

      },
      onInputKey: function(){
        this.calculateTotal();
      },
      calculateTotal: function(){
        const fields = document.querySelector('#general-form').elements;
        let totalAmount = [];
        for(let field of fields){
          if(field.tagName !== 'BUTTON' && field.tagName !== 'FIELDSET'){
            if(field.type === 'number'){
              if(field.value.length > 0){
                totalAmount.push(parseInt(field.value))
              }
            }
          }
        }
        if(totalAmount.length > 0){
          this.totalGeneral = totalAmount.reduce((a,e) => a + e)
        }else{
          this.totalGeneral = 0;
        }
        this.$emit('generalUpdate', this.totalGeneral);
      }
    },
    mounted: function(){
      bus.$on('generalData', (data) => {
        Object.keys(data).forEach((item) => {
          this.addInput(data[item]);
        })
      })
    }
    // mixins: [addFields]
  }
</script>

<style lang="scss" scope>
 #edit-budget{
   box-sizing: border-box;
   width: auto;
   margin: 10px;
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
   #general-budget{

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
  .form-text{
    &__bold{
      font-weight: 600;
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
 }

 #general-outcome-fields{
   display: flex;
   flex-direction: column;
   input{
     width: 95px;
   }
 }
</style>
