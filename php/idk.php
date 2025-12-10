<?php
// index.php
$title = "Moja PHP stránka";
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>
      <?php echo $title; ?></title>
</head>
<body>
  <h1><?php echo $title; ?></h1>
  <p>Dnešný čas: <?php echo date('Y-m-d H:i:s'); ?></p>

  <h2>Formulár (POST)</h2>
  <form method="post" action="idk.php">  <!-- <-- OPRAVENÉ: action musí byť idk.php, nie index.php -->
    <input name="name" placeholder="Tvoje meno">
    <button type="submit">Odoslať</button>
  </form>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name'], ENT_QUOTES) : '';
    echo "<p>Ahoj, $name</p>";
}
?>
<p><a href="../home.html">back</a></p>
</body>
</html>
// i hawe no idea what this does :D