
// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '188495668380652',
//     cookie     : true,  // enable cookies to allow the server to access
//                         // the session
//     xfbml      : true,  // parse social plugins on this page
//     version    : 'v2.8' // use graph api version 2.8
//   });
// };
//
// function FBLogin () {
//   FB.login(function(response) {
//     FB.getLoginStatus(function(resStatus){
//       // console.log('RESPONE------- ',resStatus,'=====',response)
//       if (resStatus.status === 'connected') {
//         localStorage.setItem('fbaccesstoken', resStatus.authResponse.accessToken)
//         // localStorage.setItem('fbaccesstoken', resStatus.authResponse.accessToken)
//         // $("#loginButtonDiv").hide();
//         $("#logoutButtonDiv").show();
//         getLogin(resStatus.authResponse.accessToken)
//       } else {
//         window.location = "http://localhost:8080/login.html";
//         console.log('User cancelled login or did not fully authorize.');
//       }
//     })
//
//   }, {scope: 'public_profile,email,user_photos,publish_actions,user_posts'});
// }
// // FB logout
// function outFb() {
//   FB.getLoginStatus(function(response) {
//     if (response.status === 'connected') {
//         FB.logout(function(response) {
//             // this part just clears the $_SESSION var
//             // replace with your own code
//             // $("#loginButtonDiv").show();
//             // $("#logoutButtonDiv").hide();
//             window.location = "http://localhost:8080/login.html";
//             // $.post("/logout").done(function() {
//             //     $('#status').html('<p>Logged out.</p>');
//             // });
//         });
//     }
//   });
// }
//
// // Load the SDK asynchronously
// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
//
// function getLogin(tokenfb){
//   console.log('tuturu')
//
//   axios.get('http://localhost:3000/login', {
//     headers: {
//       accesstoken: tokenfb
//     }
//   })
//   .then(response => {
//     // console.log('APA yang di bawa',response.data.tokenJwt)
//     localStorage.setItem('tokenJwt', response.data.tokenJwt)
//     window.location = "http://localhost:8080/";
//
//   })
//   .catch(err => console.log(err))
// }

function createEvent(dataEvent){

  axios.post('http://localhost:3000/events', {
    event : dataEvent,
    headers :{
      jwttoken: localStorage.getItem('tokenJwt')
    }
  })
  .then(function (response) {
    console.log('ini RESPON',response);
    window.location = "http://localhost:8080/event.html";
    res.send(response)
  })
  .catch(function (error) {
    console.log(error);
  });
}

function joinEvent(id){
  let member = '5a0e8332829c8517c06132a6'
  axios.put(`http://localhost:3000/events/${id}/join`, {
    eventMember : member
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function signin() {
  console.log('MASUk');
  // e.preventDefault()
  axios.post('http://localhost:3000/login',{
    username: $('input[name=username]').val(),
    password: $('input[name=password]').val()
  })
  .then(function (response) {
    // console.log('SETELAH LOGIN',response.data.token);
    localStorage.setItem('tokenjwt', response.data.token)
    localStorage.setItem('user_id', response.data.user_id)
    localStorage.setItem('username', response.data.name)
    window.location = "http://localhost:8080/";
  })
  .catch(function (error) {
    console.log('MASUK ERROR');
    console.log(error);
  });
  return false
}

function signup() {

}

function create() {
  axios.post('http://localhost:3000/', {
    title: $('input[name="task"]').val(),
    user_id: localStorage.getItem('user_id')
  })
  .then( response => {
    console.log(response);
    location.reload()
  })
  .catch(err => {
    console.log(err);
  })
}

function outApps() {
  localStorage.clear();
  window.location = "http://localhost:8080/login.html";
}
