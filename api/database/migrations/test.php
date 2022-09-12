<?php

$arra2 = [
    [
        "key" => "men",
        "value" => "Homme"
    ],
    [
        "key" => "women",
        "value" => "Femme"
    ],
    [
        "key" => "no_answer",
        "value" => "Préfère ne pas répondre"
    ]
];


$libelle = $choices[rand(0, count($choices) - 1)]['key']; // men ou women ou no_answer


$encoded_arr = json_encode($arra2);
$decoded_arr = json_decode($encoded_arr);

?>


<!-- BIEN -->
<select name="" id="">
    <option value="{{el.key}}">{{ el.value }}</option>
</select>



<!-- PAS BIEN -->
<select name="" id="">
    <option value="{{el}}">{{ el }}</option>
</select>