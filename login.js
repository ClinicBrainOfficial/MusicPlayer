const firebaseConfig = {
  apiKey: "AIzaSyDyU_0LzLTVevDnbo7eboUH3cTVJojchDo",
  authDomain: "modifywebsite-8bb97.firebaseapp.com",
  databaseURL: "https://modifywebsite-8bb97-default-rtdb.firebaseio.com",
  projectId: "modifywebsite-8bb97",
  storageBucket: "modifywebsite-8bb97.appspot.com",
  messagingSenderId: "857646078887",
  appId: "1:857646078887:web:6ee958e6788cae3951b482"
};
firebase.initializeApp(firebaseConfig);
function newauth(){
  username = document.getElementById('username').value ;
  password = document.getElementById('password').value;
  var checkauth;
  if(username != '' && password != ''){
    if(confirm("Are You Really Interested To Register ?") == true){
      var ref = firebase.database().ref('Modify/').child('Auth/'+username+'/');
      ref.once('value',function(get_vaue){
      var data = get_vaue.val();
      checkauth = data.Name;
      });
      setTimeout(function(){
      if(checkauth == undefined && checkauth != username){
      firebase.database().ref('Modify/').child('Auth/'+username+'/').update({
      Name : username,
      Passcode : password
      });
      alert('Hurray ! You are a member of the Modify Family');
      setTimeout(function(){
      window.location = 'MusicPlayer.html'
      },2000);
      }else{
        alert('This username is already register try another one');
      }
      },2000);
    };
  }else{

  }
}
function loginauth(){
  username = document.getElementById('usernamea').value ;
  password = document.getElementById('passworda').value;
  authname = '';
  authpassword = '';
  if(username != '' && password != ''){
 if(confirm('Are You Sure With The Confidencial ?') == true){
  var ref = firebase.database().ref('Modify/').child('Auth/'+username+'/');
  ref.once('value',function(get_vaue){
  var data = get_vaue.val();
  authname = data.Name;
  authpassword = data.Passcode;
  });
  setTimeout(function(){
  if(authname == username && authpassword == password){
  alert('Auth Succesfull Thank You.');
  window.location = 'MusicPlayer.html'
  localStorage.setItem('ModifyID',username);
  }else{
    alert('Username or Password Is Wrong !');
  }
  },2000);
 }
  }
}