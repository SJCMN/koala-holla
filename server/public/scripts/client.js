console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  //click listener for add button
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {

  $('#viewKoalas').on('click', '.transferBtn', readyForTransfer)
  $('#viewKoalas').on('click', '.deleteBtn', handleDelete)

  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };

    // call saveKoala with the new object
    saveKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({ method: `GET`, url: `/koalas` })
    .then(function (koalas) {
      // we have retrieved the koalas from the database
      renderToDOM(koalas);
    })
    .catch(function (error) {
      console.log(
        `There was an error retrieving the koalas from the server:`,
        error);
    });
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({ method: `POST`, url: `/koalas`, data: newKoala })
    .then(function (response) {
      console.log(`The koala was successfully added to the database.`);
      getKoalas(); // this will also call renderToDOM();
    })
    .catch(function (error) {
      console.log(`There was an error adding new koalas to the server:`, error);
    });
}

function renderToDOM(koalas) {
  $(`#viewKoalas`).empty();

  for (let koala of koalas) {
    if (koala.ready_to_transfer === true) {
      $(`#viewKoalas`).append(`
    <tr data-id="${koala.id}">
      <th>${koala.name}</th>
      <th>${koala.age}</th>
      <th>${koala.gender}</th>
      <th>${koala.ready_to_transfer}</th>
      <th>${koala.notes}</th>
      <th><button class="transferBtn">Transferred</button></th>
      <th><button class="deleteBtn">Delete</button></th>
    </tr>
    `)
    } if (koala.ready_to_transfer === false){
      $(`#viewKoalas`).append(`
      <tr data-id="${koala.id}">
        <th>${koala.name}</th>
        <th>${koala.age}</th>
        <th>${koala.gender}</th>
        <th>${koala.ready_to_transfer}</th>
        <th>${koala.notes}</th>
        <th><button class="transferBtn">Ready for Transfer</button></th>
        <th><button class="deleteBtn">Delete</button></th>
      </tr>
      `)
    } //end if conditional
  } //end loop
} //end renderToDOM

function handleDelete() {
  console.log('In delete button');
  let idToDelete = $(this).closest('tr').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`,
  })
    .then(function (response) {
      console.log('Response from delete ', response);
      getKoalas();
    })
    .catch(function (error) {
      console.log('Delete failed ', error);
    });
}


function readyForTransfer() {
  console.log('In ready for Transfer');
  let idToTransfer = $(this).closest('tr').data('id');
  let text = $(this).text();
  let readyForTransfer;
  if (text === 'Ready for Transfer') {
    readyForTransfer = true;
  } else if (text === 'Transferred') {
    readyForTransfer = false;
  }
console.log(readyForTransfer);
console.log(text);


  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToTransfer}`,
    data: {
      readyForTransfer: readyForTransfer,
    },
  })
    .then(function (response) {
      console.log('Response from id to Transfer', response);
      getKoalas();
    })
    .catch(function (error) {
      console.log('Ready to transfer failed', error);
    });
}


// comment for commit test