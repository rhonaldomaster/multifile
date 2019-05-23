# Multi images ajax uploader
You can upload multiple images in a form and send it via ajax. You can preview the images and delete the images you don't want.

## Use

The form at [index.html](index.html) uses the events and functions defined in [main.js](main.js). There you can find all the behavior.

## JavaScript

The `template` function generates the preview html.

The `updateImageDisplay` function process the input change and updates the file list and the preview block.

The `removeImageFromForm` function handles the file deletion.

The `sendForm` function handles the form submit.

The rest of the functions are helpers for the ones described above.

## Style

I've included a basic style for the file input and for the layout in [main.css](main.css).