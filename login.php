<?php
session_start();
require_once "config.php";
if (isset($_SESSION['login_details'])) {
  $isBranchHead = $_SESSION['login_details']['isBranchHead'];
} else {
  echo "<script type='text/javascript'>
    localStorage.removeItem('asco_user');
  </script>";
  // header('Location: login.php');
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" type="text/css" href="css/login.css"></link>

  <script src='js/jquery.min.js'> </script>
  <script src='js/login.js'> </script>

  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <title>Login | <?php echo $title; ?></title>
</head> 
<body>

<div class="wrapper fadeIn">
  <img src="favicon.ico">
  <h1> ALLSHIRT COMMERCIAL OUTLET </h1>
  
  <div class="wrapper fadeInDown">
    <div id="formContent">
    
    <h2 class="active"> Sign In </h2>

    <form action="pos.php">
      <input type="text" class="fadeIn second" id="uname" name="uname" placeholder="Username" required>
      <input type="password" class="fadeIn third" id="pass" name="pass" placeholder="Password" required>
      <button type="submit" class="button fadeIn fourth" id="login">LOG IN</button>
      <br>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>
    </form> 
    </div>
  </div>
</div>

</body>
</html>