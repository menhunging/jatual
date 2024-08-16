<?php

$to = "sashader95@gmail.com";

$name = clear_data($_POST['name']);
$email = clear_data($_POST['email']);
$tel = clear_data($_POST["phone"]);
$text = clear_data($_POST['message']);

$subject = "Сообщение с сайта";

$headers = [
	"From" => "webmaster@site.ru",
	"Reply-To" => "webmaster@site.ru",
	"X-Mailer" => "PHP/" . phpversion(),
	"Content-type" => "text/html; charset=utf-8"
];

// Преобразуем массив заголовков в строку
$headers_string = implode("\r\n", $headers);

$message = '
<html>
<body>
      <table border="1" cellpadding="6" cellspacing="0" width="90%" bordercolor="#dbdbdb">
        <tr>
          <td colspan="2" align="center" bgcolor="#e4e4e4">
            <strong>Информация о клиенте</strong>
          </td>
        </tr>
';

$message .= '
<tr>
	<td><strong>Имя</strong></td>
	<td>' . $name . '</td>
</tr>
<tr>
	<td><strong>Email</strong></td>
	<td>' . $email . '</td>
</tr>
<tr>
	<td><strong>Телефон</strong></td>
	<td>' . $tel . '</td>
</tr>
<tr>
	<td><strong>Сообщение</strong></td>
	<td>' . $text . '</td>
</tr>
';

$message .= '
</body>
</html>';

function clear_data($val)
{
	$val = trim($val);
	$val = stripslashes($val);
	$val = htmlspecialchars($val);
	return $val;
}

mail($to, $subject, $message, $headers_string);
