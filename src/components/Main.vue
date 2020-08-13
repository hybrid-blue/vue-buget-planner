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
    <!--
    <footer id="app-footer">
      <app-footer v-bind:gAmount="gAmount" v-bind:pAmount="pAmount"></app-footer>
    </footer>
    -->
  </div>
</template>

<script>
  import general from './AddGeneral.vue';
  import person from './AddPerson.vue';
  // import footer from './Footer.vue';
  import header from './Header.vue';

  import { bus } from '../main.js';

  export default{
    components:{
      'person': person,
      'general': general,
      // 'app-footer': footer,
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
        var header = document.querySelector('header');
        header.style.width = `${contentWidth}px`;
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
      },
      // setHeaderWidth(){
      //
      // }
    },
    mounted(){
      this.newPerson();
    },
    created(){
      bus.$on('addGeneralData', (data) => {
        console.log(data)
        this.budgetData['general'] = data;
      });
      bus.$on('addPersonData', (data) => {

        console.log(data)
        var found, pos;

        if(this.budgetData['person'].length > 0){

          for(let i=0;i<this.budgetData['person'].length;i++){

            // console.log(this.budgetData['person'][i].id)
            // console.log(data.id)

            if(this.budgetData['person'][i].id === data.id){
              found = true;
              pos = i;
              break;
            }else{
              found = false;
            }

          }

          if(found){
            this.budgetData['person'][pos] = data;
          }else{
            this.budgetData['person'].push(data);
          }

        }else{
          this.budgetData['person'].push(data);
        }

        // console.log('+++++++++++++++')
        // this.setHeaderWidth();

      });
    }
  }
</script>

<style lang="scss">
  header{
    display: block;
    margin: 0 auto;
    padding: 0 0 10px;
    border-bottom: 2px solid #222;
    .header{
      margin: 0 10px;
    }
    .form-button{
      &__xs-width{
        width: 130px;
      }
      margin-right: 15px;
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
  #app-wrapper{
    display: flex;
    flex-direction: column;
    .column-title{
      display: block;
      width: 100%;
      font-weight: 600;
      padding: 10px;
      background: #42b883;
      box-sizing: border-box;
      color: #fff;
    }
  }
 #app-content{
   margin: 0 auto;
   width: auto;
   .table{
     display: flex;
     flex-direction: row;
     .left-column{
       width: 300px;
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
