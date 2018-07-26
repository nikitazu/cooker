class Logger {
  constructor(log) {
    this._log = log;
  }

  log(text) {
    this._log.append(text + "<br/>");
  }
}

