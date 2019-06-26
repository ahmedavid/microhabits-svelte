<script>
  let registerCredentials = {
    email : "",
    password : "",
    confirmPassword : "",
  };
  let loginCredentials = {
    email : "",
    password : "",
  };
  function register(ev){
    if(registerCredentials.password === registerCredentials.confirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(registerCredentials.email, registerCredentials.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage)
      });   
      registerCredentials = {
        email : "",
        password : "",
        confirmPassword : "",
      };
    }
  }

  function login(ev) {
    firebase.auth().signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,errorMessage)
    });    
    loginCredentials = {
      email : "",
      password : "",
    };
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-12 col-sm-4 offset-sm-4">


<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">

      <form id="loginForm" on:submit|preventDefault={login}>
        <div class="form-group">
          <label for="email">Email</label>
          <input class="form-control" type="email" id="email" name="email" bind:value={loginCredentials.email}>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input class="form-control" type="password" id="password" name="password" bind:value={loginCredentials.password}>
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
      </form>     
  </div>
  <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">

      <form id="registerForm" on:submit|preventDefault={register}>
        <div class="form-group">
          <label for="registerEmail">Email</label>
          <input class="form-control" type="email" id="registerEmail" name="registerEmail" bind:value={registerCredentials.email}>
        </div>
        <div class="form-group">
          <label for="registerPassword">Password</label>
          <input class="form-control" type="password" id="registerPassword" name="registerPassword" bind:value={registerCredentials.password}>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input class="form-control" type="password" id="confirmPassword" name="confirmPassword" bind:value={registerCredentials.confirmPassword}>
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
      </form>    
  </div>
</div>
 
    </div>
  </div>
</div>
