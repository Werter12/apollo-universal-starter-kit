/*global navigator*/
/*eslint no-undef: "error"*/
if ('serviceWorker' in navigator) {
  console.log('browser supports Service Workers');
  navigator.serviceWorker
    .register('basicServiceWorker.js')
    .then(registration => {
      console.log('registered Service Worker', registration);
    })
    .catch(error => {
      console.log('Something went wrong', error);
    });
}
