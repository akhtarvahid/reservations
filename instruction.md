###



### Commands to create common module

```bash
nest generate library common
```

To create another common module within same common module

```bash
nest generate module database -p common
```


NOTES 

- `Joi` to validate the schema
- `ConfigModule` for env setup




#### b5-prod-deployment
- create 4 Artifact registry API(`auth`, `notifications`, `payments`, `reservation`) in [google cloud -> Artifact registry](https://console.cloud.google.com/artifacts?inv=1&invt=Ab3QpA&project=reservify-466016)
- Setup google [cloud SDK](https://cloud.google.com/sdk/docs/?_gl=1*1d4fvvl*_ga*MjA5NDA2ODkzLjE3NTI1OTUzMTY.*_ga_WH2QY8WWF5*czE3NTMwMTM0MzckbzMkZzEkdDE3NTMwMTU5MDkkajUwJGwwJGgw) to access(`push`/`pull`) from registry. [Installation steps](https://cloud.google.com/sdk/docs/install-sdk)
- Configure Docker 