document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input'); //value inside of text box

  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList'); //this was in the function below, but we moved it up so the const ul could be accessed outside of the function

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked) {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
     }
   }
   } else {
      for ( let i = 0; i <lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });

  function createLI(text) {
    function createElement(elementName, property, value) { //REFACTORING
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    const li = document.createElement('li');

    const span = createElement('span', 'textContent', text); //REFACTORING

    li.appendChild(span);

    const label = createElement('label', 'textContent', 'Confirmed'); //create label
    //label.textContent = 'Confirmed'; // label says confriemd

    const checkbox = createElement('input', 'type', 'checkbox'); //input element that is stored in const checkbox
    //checkbox.type = 'checkbox';
    //set inputs type to checkbox
    label.appendChild(checkbox);

    li.appendChild(label);

    const editButton = createElement('button', 'textContent', 'edit'); //code for edit button, but not it's behavior
    li.appendChild(editButton);

    const removeButton = createElement('button', 'textContent', 'remove'); //code for remove button, but not it's behavior
    //removeButton.textContent = 'remove';

    li.appendChild(removeButton);

    return li; //because without return js functions return undefined by default
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = ''; //this is to clear out the submit text box
    const li = createLI(text);
    ul.appendChild(li);
  });

  ul.addEventListener('change', (e) => {
    const checkbox = event.target; //reference to checkbox, true if checekd false if not
    const checked = checkbox.checked; //true or false stored in this variable
    //because we change the class of the li when the checkbox is checked we need a refernece to the li; the li is the checkboxes grandparent bc label is child of li; and check box is child of label; so we can traverse with parent node twice
    const listItem = checkbox.parentNode.parentNode; //next set to responded if checked is true and removed IF checked is false
    if (checked) /*is true*/ {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  ul.addEventListener('click', (e) => { //because click events can be for many elements, we add the IF statement; now that the EDIT button is present, need to edit code so that by clicking edit the name is not removed
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      if (button.textContent === 'remove') { //if clcik item is button AND text content is remove, THEN the name will be removed
        ul.removeChild(li);
      } else if (button.textContent === 'edit') {
        const span = li.firstElementChild;
        const input = document.createElement('input'); //input elemnt we want to replace the span with
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span); //can now use span to place the input eleement into the DOM
        li.removeChild(span);
        button.textContent = 'save';
      } else if (button.textContent === 'save') {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input); //can now use span to place the input eleement into the DOM
        li.removeChild(input);
        button.textContent = 'edit';
      }
    }
  });
});
