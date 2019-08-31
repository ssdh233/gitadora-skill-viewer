### sharedSongs table bugfix
```sql
alter table shared_songs drop constraint shared_songs_pkey;
alter table shared_songs add constraint shared_songs_pkey PRIMARY KEY ("songName", "type");
```

### add errorReports table

```sql
CREATE TABLE errorReports(
    "version" varchar(50),
    "error" text,
    "date" varchar(20),
    "userAgent" text
);
```


### add sharedSongs column
```sql
ALTER TABLE skill
ADD COLUMN "sharedSongs" json

CREATE TABLE shared_songs(
  "songName" text,
  "version" varchar(50),
  "type" varchar(1),
  "count" integer,
  PRIMARY KEY ("songName")
);
```

### migration

#### skill
```sql
CREATE TABLE skill(
  "playerId" serial,
  "version" varchar(50),
  "cardNumber" varchar(16),
  "gitadoraId" varchar(20),
  "playerName" varchar(20),
  "guitarSkillPoint" varchar(10),
  "drumSkillPoint" varchar(10),
  "guitarSkill" json,
  "drumSkill" json,
  "updateDate" varchar(20),
  "updateCount" integer,
  PRIMARY KEY ("playerId", "version")
);

INSERT INTO skill ("playerId", "version", "cardNumber", "playerName", "guitarSkillPoint", "drumSkillPoint", "guitarSkill", "drumSkill", "updateDate", "updateCount") (
    SELECT
        id,
        'tb' AS version,
        card_number,
        player_name,
        ((guitar_skill::json -> 'hot' ->> 'point')::float + (guitar_skill::json -> 'other' ->> 'point')::float)::text,
        ((drum_skill::json -> 'hot' ->> 'point')::float + (drum_skill::json -> 'other' ->> 'point')::float)::text,
        guitar_skill::json,
        drum_skill::json,
        update_date,
        update_count
    FROM
        skill_tb
    UNION ALL
    SELECT
        id,
        'tbre' AS version,
        card_number,
        player_name,
        ((guitar_skill::json -> 'hot' ->> 'point')::float + (guitar_skill::json -> 'other' ->> 'point')::float)::text,
        ((drum_skill::json -> 'hot' ->> 'point')::float + (drum_skill::json -> 'other' ->> 'point')::float)::text,
        guitar_skill::json,
        drum_skill::json,
        update_date,
        update_count
    FROM
        skill_tbre
    UNION ALL
    SELECT
        id,
        'matixx' AS version,
        card_number,
        player_name,
        ((guitar_skill::json -> 'hot' ->> 'point')::float + (guitar_skill::json -> 'other' ->> 'point')::float)::text,
        ((drum_skill::json -> 'hot' ->> 'point')::float + (drum_skill::json -> 'other' ->> 'point')::float)::text,
        guitar_skill::json,
        drum_skill::json,
        update_date,
        update_count
    FROM
        skill_matixx
    UNION ALL
    SELECT
        id,
        'exchain' AS version,
        card_number,
        player_name,
        ((guitar_skill::json -> 'hot' ->> 'point')::float + (guitar_skill::json -> 'other' ->> 'point')::float)::text,
        ((drum_skill::json -> 'hot' ->> 'point')::float + (drum_skill::json -> 'other' ->> 'point')::float)::text,
        guitar_skill::json,
        drum_skill::json,
        update_date,
        update_count
    FROM
        skill_exchain);
```

#### skillp
```sql
CREATE TABLE skillp(
  "skillId" serial,
  "version" varchar(50),
  "playerId" serial,
  "playerName" varchar(20),
  "type" varchar(1),
  "skillPoint" varchar(10),
  "skill" json,
  "updateDate" varchar(20),
  PRIMARY KEY ("skillId", "version")
);

SELECT id, count(*)
FROM skillp_exchain
GROUP BY id
HAVING count(*) > 1;

DELETE FROM skillp_exchain
WHERE ctid IN (SELECT ctid FROM skillp_exchain WHERE id=1038 LIMIT 1);

INSERT INTO skillp
SELECT
    id,
    'tb' AS version,
    skill_id,
    player_name,
    CASE TYPE
    WHEN 'drum' THEN
        'd'
    WHEN 'guitar' THEN
        'g'
    END,
    skill,
    skill_data::json,
    update_date
FROM
    skillp_tb
UNION ALL
SELECT
    id,
    'tbre' AS version,
    skill_id,
    player_name,
    CASE TYPE
    WHEN 'drum' THEN
        'd'
    WHEN 'guitar' THEN
        'g'
    END,
    skill,
    skill_data::json,
    update_date
FROM
    skillp_tbre
UNION ALL
SELECT
    id,
    'matixx' AS version,
    skill_id,
    player_name,
    CASE TYPE
    WHEN 'drum' THEN
        'd'
    WHEN 'guitar' THEN
        'g'
    END,
    skill,
    skill_data::json,
    update_date
FROM
    skillp_matixx
UNION ALL
SELECT
    id,
    'exchain' AS version,
    skill_id,
    player_name,
    CASE TYPE
    WHEN 'drum' THEN
        'd'
    WHEN 'guitar' THEN
        'g'
    END,
    skill,
    skill_data::json,
    update_date
FROM
    skillp_exchain;
```

### kasegi

```sql
create table kasegi(version varchar(50) NOT NULL, type varchar(50) NOT NULL,scope integer NOT NULL, list_hot text, list_other text);
```
