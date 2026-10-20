function grab (e, one = true, parent) {
  const container = parent !== undefined ? parent : document; 
  if (one) return container.querySelector(e);
  return container.querySelectorAll(e);
}

function manageContent () {
  const form = grab('form');
  const successMsgCard = grab('#success-message');

  [...grab('input', false), grab('textarea')].forEach(el => {
    
    function getErr (classList) {
      const err = getErrMsg(el, classList);
      if (err != null) return requiredErr(el, err);
    }

    el.addEventListener('invalid', e => {
      getErr(el.validity.valueMissing ? '.err' : '#invalid-email-format').add();
      e.preventDefault()
    });

    el.addEventListener('change', () => {
      getErr('.visible')?.remove();
    })
  })

  form.addEventListener('submit', e => {
    successMsg(successMsgCard);
    e.preventDefault();
    form.reset();
  })
}

manageContent();

function successMsg (card) {
  card.classList.add('success-message-visible');
  card.inert = false;
  setTimeout(() => {
    card.classList.remove('success-message-visible');
    card.inert = true;
  }, 6000);
}

function requiredErr (e, msg) {
  return {
    add: () => {
      e.classList.add('required-field');
      msg.classList.add('visible')
    },
    remove: () => {
      e.classList.remove('required-field');
      msg.classList.remove('visible')
    }
  }
}

function getErrMsg (el, err) {
  const parent = el.parentElement;
    let result = grab(err, true, parent);
    if (!result) return grab(err, true, parent.parentElement);
    return result;
}