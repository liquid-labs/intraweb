const getFileReader = ({ next, path, res }) => {
  const file = bucket.file(path)
  const [ exists ] = await file.exists()
  
  if (!exists) { // No such file, send 404
    res.status(404).send(`No such file: '${path}'`).end()
    return
  }
  
  const reader = file.createReadStream()
  reader.on('error', (err) => {
    console.error(`Error while reading file: ${err}`)
    res.status(500).send(`Error reading file '${path}': ${err}`)
    return next(err) // TODO: is this right for callbacks?
  })
  
  return reader
}

export { getReadStream }
