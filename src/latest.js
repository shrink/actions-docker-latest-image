const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const repository = core.getInput('repository');
    let tag = '';

    const latest = `docker images --format='{{.Tag}}' ${repository} | head -1`;

    await exec.exec(`/bin/bash -c "${latest}"`, [], {
      listeners: {
        stdout: (data) => { tag = data.toString(); },
      },
    });

    if (tag === '') {
      core.setFailed(`No images found in ${repository} -- cannot continue.`);
    }

    core.setOutput('image', `${repository}:${tag}`);
    core.setOutput('tag', tag);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
