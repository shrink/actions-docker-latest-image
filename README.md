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
| `image` | Full Image identifier | `docker.pkg.github.com/github/semantic/semantic:v1.4.1` |
| `tag` | Latest Image Tag | `v1.4.1` |

## Examples

### Pass Image Between Jobs

Using [docker/build-push-action][build-push-action] to build a Docker
Image and publish it to GitHub package Registry, and then pass the new Image to
another job to be inspected.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      image: ${{ steps.output-image.outputs.image }}
    steps:
      - uses: actions/checkout@v2
      - name: Build And Publish Image
        uses: docker/build-push-action@v1
        with:
          username: ${{ github.actor }}
          password: ${{ github.token }}
          registry: docker.pkg.github.com
          repository: ${{ github.repository }}/example
          tag_with_ref: true
          push: true
      - name: Get Latest Image
        id: latest
        uses: shrink/actions-docker-latest-image@v1
        with:
          repository: docker.pkg.github.com/${{ github.repository }}/example
      - name: Output Image
        id: output-image
        run: echo "::set-output name=image::${{ steps.latest.outputs.image }}"
  inspect:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v1
      - name: Login to GitHub Package Registry
        uses: docker/login-action@v1
        with:
          registry: docker.pkg.github.com
          username: ${{ github.repository_owner }}
          password: ${{ github.token }}
      - name: Inspect Image
        run: |
          docker pull ${{ needs.build.outputs.image }}
          docker image inspect ${{ needs.build.outputs.image }}
```

[build-push-action]: https://github.com/docker/build-push-action
[login-action]: https://github.com/docker/login-action
