<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$name = htmlspecialchars($_POST['name']);
	$email = htmlspecialchars($_POST['email']);
	$phone = htmlspecialchars($_POST['phone']);
	$message = htmlspecialchars($_POST['message']);

	$to = "menhunging@gmail.com";
	$subject = "Новое сообщение с сайта";
	$body = "Имя: $name\nEmail: $email\nТелефон: $phone\nСообщение: $message";
	$headers = "From: $email";

	if (mail($to, $subject, $body, $headers)) {
		echo "Сообщение успешно отправлено!";
	} else {
		echo "Ошибка при отправке сообщения.";
	}
}
