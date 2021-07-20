<?php

$site_name = "Сообщение с сайта ".$_SERVER['HTTP_REFERER'];
$admin_email = "webmaster@goldecainc.ru";
$form_title = trim($_POST["form-title"]);
$user_file = "";
$fieldNameToDesk = array(
    "user-name" => "Имя",
    "user-tel" => "Номер телефона",
    "user-email" => "Email",
    "user-service" => "Услуга",
    "user-message" => "Вопрос/Комментарий",
);


// Если поле выбора вложения не пустое - закачиваем его на сервер
if (!empty($_FILES['user-file']['tmp_name'])) {
    $path = $_FILES['user-file']['name']; // путь загрузки файла
    if (copy($_FILES['user-file']['tmp_name'], $path)) {
       $user_file = $path;
    }
}

$c = true; // Script Foreach
foreach ( $_POST as $key => $value ) {
    if ( is_array($value) ) {
      $value = implode(", ", $value);
    }
    if (
        $value != "" &&
        $key != "site-name" &&
        $key != "admin-email" &&
        $key != "form-title" &&
        $key != "user-file" &&
        $key != "user-privacy"
    ) {
      $message .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$fieldNameToDesk[$key]</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
      ";
    }
}

$message = "<table style='width: 100%;'>
    <tr>
        <td style='padding:10px; border:#e9e9e9 1px solid; text-align:center' colspan='2'>
            <b>$site_name</b><br>
            <big>$form_title</big>
        </td>
    </tr>
    $message
</table>";

// Отправляем сообщение
if ( empty($user_file) ) {
    $headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: '.$site_name.' <'.$admin_email.'>' . PHP_EOL .
    'Reply-To: '.$admin_email.'' . PHP_EOL;

    mail($admin_email, $form_title, $message, $headers);
} else {
    send_mail($admin_email, $form_title, $message, $user_file);
}

// Функция для отправки сообщения с вложением
function send_mail($to, $form_title, $html, $path) {
    $fp = fopen($path, "r");

    if (!$fp) {
        echo "Файл $path не может быть прочитан";
        exit();
    }

    $file = fread($fp, filesize($path));
    fclose($fp);

    $boundary = "--".md5(uniqid(time())); // генерируем разделитель

    $headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: multipart/mixed; boundary=\"$boundary\"\n" . PHP_EOL .
    'From: '.$site_name.' <'.$admin_email.'>' . PHP_EOL .
    'Reply-To: '.$admin_email.'' . PHP_EOL;


    $multipart = "--$boundary\n";

    $multipart .= "Content-Type: text/html; charset='utf-8'\n";
    $multipart .= "Content-Transfer-Encoding: Quot-Printed\n\n";
    $multipart .= "$html\n\n";

    $message_part = "--$boundary\n";
    $message_part .= "Content-Type: application/octet-stream\n";
    $message_part .= "Content-Transfer-Encoding: base64\n";
    $message_part .= "Content-Disposition: attachment; filename = \"".$path."\"\n\n";
    $message_part .= chunk_split(base64_encode($file))."\n";

    $multipart .= $message_part."--$boundary--\n";

    if (!mail($to, $form_title, $multipart, $headers)) {
        echo "К сожалению, письмо не отправлено";
        exit();
    }

}
