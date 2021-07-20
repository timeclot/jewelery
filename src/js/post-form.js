import showMessage from './show-message.js';

export default function postForm() {

  let $postForms = $('form[method="post"]');

  function requestSuccess(formNode) {
    let $form = $(formNode);
    let successText = 'Запрос успешно отправлен, менеджер свяжется с вами в ближайшее время';
    if ($form.attr('data-success-text')) {
      successText = $form.attr('data-success-text');
    };
    showMessage(successText);
    formNode.reset();
    $form.find('[name="user-file"]').trigger('change');
  }

  function requestError(formNode) {
    showMessage(`Ошибка! Попробуйте повторить запрос позже`);
  }

  $postForms.on('submit', (evt) => {
    evt.preventDefault();

    let formNode = evt.currentTarget;
    let fileInput = evt.currentTarget.querySelector('[name="user-file"]');
    let formData = new FormData(formNode);

    if (fileInput) {
      formData.set('user-file', fileInput.files[0]);
    }

    fetch('/php/mailto.php', { method: 'POST', body: formData })
      .then(
        (response) => requestSuccess(formNode)
      )
      .catch(
        (error) => requestError(formNode)
      );
  })
}

