<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $questions = [
            [
                'title' => '1/20',
                'content' => 'Votre adresse mail',
                'type' => 'B',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '2/20',
                'content' => 'Votre âge',
                'type' => 'B',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '3/20',
                'content' => 'Votre sexe',
                'type' => 'A',
                'options' => json_encode([
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
                ]),
                'created_at' => now()
            ],
            [
                'title' => '4/20',
                'content' => 'Nombre de personne dans votre foyer (adulte & enfants)',
                'type' => 'C',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '5/20',
                'content' => 'Votre profession',
                'type' => 'B',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '6/20',
                'content' => 'Quel marque de casque VR utilisez vous ?',
                'type' => 'A',
                'options' => json_encode([
                    [
                        "key" => "occulus_rift/s",
                        "value" => "Occulus Rift/s"
                    ],
                    [
                        "key" => "htc_vive",
                        "value" => "HTC Vive"
                    ],
                    [
                        "key" => "windows_mixed_reality",
                        "value" => "Windows Mixed Reality"
                    ],
                    [
                        "key" => "psvr",
                        "value" => "PSVR"
                    ]
                ]),
                'created_at' => now()
            ],
            [
                'title' => '7/20',
                'content' => 'Sur quel magasin d’application achetez vous des contenus VR ?',
                'type' => 'A',
                'options' => json_encode([
                    [
                        "key" => "steam_vr",
                        "value" => "SteamVR"
                    ],
                    [
                        "key" => "occulus_store",
                        "value" => "Occulus store"
                    ],
                    [
                        "key" => "viveport",
                        "value" => "Viveport"
                    ],
                    [
                        "key" => "playstation_vr",
                        "value" => "Playstation VR"
                    ],
                    [
                        "key" => "google_play",
                        "value" => "Google Play"
                    ],
                    [
                        "key" => "windows_store",
                        "value" => "Windows store"
                    ],
                ]),
                'created_at' => now()
            ],
            [
                'title' => '8/20',
                'content' => 'Quel casque envisagez vous d’acheter dans un futur proche ?',
                'type' => 'A',
                'options' => json_encode([
                    [
                        "key" => "occulus_quest",
                        "value" => "Occulus Quest"
                    ],
                    [
                        "key" => "occulus_go",
                        "value" => "Occulus Go"
                    ],
                    [
                        "key" => "htc_vive_pro",
                        "value" => "HTC Vive Pro"
                    ],
                    [
                        "key" => "others",
                        "value" => "Autre"
                    ],
                    [
                        "key" => "none",
                        "value" => "Aucun"
                    ]
                ]),
                'created_at' => now()
            ],
            [
                'title' => '9/20',
                'content' => 'Au sein de votre foyer, combien de personne utilisent votre casque VR pour regarder Bigscreen ?',
                'type' => 'C',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '10/20',
                'content' => 'Vous utilisez principalement Bigscreen pour :',
                'type' => 'A',
                'options' => json_encode([
                    [
                        "key" => "tv_watch",
                        "value" => "regarder des émissions TV en direct"
                    ],
                    [
                        "key" => "movie_watch",
                        "value" => "regarder des films"
                    ],
                    [
                        "key" => "solo_play",
                        "value" => "jouer en solo"
                    ],
                    [
                        "key" => "team_play",
                        "value" => "jouer en team"
                    ]
                ]),
                'created_at' => now()
            ],
            [
                'title' => '11/20',
                'content' => 'Combien donnez vous de point pour la qualité de l’image sur Bigscreen ?',
                'type' => 'C',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '12/20',
                'content' => 'Combien donnez vous de point pour le confort d’utilisation de l’interface Bigscreen ?',
                'type' => 'C',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '13/20',
                'content' => 'Combien donnez vous de point pour la connection réseau de Bigscreen ?',
                'type' => 'C',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '14/20',
                'content' => 'Combien donnez vous de point pour la qualité des graphismes 3D dans Bigscreen ?',
                'type' => 'C',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '15/20',
                'content' => 'Combien donnez vous de point pour la qualité audio dans Bigscreen ?',
                'type' => 'C',
                'options' => null,
                'created_at' => now()
            ],
            [
                'title' => '16/20',
                'content' => 'Aimeriez vous avoir des notifications plus précises au cours de vos sessions Bigscreen ?',
                'type' => 'A',
                'options' => json_encode([
                    [
                        "key" => "yes",
                        "value" => "Oui"
                    ],
                    [
                        "key" => "no",
                        "value" => "Non"
                    ]
                ]),
                'created_at' => now()
            ],
            [
                'title' => '17/20',
                'content' => 'Aimeriez vous pouvoir inviter un ami à rejoindre votre session via son smartphone ?',
                'type' => 'A',
                'options' => json_encode([
                    [
                        "key" => "yes",
                        "value" => "Oui"
                    ],
                    [
                        "key" => "no",
                        "value" => "Non"
                    ]
                ]),
                'created_at' => now()
            ],
            [
                'title' => '18/20',
                'content' => 'Aimeriez vous pouvoir enregistrer des émissions TV pour pouvoir les regarder ultérieurement ?',
                'type' => 'A',
                'options' => json_encode([
                    [
                        "key" => "yes",
                        "value" => "Oui"
                    ],
                    [
                        "key" => "no",
                        "value" => "Non"
                    ]
                ]),
                'created_at' => now()
            ],
            [
                'title' => '19/20',
                'content' => 'Aimeriez vous jouer à des jeux exclusifs sur votre Bigscreen ?',
                'type' => 'A',
                'options' => json_encode([
                    [
                        "key" => "yes",
                        "value" => "Oui"
                    ],
                    [
                        "key" => "no",
                        "value" => "Non"
                    ]
                ]),
                'created_at' => now()
            ],
            [
                'title' => '20/20',
                'content' => 'Quelle nouvelle fonctionnalité de vos rêve devrait exister sur Bigscreen ?',
                'type' => 'B',
                'options' => null,
                'created_at' => now()
            ]
        ];

        foreach ($questions as $question) {
            Question::create($question);
        }
    }
}
