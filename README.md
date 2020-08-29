# Docker Latest Image

A GitHub Action for obtaining the latest Image in a Repository.

```yaml
- uses: shrink/actions-docker-latest-image@v1
  with:
    repository: 'docker.pkg.github.com/github/semantic/semantic'
```

## Inputs

All inputs are required.

| ID  | Description | Example |
| --- | ----------- | ------- |
| `repository` | Docker Image Repository | `docker.pkg.github.com/github/semantic/semantic` |

## Outputs

| ID  | Description | Example |
| --- | ----------- | ------- |
| `image` | Full Image identifier | `docker.pkg.github.com/github/semantic/semantic:latest` |
| `tag` | Latest Image Tag | `latest` |
