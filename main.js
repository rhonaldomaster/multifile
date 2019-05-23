let currentImages = [];

const template = (data) => {
  return '<div class="flexygrid__item one-sixth">' +
    '<div class="add-image add-image--with-value" style="' + data.style + '">' +
      '<a href="#" class="js-delete-image delete-image" data-name="' + data.name + '">&times;</a>' +
    '</div>' +
  '</div>';
};

const validFileType = (file) => {
  const fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ];
  return fileTypes.some(type => file.type == type, { file: file });
};

const updateImageDisplay = (event) => {
  const formFiles = (event.target).files;
  if (formFiles.length === 0) {
    return;
  }
  let html = '';
  Array.prototype.forEach.call(formFiles, (file) => {
    currentImages.push(file);
    html += getFileHTML(file);
  });
  let preview = document.querySelector('.js-image-preview');
  html = html.trim() + (preview.innerHTML).trim();
  html = html.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s{2}/g, '');
  preview.innerHTML = html;
};

const getFileHTML = (file) => {
  if (!validFileType(file)) {
    return '';
  }
  const name = file.name.replace(/\s/g, '-');
  return template({
    name: name,
    style: 'background-image: url(' + (window.URL.createObjectURL(file)) + ')'
  });
};

const removeImageFromForm = (event) => {
  let link = event.target;
  let name = link.dataset.name;
  event.preventDefault();
  currentImages = currentImages.filter((file) => {
    return file.name.replace(/\s/g, '-').toLocaleLowerCase() != name.toLocaleLowerCase();
  });
  let parent = link.parentNode;
  parent.parentNode.removeChild(parent);
  return false;
};

const sendForm = (ev) => {
  let form = ev.target;
  ev.preventDefault();
  const formData = getFormData(form);
  // send data to the server, example with jquery
  let ajax = $.ajax({
    url: 'https://myserver.com',
    type: 'POST',
    data: formData,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false
  });
};

const getFormData = function (form) {
  let formData = new FormData();
  const elements = Array.prototype.slice.call(form.elements)
    .filter(element => element.name != 'files[]' && element.name != '');
  for (let i = 0; i < elements.length; i++) {
    formData.append(elements[i].name, elements[i].value);
  }
  if (!currentImages) {
    return formData;
  }
  for (let i = 0; i < currentImages.length; i++) {
    formData.append('files[]', currentImages[i]);
  }
  return formData;
};

document.addEventListener('click', (event) => {
  if (event.target.className.indexOf('js-delete-image') > -1) {
    removeImageFromForm(event);
  }
});
document.addEventListener('change', (event) => {
  if (event.target.className.indexOf('js-image-input') > -1) {
    updateImageDisplay(event);
  }
});
document.addEventListener('submit', (event) => {
  if (event.target.className.indexOf('js-form') > -1) {
    sendForm(event);
  }
});
