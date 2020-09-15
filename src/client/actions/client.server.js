export const ALERT_POP = 'ALERT_POP'

export const alert = (message) => {
  console.log("The mesaage took place.")
  return {
    type: ALERT_POP,
    message
  }
}

export const HOST = 'HOST';

export const hostList = (h) => {
  console.log("The host is updated.!!");
  return {
    type: HOST,
    hostList: hostList
  }
}
