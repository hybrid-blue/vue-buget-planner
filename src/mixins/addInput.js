export default {
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

      inputName.setAttribute('name', `description-${this.customField}`);
      inputAmount.setAttribute('name', `amount-${this.customField}`);

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

    }
  }
}
