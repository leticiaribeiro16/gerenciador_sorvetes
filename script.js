document.getElementById('add-ice-cream-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var clientNameInput = document.getElementById('client-name-input');
    var sellerNameInput = document.getElementById('seller-name-input');
    var flavorInput = document.getElementById('flavor-input');
    var valueInput = document.getElementById('value-input');
  
    var newIceCream = {
      clientName: clientNameInput.value,
      sellerName: sellerNameInput.value,
      flavor: flavorInput.value,
      value: parseFloat(valueInput.value)
    };
  
    fetch('http://localhost:3000/ice-creams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIceCream)
    })
      .then(response => response.json())
      .then(data => {
        clientNameInput.value = '';
        sellerNameInput.value = '';
        flavorInput.value = '';
        valueInput.value = '';
        loadIceCreamList();
      });
  });
  
  function loadIceCreamList() {
    var iceCreamsBody = document.getElementById('ice-creams-body');
    iceCreamsBody.innerHTML = '';
  
    fetch('http://localhost:3000/ice-creams')
      .then(response => response.json())
      .then(data => {
        data.forEach(iceCream => {
          var row = document.createElement('tr');
          row.innerHTML = `<td>${iceCream.clientName}</td>
                           <td>${iceCream.sellerName}</td>
                           <td>${iceCream.flavor}</td>
                           <td>${iceCream.value.toFixed(2)}</td>`;
  
          var actionsCell = document.createElement('td');
  
          var updateButton = document.createElement('button');
          updateButton.textContent = 'Atualizar';
          updateButton.classList.add('btn-update');
          updateButton.addEventListener('click', function() {
            showUpdateForm(iceCream);
          });
  
          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Excluir';
          deleteButton.classList.add('btn-delete');
          deleteButton.addEventListener('click', function() {
            deleteIceCream(iceCream.id);
          });
  
          actionsCell.appendChild(updateButton);
          actionsCell.appendChild(deleteButton);
          row.appendChild(actionsCell);
          iceCreamsBody.appendChild(row);
        });
      });
  }
  
  function deleteIceCream(iceCreamId) {
    fetch(`http://localhost:3000/ice-creams/${iceCreamId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        loadIceCreamList();
      });
  }
  
  function showUpdateForm(iceCream) {
    var updateForm = document.createElement('form');
    updateForm.id = 'update-ice-cream-form';
  
    var clientNameInput = document.createElement('input');
    clientNameInput.type = 'text';
    clientNameInput.placeholder = 'Nome do Cliente';
    clientNameInput.value = iceCream.clientName;
    clientNameInput.required = true;
  
    var sellerNameInput = document.createElement('input');
    sellerNameInput.type = 'text';
    sellerNameInput.placeholder = 'Nome do Vendedor';
    sellerNameInput.value = iceCream.sellerName;
    sellerNameInput.required = true;
  
    var flavorInput = document.createElement('input');
    flavorInput.type = 'text';
    flavorInput.placeholder = 'Sabor do Sorvete';
    flavorInput.value = iceCream.flavor;
    flavorInput.required = true;
  
    var valueInput = document.createElement('input');
    valueInput.type = 'number';
    valueInput.placeholder = 'Valor do Sorvete';
    valueInput.value = iceCream.value.toFixed(2);
    valueInput.required = true;
  
    var updateButton = document.createElement('button');
    updateButton.type = 'submit';
    updateButton.textContent = 'Atualizar';
  
    updateForm.appendChild(clientNameInput);
    updateForm.appendChild(sellerNameInput);
    updateForm.appendChild(flavorInput);
    updateForm.appendChild(valueInput);
    updateForm.appendChild(updateButton);
  
    updateForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      var updatedIceCream = {
        clientName: clientNameInput.value,
        sellerName: sellerNameInput.value,
        flavor: flavorInput.value,
        value: parseFloat(valueInput.value)
      };
  
      fetch(`http://localhost:3000/ice-creams/${iceCream.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedIceCream)
      })
        .then(response => response.json())
        .then(data => {
          loadIceCreamList();
          updateForm.remove();
        });
    });
  
    var iceCreamsTable = document.getElementById('ice-creams-table');
    iceCreamsTable.parentNode.insertBefore(updateForm, iceCreamsTable.nextSibling);
  }
  
  loadIceCreamList();
  