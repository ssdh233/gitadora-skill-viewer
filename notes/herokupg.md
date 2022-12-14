### dump
```
heroku pg:backups:capture --app gitadora-skill-viewer
heroku pg:backups:download --app gitadora-skill-viewer
```

### restore
1. upload it to somewhere
For example, https://www.jsdelivr.com/?docs=gh
https://cdn.jsdelivr.net/gh/matsumatsu233/MyStorage/latest.dump

2. 
```
heroku pg:backups:restore '<SIGNED URL>' MY_DATABASE_URL --app gitadora-skill-viewer
```

### backup schedule

```
heroku pg:backups:schedule ONYX --at "04:00 Asia/Tokyo" --app gitadora-skill-viewer
```
