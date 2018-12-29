### skill

```
create table skill_newname as select * from skill_tb;
delete from skill_newname;
create table skillp_newname as select * from skillp_tb;
delete from skillp_newname;
```

### kasegi

```
create table kasegi(version varchar(50) NOT NULL, type varchar(50) NOT NULL,scope integer NOT NULL, list_hot text, list_other text);
```
