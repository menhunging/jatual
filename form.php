<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// Получаем данные из формы
	$name = htmlspecialchars($_POST['name']);
	$email = htmlspecialchars($_POST['email']);
	$phone = htmlspecialchars($_POST['phone']);
	$message = htmlspecialchars($_POST['message']);

	// Формируем сообщение
	$to = "ваш_email@example.com"; // Укажите ваш email
	$subject = "Новое сообщение с сайта";
	$body = "Имя: $name\nEmail: $email\nТелефон: $phone\nСообщение: $message";
	$headers = "From: $email";

	// Отправляем email
	if (mail($to, $subject, $body, $headers)) {
		echo "Сообщение успешно отправлено!";
	} else {
		echo "Произошла ошибка при отправке сообщения.";
	}
} else {
	echo "Неверный метод запроса.";
}
