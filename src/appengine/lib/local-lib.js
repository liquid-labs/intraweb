import * as fs from 'fs'
import * as fsPath from 'path'

const localAccessLib = {
  verifyToken : () => true
}

const File = class {
  constructor(path) {
    this.path = `${path}`
    this.name = fsPath.basename(path)
  }

  async exists() {
    // TODO: see https://nodejs.org/api/fs.html#fs_fs_exists_path_callback
    // Let's look closer at how the bucket works; the above docs suggest not checking for existence and just reading
    // straight off. We would need to change implementation of the app to support that.
    // Note that the expected return value is embedded in an array.
    return Promise.resolve([fs.existsSync(this.path)])
  }

  createReadStream() {
    return fs.createReadStream(this.path)
  }
}

const localBucket = {
  root     : undefined,
  setRoot  : (root) => { localBucket.root = root },
  file     : (path) => new File(`${localBucket.root}/${path}`),
  getFiles : ({ prefix }, callback) => {
    // expect callback signature: (err, files, nextQuery, apiResponse)
    fs.readdir(`${localBucket.root}/${prefix}`, { withFileTypes : true }, (err, entries) => {
      if (err) { callback(err); return }

      const folders = []
      const files = []
      for (const entry of entries) {
        if (entry.isDirectory()) {
          folders.push(`${prefix}/${entry.name}/`)
        }
        else if (entry.isFile()) {
          files.push({ name : `${prefix}/${entry.name}` })
        } // else ignore
      }

      callback(null, files, null, { prefixes : folders })
    })
  }
}

export {
  localAccessLib,
  localBucket
}
