<template>
  <div id="add-budget">
    <form id="add-person-form" class="form">
      <fieldset>
        <legend>Add Person</legend>
        <div class="form-field__block">
          <label class="form-input__inline-block">Name:</label>
          <input class="form-input__inline-block" type="text" name="full-name" placeholder="Name" required />
        </div>

        <div class="form-field__block">
          <label class="form-input__inline-block">Salary:</label>
          <input class="form-input__inline-block" type="text" name="salary" required />
          <select name="pay">
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

  import addFields from '../mixins/addInput.js'

  export default{
    props: {
      action:{
        type: String
      }
    },
    data(){
      return {
        customField: 0,
        errors: [],
        personId: 0,
        personAction: this.action
      }
    },
    methods:{
      addPerson(){

        const fields = document.querySelector('#add-person-form').elements;

        for(let field of fields){

          field.style.border = null;

          if(field.tagName !== 'BUTTON' && field.tagName !== 'FIELDSET'){
            if(field.name.length < 1 || field.value.length < 1){
              this.errors.push(field.name)
            }
          }

        }

        if(this.errors.length > 0){
          console.log(this.errors)
          this.errors.forEach(field => {
            let elm = document.querySelector(`[name="${field}"]`);
            elm.style.border = '2px solid red';
            console.log(elm);
          })
        }else{
          let form = document.querySelector('form')
          let fields = form.elements;

          var formObj = {};

          fields.forEach((field) => {
            if(field.tagName === 'INPUT' || field.tagName === 'SELECT'){
              formObj[field.name] = field.value
            }
          })



          console.log(formObj)
          if(localStorage.getItem('persons')){

            let persons = localStorage.getItem('persons');
            // let newPerson = {};
            persons[`person-${this.personId}`] = formObj;
            console.log(persons)
            // persons[newPerson];
            localStorage.setItem('persons', JSON.stringify(persons));

          }else{
            // let personsObj = {};
            // localStorage.setItem('persons', personsObj);

            // let persons = localStorage.getItem('persons');
            // let newPerson = {};

            let persons = {}
            persons[`person-${this.personId}`] = formObj;
            // persons[newPerson];
            localStorage.setItem('persons', JSON.stringify(persons));

          }

          this.personId++

        }



        this.errors = [];


      }
    },
    updated(){
      if(this.action === 'add-person'){
        this.action = ''
      }
      console.log();
    },
    mixins: [addFields]
  }
</script>

<style lang="scss">
 #add-budget{
   box-sizing: border-box;
   width: auto;
   margin: 10px;
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
