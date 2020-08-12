<template>
  <div id="app-wrapper">
    <header id="app-header">
      <app-header v-on:loadBudget="loadBudget($event)"></app-header>
    </header>
    <main id="app-content">
      <div class="table">
        <div class="left-column">
          <general v-on:generalUpdate="generalUpdate($event)" v-bind:loadGeneral="generalData"></general>
        </div>
        <div class="right-column">
          <person v-on:personUpdate="personUpdate($event)" v-on:newPerson="newPerson($event)" v-bind:general="gAmount"></person>
        </div>
      </div>
    </main>
    <footer id="app-footer">
      <app-footer v-bind:gAmount="gAmount" v-bind:pAmount="pAmount"></app-footer>
    </footer>
  </div>
</template>

<script>
  import general from './AddGeneral.vue';
  import person from './AddPerson.vue';
  import footer from './Footer.vue';
  import header from './Header.vue';

  import { bus } from '../main.js';

  export default{
    components:{
      'person': person,
      'general': general,
      'app-footer': footer,
      'app-header': header,
    },
    data(){
      return {
        showInitMenu: true,
        showEditor: false,
        actionPerson: '',
        action: '',
        gAmount: 0,
        pAmount: 0,
        generalData: {},
        personData: [],
        budgetData: {
          general: [],
          person: []
        }
      }
    },
    methods:{
      updatePerson: function(msg){
        this.action = msg;
      },
      generalUpdate: function(val){
        this.gAmount = val;
      },
      personUpdate: function(val){
        let valArray = [];
        Object.keys(val).forEach((item) => {
          valArray.push(val[item]);
        });
        valArray.reduce((a,e) => a + e);
        this.pAmount = valArray.reduce((a,e) => a + e);
      },
      newPerson: function(val){
        document.querySelectorAll('.right-column')[0].style.width = `${val * 430}px`;
        let contentWidth = document.querySelector('#app-content').offsetWidth;
        document.querySelector('#app-footer').style.width = `${contentWidth}px`
      },
      loadBudget: function(){
        var data = {
          general:[
            {
              desc: 'Mortage',
              amount: 420
            },
            {
              desc: 'Council Tax',
              amount: 102
            },
            {
              desc: 'Energy',
              amount: 40
            },
            {
              desc: 'Home Insurance',
              amount: 18
            },
            {
              desc: 'Life Insurance',
              amount: 25
            },
            {
              desc: 'Emergencies',
              amount: 30
            },
            {
              desc: 'Car Insurances',
              amount: 76
            },
            {
              desc: 'broadband',
              amount: 46
            },
            {
              desc: 'food',
              amount: 160
            },
          ],
          person: [
            {
              id: 0,
              name: 'Aaron',
              salary: 25000,
              type: 'annually',
              outcomes: [
                {
                  desc: 'Phone',
                  amount: 25
                },
                {
                  desc: 'Gym',
                  amount: 30
                },
                {
                  desc: 'Spotify',
                  amount: 10
                },
                {
                  desc: 'Petrol',
                  amount: 80
                },
              ]
            },
            {
              id: 1,
              name: 'Jane',
              salary: 20000,
              type: 'annually',
              outcomes: [
                {
                  desc: 'Phone',
                  amount: 35
                },
                {
                  desc: 'Gym',
                  amount: 35
                },
                {
                  desc: 'Spotify',
                  amount: 10
                },
                {
                  desc: 'Petrol',
                  amount: 90
                },
                {
                  desc: 'Flex Account',
                  amount: 10
                },
              ]
            }
          ]
        }

        bus.$emit('generalData', data['general'])
        bus.$emit('personData', data['person'])


        console.log(this.personData)

      },
    },
    created(){
      bus.$on('addGeneralData', (data) => {
        // this.budgetData['general'].
        this.budgetData['general'].push(data[0]);
        console.log(this.budgetData)
      });
      bus.$on('addPersonData', (data) => {

        if(this.budgetData.person.length > 0){
          this.budgetData.person.forEach((person, i) => {
            if(person.id === data.id){
              this.budgetData.person[i] = data[0];
            }
          })
        }else{
          this.budgetData['person'].push(data[0]);
        }

      });
    }
  }
</script>

<style lang="scss">
  #app-wrapper{
    display: flex;
    flex-direction: column;
  }
 #app-content{
   margin: 0 auto;
   width: auto;
   border: 1px solid #222;
   .table{
     display: flex;
     flex-direction: row;
     .left-column{
       width: 300px;
       border-right: 1px solid #222;
     }
     .right-column{
       width: 430px;
     }
   }
 }
 #app-footer{
   margin: 0 auto;
   width: auto;
   border: 1px solid #222;
   margin-top: 10px;
 }
</style>
