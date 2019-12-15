const createLogger =
  (repository) => (logger = console.log) => (message, data) => {

    logger("---------------------")
    logger(repository + ":")
    message && logger(message)
    data && logger(data)
    logger("---------------------")
  }

export default createLogger
