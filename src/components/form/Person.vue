<template>
  <div>
    <form class="form form-person">
      <fieldset>
        <legend>Add Person</legend>
        <div class="form-field__block">
          <label class="form-input__inline-block">Name:</label>
          <input v-model="name" v-on:keyup="nameKey" class="form-input__inline-block__xs-width" type="text" name="full-name" placeholder="Name" required />
        </div>

        <div class="form-field__block">
          <label class="form-input__inline-block">Salary:</label>
          <input v-model="salary" v-on:keyup="salaryKey" type="number" class="form-input__inline-block__xs-width" name="salary" required />
          <select  v-model="select" v-on:change="selectChange" name="pay">
            <option value="annually">Per Year</option>
            <option value="monthly">Per Month</option>
            <option value="4-weeks">Every 4 weeks</option>
            <option value="weekly">Every week</option>
          </select>
        </div>

        <div class="form-field__block">
          <label class="form-input__inline-block form-input__long-label">Per Month:</label><span>{{ perMonth }}</span>
        </div>

        <div class="form-field-divider"></div>
        <div class="form-field__block form-field__no-margin">
          <button id="add-fields" class="form-button form-button__half-width" v-on:click.prevent="addOutcome">Add Personal Outcome</button>
          <div class="outcome-fields form-field__block">
            <template v-for="(elm, index) in outcomeElms">
              <component v-bind:is="elm" v-bind:key="elm.name" v-bind:id="`outcome-${index}`" v-on:outcomeKey="updateOutcome" v-bind:outcomeData="outcomeData[index]"></component>
            </template>
          </div>
        </div>
        <div class="form-field__block">
          <div class="form-field-divider"></div>
        </div>
        <div class="form-field__block">
          <span class="form-text__bold">Total personal Outcome:</span> {{totalOutcome}}
        </div>
        <div class="form-field__block">
          <span class="form-text__bold">General Deduction:</span> {{generalOutcome}}
        </div>
        <div class="form-field__block">
          <div class="form-field-divider"></div>
        </div>
        <div class="form-field__block">
          <span class="form-text__bold">Remaining:</span> {{remainingOutcome}}
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import outcomeFields from './outcomeFields.vue'
  import { bus } from '../../main.js';

  export default{
    components:{
      'outcome-fields': outcomeFields
    },
    props:{
      personId:{
        type: String
      },
      general:{
        type: Number
      },
      personData:{
        type: Object
      },
      formCount:{
        type: Number
      }
    },
    data(){
      return{
        name: '',
        salary: 0,
        select: 'annually',
        perMonth: 0,
        outcomeElms: [],
        outcomeData: [],
        outcomeValues: {},
        outcomeTotal: null,
        grossOutcome: 0,
      }
    },
    methods:{
      nameKey: function(){
        // console.log('Name Update')
      },
      salaryKey: function(){
        this.perMonth = this.calculateSalary;
        this.updateOutcome();
      },
      selectChange: function(){
        this.perMonth = this.calculateSalary;
        this.updateOutcome();
      },
      addOutcome: function(){
        this.outcomeElms.push(outcomeFields)
      },
      updateOutcome: function(){

        let form = document.querySelector(`#${this.personId}`)
        var total = 0;

        this.outcomeData = [];

        form.querySelectorAll('.outcome-amount').forEach(e => {

          // console.log(e)

          let id = e.parentNode.id.split('-').pop();

          if(isNaN(parseInt(e.value))){
            this.outcomeValues[id] = 0;
          }else{
            this.outcomeValues[id] = parseInt(e.value);
          }

          let sumArray = [];

          let outcomeObj = {
            desc: e.previousSibling.value || "",
            amount: parseInt(e.value) || 0
          }

          // console.log(JSON.stringify(this.outcomeData))
          // console.log(JSON.stringify(outcomeObj))

          if(JSON.stringify(this.outcomeData).indexOf(JSON.stringify(outcomeObj)) < 0){
            this.outcomeData.push(outcomeObj)
          }

          Object.keys(this.outcomeValues).forEach((e) => {
            sumArray.push(this.outcomeValues[e])
          })

          if(sumArray.length > 0){
            total = sumArray.reduce((a, b) => a + b);
          }

        })

        this.totalOutcome = total;
        this.grossOutcome = this.perMonth - total;

        // console.log(this.outcomeData)


        let personObj = {
          id: this.personId.split('-').pop(),
          name: this.name,
          salary: this.salary,
          select: this.select,
          outcome: this.outcomeData
        }

        bus.$emit('addPersonData', personObj)

      }
    },
    computed:{
      calculateSalary: function(){
        var amount = 0;
        switch(this.select){
          case 'annually':
            amount = (parseInt(this.salary) * 0.8) / 12;
            break;
          case 'monthly':
            amount = (parseInt(this.salary) * 0.8);
            break;
          case '4-weeks':
            amount = ((parseInt(this.salary) * 0.8) * 52.1428571) / 12;
            break;
          case 'weekly':
            amount = ((parseInt(this.salary) * 0.8) * 52) / 12;
            break;
        }

        // console.log('=== AMOUNT ===')
        // console.log(amount)

        return amount.toFixed(2);
      },
      generalOutcome: function(){
        // let forms = document.querySelectorAll('.person-form');

        // console.log('===== Person Forms =====')
        // console.log(this.formCount)

        return (this.general / this.formCount) || 0
      },
      remainingOutcome: function(){
        // console.log(this.grossOutcome);
        // console.log(this.generalOutcome);
        return (this.grossOutcome - this.generalOutcome).toFixed(2);
      }
    },
    created: function(){

      // console.log(this.personData)

      this.name = this.personData.name;
      this.salary = this.personData.salary;
      this.select = this.personData.select;

      this.perMonth = this.calculateSalary;

      this.outcomeData = [];

      // console.log(this.personData)

      this.personData.outcome.forEach((data) => {
        this.outcomeData.push(data)
        this.addOutcome(data)
      })

      setTimeout(() => {
        this.updateOutcome();
      }, 10)


    }
  }
</script>
