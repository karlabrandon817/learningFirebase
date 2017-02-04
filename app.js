  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAMRcP4FHRBaBTA2anD2pb33vnx464TU1k",
      authDomain: "devfest2017-3f34d.firebaseapp.com",
      databaseURL: "https://devfest2017-3f34d.firebaseio.com",
      storageBucket: "devfest2017-3f34d.appspot.com",
      messagingSenderId: "69922526170"
  };
  firebase.initializeApp(config);

  var header = document.getElementById('header');

  var dbRef = firebase.database().ref().child('header');

  var signInButton = document.getElementById('signInButton');
  var signOutButton = document.getElementById('signOutButton');
  var provider = new firebase.auth.GoogleAuthProvider();

  signInButton.addEventListener('click', function(){
    firebase.auth().signInWithPopup(provider).then(function(user){
      if(user){
        dbRef.on('value', function(snap) {
            header.innerText = snap.val();
        });
        playgroundRef.on('value', function(snap){
        playground.value = snap.val();
      });
      }
    });
  });//end signInButton

  signOutButton.addEventListener('click', function(){
    firebase.auth().signOut().then(function(){
      header.innerText = 'Sign in with Google to see the magic!';
      playground.value = 'You need to sign in to play here.';
    });
  });//end signOutButton

var playground = document.getElementById('playground');
var playgroundRef = firebase.database().ref().child('playground');

playground.addEventListener('keyup', function(){
  playgroundRef.set(playground.value);  
});
