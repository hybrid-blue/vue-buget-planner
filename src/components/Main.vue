<template>
  <div id="app-wrapper">
    <header id="app-header">
      <app-header v-on:loadBudget="loadBudget($event)" v-on:saveBudget="saveBudget($event)"></app-header>
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

        let loadInput = document.createElement('input');
        loadInput.setAttribute('type', 'file');
        loadInput.setAttribute('id', 'budget-loader');
        document.querySelector('#app-wrapper').appendChild(loadInput);
        loadInput.style.visable = 'hidden';
        loadInput.click();

        loadInput.addEventListener('change', () => {


          if(loadInput.files[0].type === "application/json"){

            const reader = new FileReader();

            reader.onload = (
              function(){
                return function(e){
                  var data = JSON.parse(window.atob(e.target.result.split(',')[1]));
                  this.budgetData = data;
                  console.log(data)
                  bus.$emit('generalData', data['general'])
                  bus.$emit('personData', data['person'])
                }
              }
            )()

            reader.readAsDataURL(loadInput.files[0])
          }


        });




        console.log(this.personData)

      },
      saveBudget(){
        function download(filename, text){
          var elm = document.createElement('a');
          elm.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
          elm.setAttribute('download', filename);
          elm.style.display = 'none';
          document.querySelector('#app').appendChild(elm);
          elm.click();
          document.querySelector('#app').removeChild(elm);
        }

        download(`budget.json`, JSON.stringify(this.budgetData));
      }
    },
    created(){
      bus.$on('addGeneralData', (data) => {
        this.budgetData['general'] = data;
      });
      bus.$on('addPersonData', (data) => {

        if(this.budgetData['person'].length > 0){

          for(let i=0;i<this.budgetData['person'].length;i++){

            console.log(this.budgetData['person'][i])
            if(this.budgetData['person'][i].id === data.id){
              this.budgetData['person'][i] = data;
              break;
            }else{
              this.budgetData['person'].push(data);
            }

          }

        }else{
          this.budgetData['person'].push(data);
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
 #budget-loader{
   display: none;
 }
 #app-footer{
   margin: 0 auto;
   width: auto;
   border: 1px solid #222;
   margin-top: 10px;
 }
</style>
