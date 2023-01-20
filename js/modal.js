document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .cancel') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

const addForm_fileInput = document.querySelector('#add_item_form #file-js-example input[type=file]');
addForm_fileInput.onchange = (me) => {
  if (addForm_fileInput.files.length > 0) {
    const fileName = document.querySelector('#add_item_form #file-js-example .file-name');
    fileName.textContent = addForm_fileInput.files[0].name;

    var reader = new FileReader();
    reader.onload = function (e) {
      $('#add-img-viewer').attr('src', e.target.result);
    };
    reader.readAsDataURL(addForm_fileInput.files[0]);
  }
}

const updForm_fileInput = document.querySelector('#upd_item_form #file-js-example input[type=file]');
updForm_fileInput.onchange = (me) => {
  if (updForm_fileInput.files.length > 0) {
    const fileName = document.querySelector('#upd_item_form #file-js-example .file-name');
    fileName.textContent = updForm_fileInput.files[0].name;

    var reader = new FileReader();
    reader.onload = function (e) {
      $('#upd-img-viewer').attr('src', e.target.result);
    };
    reader.readAsDataURL(updForm_fileInput.files[0]);
  }
}
