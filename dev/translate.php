<?php
// echo 1;
$handle = curl_init();
// echo 2;
if (FALSE === $handle)
   throw new Exception('failed to initialize');

// echo $_REQUEST['text'];
curl_setopt($handle, CURLOPT_URL,'https://www.googleapis.com/language/translate/v2');
curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($handle, CURLOPT_POSTFIELDS, array('key'=> 'AIzaSyDIU_7m6pLkALz56n4ist7FZ5zOzS0L6kc', 'q' => $_REQUEST{'text'}, 'source' => 'en', 'target' => 'zh-TW'));
curl_setopt($handle,CURLOPT_HTTPHEADER,array('X-HTTP-Method-Override: GET'));
$response = curl_exec($handle);
$arr = json_decode($response);
echo $arr->data->translations[0]->translatedText;
?>