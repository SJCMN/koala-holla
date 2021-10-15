CREATE TABLE "koalas" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(50) NOT NULL,
"gender" VARCHAR(1) NOT NULL,
"age" INTEGER,
"ready_to_transfer" BOOLEAN DEFAULT FALSE,
"notes" VARCHAR(250)
);

INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
VAlUES
('Scotty', 'M',	4,	True, 'Born in Guatemala'),
('Jean', 'F', 5, False,	'Allergic to lots of lava'),
('Ororo', 'F', 7, False, 'Loves listening to Paula (Abdul)'),
('Logan', 'M', 15, False, 'Loves the sauna'),
('Charlie',	'M', 9,	True, 'Favorite band is Nirvana'),
('Betsy', 'F', 4, True, 'Has a pet iguana');