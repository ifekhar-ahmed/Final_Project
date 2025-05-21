
<?php
    session_start();
    session_unset();
    session_destroy();

    // Remove the 'status' cookie (try both with and without path)
    setcookie('status', '', time() - 3600, '/');
    setcookie('status', '', time() - 3600);

    // Prevent browser caching
    header("Cache-Control: no-cache, must-revalidate");
    header("Expires: Sat, 1 Jan 2000 00:00:00 GMT");

    // Redirect to login page
    header('Location: ../view/login.html');
    exit();
?>